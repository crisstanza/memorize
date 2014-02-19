<?php
	require_once './lib/RankingDAO.php';
	require_once './joomla.php';

	$jogador = $_jogador;
	$nome = $_nome;
	$fase = isset($_GET['fase']) ? $_GET['fase'] : '';
	$tempo = isset($_GET['tempo']) ? $_GET['tempo'] : '';

	$status = 0;

	if ($jogador <= 0) {
		$status = 1;

	} else if ($nome == '') {
		$status = 1;

	} else if ($fase == '') {
		$status = 2;
	} else if (!is_numeric($fase)) {
		$status = 2;

	} else if ($tempo == '') {
		$status = 3;
	} else if (!is_numeric($tempo)) {
		$status = 3;
	}

	if ($status == 0) {
		RankingDAO::save($jogador, $nome, $fase, $tempo);
	}

	echo $status;
?>