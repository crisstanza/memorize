<?php
	class RankingDAO {

		static private $host = 'localhost';
		static private $usuario = 'memorize';
		static private $senha = 'memorize';
		static private $dbName = 'memorize';

		static private function open() {
			$con = mysql_connect(RankingDAO::$host, RankingDAO::$usuario, RankingDAO::$senha);
			if ($con === false) {
				die(mysql_error());
			}
			$db = mysql_select_db(RankingDAO::$dbName, $con);
			if ($db === false) {
				die(mysql_error($con));
				RankingDAO::close($con);
			}
			return $con;
		}

		static private function close($con) {
			mysql_close($con);
		}

		static public function findAll() {
			$con = RankingDAO::open();
			$sql = 'SELECT id, nome, jogador, fase, tempo, data FROM ranking ORDER BY fase DESC, tempo ASC LIMIT 0, 10';
			$rs = mysql_query($sql, $con);
			if ($rs === false) {
				die(mysql_error($con));
				RankingDAO::close($con);
			}
 			$list = array();
			while ($row = mysql_fetch_assoc($rs)) {
				$list[] = $row;
			}
			RankingDAO::close($con);
			return $list;
		}

		static public function save($jogador, $nome, $fase, $tempo) {
			$con = RankingDAO::open();
			$sql = 'INSERT INTO ranking (jogador, nome, fase, tempo) VALUES ('.mysql_real_escape_string($jogador, $con).', "'.mysql_real_escape_string($nome, $con).'", '.mysql_real_escape_string($fase, $con).', '.mysql_real_escape_string($tempo, $con).')';
			$rs = mysql_query($sql, $con);
			if ($rs === false) {
				die(mysql_error($con));
				RankingDAO::close($con);
			}
			RankingDAO::close($con);
		}

	}
?>
