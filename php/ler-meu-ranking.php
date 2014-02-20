<?php
	require_once './lib/RankingDAO.php';
	require_once './joomla.php';

	$jogador = $_jogador;

	$list = RankingDAO::findAllByJogador($jogador);

	echo '{ list: [ ';
	$count = count($list);
	for ($i = 0 ; $i < $count; $i++ ) {
		$element = $list[$i];
		echo json_encode($element);
		if ($i < $count - 1) {
			echo ', ';
		}
	}
	echo ' ] }';
?>