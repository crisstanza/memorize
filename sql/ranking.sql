--
-- Tabelas do jogo Memorize.
--
-- Autor: Cris Stanza (crisstanza@gmail.com)
-- Data de criação: 15/Fev/2014
--

DROP TABLE IF EXISTS ranking;

CREATE TABLE ranking (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	jogador INT NOT NULL,
	nome VARCHAR(64) NOT NULL,
	fase INT NOT NULL,
	tempo BIGINT NOT NULL,
	data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

