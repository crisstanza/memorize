<?php
	class RankingDAO {

		static private $host = 'localhost';
		static private $usuario = '';
		static private $senha = '';
		static private $dbName = '';

	    static private function open() {
			$con = mysql_connect($host, $usuario, $senha);
			if ($con === false) {
				die(mysql_error());
			}
			$db = mysql_select_db($dbName, $con);
			if ($db === false) {
				close($con);
				die(mysql_error());
			}
			return $con;
	    }

	    static private function close($con) {
			mysql_close($con);
	    }

	    static public function findAll() {
			$con = RankingDAO::open();
			$sql = 'SELECT id, jogador, fase, tempo, data FROM ranking WHERE jogador='.mysql_real_escape_string($jogador, $con);
			$rs = mysql_query($sql, $con);
 			$list = array();
			while ($row = mysql_fetch_assoc($rs)) {
				$list[] = $row;
			}
			RankingDAO::close($con);
			return $list;
	    }

	    static public function save($jogador, $fase, $tempo) {
			$sql = 'INSERT INTO ranking (jogador, fase, tempo) VALUES ('.mysql_real_escape_string($jogador, $con).', '.mysql_real_escape_string($fase, $con).', '.mysql_real_escape_string($tempo, $con).')';
	    }

	}
?>
