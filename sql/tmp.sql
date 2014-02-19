SELECT nome, jogador, MAX(fase), MIN(tempo) FROM ranking GROUP BY(jogador) ORDER BY MAX(fase) DESC, MIN(tempo) ASC LIMIT 0, 10;

SELECT nome, jogador, fase, tempo FROM ranking ORDER BY fase DESC, tempo ASC LIMIT 0, 10;

SELECT * FROM (
	SELECT * FROM ranking r1 ORDER BY r1.jogador, r1.fase DESC, r1.tempo ASC
) AS r2 GROUP BY r2.jogador;

