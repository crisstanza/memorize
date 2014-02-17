<?php
	$jogador = -1;

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

	$sql = 'SELECT FROM ranking WHERE jogador='.$jogador;
	$rs = mysql_query($sql);

	if (mysql_error()) {
		mysql_close($con);
		die(mysql_error());
	}

	mysql_close($con);
?>
wip
