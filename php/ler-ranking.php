<?php
	require_once './lib/RankingDAO.php';

	$jogador = -1;

	$list = RankingDAO::findAll();

	echo '{ list: [ ';

	$count = count($list);
	for ($i = 0 ; $i < $count; $i++ ) {
		$element = $list[$i];
		echo '{ id: '.$element['id'].', nome: "'.$element['nome'].'", fase: '.$element['fase'].', tempo: '.$element['tempo'].', data: "'.$element['data'].'" }';
		if ($i < $count - 1) {
			echo ', ';
		}
	}
	echo ' ] }';
?>