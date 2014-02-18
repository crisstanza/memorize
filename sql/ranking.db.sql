--
-- Banco de dados e usuário do jogo Memorize.
--
-- Autor: Cris Stanza (crisstanza@gmail.com)
-- Data de criação: 15/Fev/2014
--

-- DROP DATABASE IF EXISTS memorize;
-- DROP USER 'memorize'@'localhost';

CREATE USER 'memorize'@'localhost' IDENTIFIED BY 'memorize';

CREATE DATABASE memorize CHARACTER SET UTF8;
GRANT ALL ON memorize.* TO 'memorize'@'localhost';

