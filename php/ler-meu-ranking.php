<?php
	require_once './lib/RankingDAO.php';
	require_once './joomla.php';

	// $_jogador = 1;

	$jogador = $_jogador;

	$list = RankingDAO::findAllByJogador($jogador);

	echo '{ list: [ ';
	$count = count($list);
	for ($i = 0 ; $i < $count; $i++ ) {
		$element = $list[$i];
		$element['data'] = date('m/d/y H:i', strtotime($element['data']));
		echo json_encode($element);
		if ($i < $count - 1) {
			echo ', ';
		}
	}
	echo ' ] }';
?>