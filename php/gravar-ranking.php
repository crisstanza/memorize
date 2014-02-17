<?php
  require_once 'lib\RankingDAO.php';
?>

<?php
	$jogador = -1;
	$fase = isset($_POST['fase']) ? $_POST['fase'] : '';
	$tempo = isset($_POST['tempo']) ? $_POST['tempo'] : $_POST['tempo'];

	$status = 0;

	if ($jogador <= 0) {
		$status = 1;

	} else if ($fase == '') {
		$status = 2;
	} else if (!is_numeric($fase)) {
		$status = 3;

	} else if ($tempo == '') {
		$status = 4;
	} else if (!is_numeric($tempo)) {
		$status = 5;
	}

	if ($status == 0) {
		RankingDAO::save($jogador, $fase, $tempo);
	}
?>

<?php echo $status; ?>

