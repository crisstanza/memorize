(function() {

	var jogo = undefined;

	function init() {
		jogo = Jogo.instance;
		initTelaInicial();
		initTelaInstrucoes();
		initTelaJogo();
		initTelaRanking();
	}

	function initTelaInicial() {
		var btJogar = document.getElementById('tela-inicial-bt-jogar');
		btJogar.addEventListener('click', goToTelaJogo, false);
		//
		var btInstrucoes = document.getElementById('tela-inicial-bt-instrucoes');
		btInstrucoes.addEventListener('click', goToTelaInstrucoes, false);
		//
		var btRanking = document.getElementById('tela-inicial-bt-ranking');
		btRanking.addEventListener('click', goToTelaRanking, false);
	}

	function initTelaInstrucoes() {
		var btVoltar = document.getElementById('tela-instrucoes-bt-voltar');
		btVoltar.addEventListener('click', goToTelaInicial, false);
	}

	function initTelaJogo() {
		var btJogarNovamente = document.getElementById('tela-jogo-bt-jogar-novamente');
		btJogarNovamente.addEventListener('click', goToTelaJogo, false);
		//
		var btUltimaJogada = document.getElementById('tela-jogo-bt-ultima-jogada');
		btUltimaJogada.addEventListener('click', function() { jogo.showUltimaJogada(); }, false);
	}

	function initTelaInstrucoes() {
		var btVoltar = document.getElementById('tela-instrucoes-bt-voltar');
		btVoltar.addEventListener('click', goToTelaInicial, false);
	}

	function initTelaRanking() {
		var btVoltar = document.getElementById('tela-ranking-bt-voltar');
		btVoltar.addEventListener('click', goToTelaInicial, false);
	}

	function goToTelaInicial() {
		hideTelas();
		show('tela-inicial');
	}

	function goToTelaInstrucoes() {
		hideTelas();
		show('tela-instrucoes');
	}

	function goToTelaJogo() {
		hideTelas();
		show('tela-jogo');
		jogo.init();
	}

	function goToTelaRanking() {
		hideTelas();
		show('tela-ranking');
	}

	function hideTelas() {
		var telas = document.querySelectorAll('div[id^=tela-]:not([class*=Bt])');
		var length = telas.length;
		for (var i = 0 ; i < length ; i++) {
			var tela = telas[i];
			Utils.swapClass(tela, 'Show', 'Hide');
		}
	}

	function show(id) {
		var element = document.getElementById(id);
		Utils.swapClass(element, 'Hide', 'Show');
	}

	window.addEventListener('load', init, false);

})();
