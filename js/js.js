(function() {

	var jogo = undefined;

	function init() {
		jogo = Jogo.instance;
		initTelaInicial();
		initTelaInstrucoes();
		initTelaJogo();
		initTelaRanking();
		initSideBar();
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
	}

	function initTelaRanking() {
		jogo.refreshRanking();
		//
		var btMeuRanking = document.getElementById('tela-ranking-bt-meu-ranking');
		btMeuRanking.addEventListener('click', function() { jogo.refreshMeuRanking() }, false);
		//
		var btRanking = document.getElementById('tela-ranking-bt-ranking');
		btRanking.addEventListener('click', function() { jogo.refreshRanking() }, false);
		//
		var btVoltar = document.getElementById('tela-ranking-bt-voltar');
		btVoltar.addEventListener('click', goToTelaInicial, false);
	}

	function initSideBar() {
		var btJogarNovamente = document.getElementById('side-bar-bt-jogar-novamente');
		btJogarNovamente.addEventListener('click', goToTelaJogo, false);
		//
		var btUltimaJogada = document.getElementById('side-bar-bt-ultima-jogada');
		btUltimaJogada.addEventListener('click', goToTelaJogoShowUltimaJogada, false);
		//
		var btRanking = document.getElementById('side-bar-bt-ranking');
		btRanking.addEventListener('click', goToTelaRanking, false);
	}

	function goToTelaJogoShowUltimaJogada() {
		hideTelas();
		show('tela-jogo');
		jogo.showUltimaJogada();
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
		jogo.refreshMeuRanking();
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

	function hide(id) {
		var element = document.getElementById(id);
		Utils.swapClass(element, 'Show', 'Hide');
	}

	window.addEventListener('load', init, false);

})();
