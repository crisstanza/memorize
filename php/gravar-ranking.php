<?php
	$jogador = -1;
	$fase = isset($_POST['fase']) ? $_POST['fase'] : '';
	$tempo = isset($_POST['tempo']) ? $_POST['tempo'] : $_POST['tempo'];

	$host = 'localhost';
	$usuario = '';
	$senha = '';
	$dbName = '';

	$con = mysql_connect($host, $usuario, $senha);
	if ($con === false) {
		die(mysql_error());
	}
	$db = mysql_select_db($dbName, $con);
	if ($db === false) {
		mysql_close($con);
		die(mysql_error());
	}

	$sql = 'INSERT INTO ranking (jogador, fase, tempo) VALUES ('.$jogador.', '.$fase.', '.$tempo.' )';
	$rs = mysql_query($sql);

	if (mysql_error()) {
		mysql_close($con);
		die(mysql_error());
	}

	mysql_close($con);
?>
0
