function Jogo() {
	this.fase = undefined;
	this.sizeX = undefined;
	this.sizeY = undefined;
	this.colorDeltaX = undefined;
	this.colorDeltaY = undefined;
	//
	this.sizeSquare = undefined;
	this.space = undefined;
	//
	this.timerStart = undefined;
	this.timer = undefined;
	this.timerEnd = undefined;
	//
	this.clicks = undefined;
	this.goal = undefined;
}

Jogo.instance = new Jogo();

Jogo.LOG = false;

Jogo.log = function(msg) {
	if(Jogo.LOG) {
		console.log(msg);
	}
}

Jogo.ID_MAIN_TABLE = 'main-table';
Jogo.ID_MAIN_BOARD = 'main-board';
Jogo.ID_DISPLAY_TEMPO = 'display-tempo';
Jogo.ID_DISPLAY_FASE = 'display-fase';
Jogo.ID_DISPLAY_CLICKS = 'display-clicks';
Jogo.ID_DISPLAY_FIM_DO_JOGO = 'display-fim-do-jogo';
Jogo.ID_DISPLAY_VOCE_ACERTOU = 'display-voce-acertou';
Jogo.ID_DISPLAY_ERROS = 'display-erros';
Jogo.ID_DISPLAY_ERROS_PALAVRA_POSICAO = 'display-erros-palavra-posicao';

Jogo.SHOW_SINGLE_GOAL_DURATION = 900;
Jogo.SHOW_SINGLE_GOAL_LONG_DURATION = 1100;
Jogo.SHOW_MESSAGES_DURATION = 650;
Jogo.SHOW_LAST_MESSAGE_DURATION = 400;

Jogo.DEFAULT_SIZE_DELTA = 2;
Jogo.DEFAULT_GOAL_SIZE_DELTA = 3;

Jogo.prototype.init = function() {
	this.setFase(1);
	this.startTimer();
}

Jogo.prototype.end = function() {
	this.stopTimer();
	this.removeClickListeners();
	var _this = this;
	setTimeout(function() { _this.showEnd(); }, Jogo.SHOW_LAST_MESSAGE_DURATION);
}

Jogo.prototype.showEnd = function() {
	var displayClicks = document.getElementById(Jogo.ID_DISPLAY_CLICKS);
	Utils.swapClass(displayClicks, 'Show', 'Hide');
	//
	var displayFimDoJogo = document.getElementById(Jogo.ID_DISPLAY_FIM_DO_JOGO);
	Utils.swapClass(displayFimDoJogo, 'Hide', 'Show');
	//
	var resultadoErrosArray = [];
	var length = this.goal.length;
	for ( var i = 0 ; i < length ; i++ ) {
		var singleClick = this.clicks[i];
		var singleGoal = this.goal[i];
		if (singleClick.x != singleGoal.x || singleClick.y != singleGoal.y) {
			resultadoErrosArray.push(i + 1);
		}
	}
	var resultadoErros = Utils.join(resultadoErrosArray, '<b>', '&ordf;</b>', ', ', ' e a ');
	var displayErros = document.getElementById(Jogo.ID_DISPLAY_ERROS);
	displayErros.innerHTML = resultadoErros;
	var displayErrosPalavraPosicao = document.getElementById(Jogo.ID_DISPLAY_ERROS_PALAVRA_POSICAO);
	if (resultadoErrosArray.length > 1) {
		displayErrosPalavraPosicao.innerHTML = 'posi&ccedil;&otilde;es';
	} else {
		displayErrosPalavraPosicao.innerHTML = 'posi&ccedil;&atilde;o';
	}
}

Jogo.prototype.showUltimaJogada = function() {
	this.showSingleGoal(this.clicks, null, null, 0);
}

Jogo.prototype.showGoal = function() {
	this.showSingleGoal(this.goal, null, null, 0);
	this.showClicksOff()
}

Jogo.prototype.showSingleGoal = function(array, oldClicavel1, oldClicavel2, i) {
	if (oldClicavel1 != null) {
		oldClicavel1.innerHTML = '';
		Utils.removeClass(oldClicavel1, 'ClickErrado');
		Utils.removeClass(oldClicavel1, 'ClickCerto');
	}
	if (oldClicavel2 != null) {
		oldClicavel2.innerHTML = '';
		Utils.removeClass(oldClicavel2, 'ClickErrado');
		Utils.removeClass(oldClicavel2, 'ClickCerto');
	}
	if (i < this.goal.length) {
		var element = array[i];
		var clicavelElement = clicavelElement = document.querySelector('table[id='+Jogo.ID_MAIN_TABLE+'] td[data-i="'+element.x+'"][data-j="'+element.y+'"]');
		var clicavelGoal = null;
		if (array != this.goal) {
			var singleGoal = this.goal[i];
			if (element.x == singleGoal.x && element.y == singleGoal.y) {
				Utils.addClass(clicavelElement, 'ClickCerto');
			} else {
				Utils.addClass(clicavelElement, 'ClickErrado');
				clicavelGoal = document.querySelector('table[id='+Jogo.ID_MAIN_TABLE+'] td[data-i="'+singleGoal.x+'"][data-j="'+singleGoal.y+'"]');
				clicavelGoal.innerHTML = i + 1;
			}
		}
		i++;
		clicavelElement.innerHTML = i;
		var _this = this;
		setTimeout(function() { _this.showSingleGoal(array, clicavelElement, clicavelGoal, i); }, array == this.goal ? Jogo.SHOW_SINGLE_GOAL_DURATION : Jogo.SHOW_SINGLE_GOAL_LONG_DURATION);
	} else {
		if (array == this.goal) {
			this.addClickListeners();
		}
	}
}

Jogo.prototype.setFase = function(fase) {
	this.fase = fase;
	this.sizeX = Jogo.DEFAULT_SIZE_DELTA + this.fase;
	this.sizeY = Jogo.DEFAULT_SIZE_DELTA + this.fase;
	this.colorDeltaX = 255 / this.sizeX;
	this.colorDeltaY = 255 / this.sizeY;
	//
	this.sizeSquare = 60;
	this.space = 5;
	//
	this.clicks = undefined;
	this.goal = this.createGoal(this.fase);
	//
	var displayVoceAcertou = document.getElementById(Jogo.ID_DISPLAY_VOCE_ACERTOU);
	Utils.swapClass(displayVoceAcertou, 'Show', 'Hide');
	//
	var buffer = [];
	buffer.push('<table id="'+Jogo.ID_MAIN_TABLE+'" cellspacing="'+this.space+'" cellpadding="0">');
	for ( var i = 0 ; i < this.sizeX ; i++ ) {
		buffer.push('<tr>');
		for ( var j = 0 ; j < this.sizeY ; j++ ) {
			var color = 'rgb(' + Math.floor(255 - this.colorDeltaX*i) + ',' + Math.floor(255 - this.colorDeltaY*j) + ', 0)';
			buffer.push('<td style="background-color: '+color+'" width="'+this.sizeSquare+'" height="'+this.sizeSquare+'" data-i="'+i+'" data-j="'+j+'">');
			buffer.push('</td>');
		}
		buffer.push('</tr>');
	}
	buffer.push('</table>');
	var mainBoard = document.getElementById(Jogo.ID_MAIN_BOARD);
	mainBoard.innerHTML = buffer.join('');
	//
	var displayFase = document.getElementById(Jogo.ID_DISPLAY_FASE);
	displayFase.innerHTML = '<b>' + this.fase + '</b> (' + this.goal.length + ' movimentos)';
	//
	this.showGoal();
}

Jogo.prototype.createGoal = function(fase) {
	var goalSize = fase + Jogo.DEFAULT_GOAL_SIZE_DELTA;
	var goal = [];
	while (goal.length < goalSize) {
		var singleClick = { x: Utils.random(0, this.sizeX), y: Utils.random(0, this.sizeY) };
		if (!Utils.containsSingleClick(goal, singleClick)) {
			goal.push(singleClick);
		}
	}
	return goal;
}

Jogo.prototype.startTimer = function() {
	var displayTempo = document.getElementById(Jogo.ID_DISPLAY_TEMPO);
	displayTempo.innerHTML = '00:00';
	this.timerStart = new Date().getTime();
	var _this = this;
	this.timer = setInterval(function() { _this.incTimer(); }, 1000);
}

Jogo.prototype.stopTimer = function() {
	this.timerEnd = new Date();
	clearInterval(this.timer);
	this.timer = undefined;
}

Jogo.prototype.incTimer = function() {
	var now = new Date().getTime();
	var delta = now - this.timerStart;
	var deltaInSeconds = delta / 1000;
	var displayTempo = document.getElementById(Jogo.ID_DISPLAY_TEMPO);
	displayTempo.innerHTML = Utils.formatHour(deltaInSeconds);
	if (displayTempo.innerHTML == '99:59') {
		this.end();
	}
}

Jogo.prototype.incClicks = function() {
	var displayClicks = document.getElementById(Jogo.ID_DISPLAY_CLICKS);
	var singleClicks = displayClicks.querySelectorAll('div[class^=Click]');
	if ( singleClicks.length > 0 ) {
		var singleClick = singleClicks[this.clicks.length - 1];
		Utils.swapClass(singleClick, 'ClickOff', 'ClickOn')
	}
}

Jogo.prototype.showClicksOff = function() {
	this.clearClicks();
	var displayClicks = document.getElementById(Jogo.ID_DISPLAY_CLICKS);
	Utils.swapClass(displayClicks, 'Hide', 'Show');
	//
	var displayFimDoJogo = document.getElementById(Jogo.ID_DISPLAY_FIM_DO_JOGO);
	Utils.swapClass(displayFimDoJogo, 'Show', 'Hide');
	//
	var length = this.goal.length;
	for(var i = 0 ; i < length ; i++) {
		displayClicks.innerHTML += '<div class="ClickOff"></div>';
	}
}

Jogo.prototype.clearClicks = function() {
	var displayClicks = document.getElementById(Jogo.ID_DISPLAY_CLICKS);
	var singleClicks = displayClicks.querySelectorAll('div[class^=Click]');
	var length = singleClicks.length;
	if ( singleClicks.length > 0 ) {
		for(var i = 0 ; i < length ; i++) {
			var singleClick = singleClicks[i];
			displayClicks.removeChild(singleClick);
		}
	}
}

Jogo.prototype.addClickListeners = function() {
	var clicaveis = document.querySelectorAll('table[id='+Jogo.ID_MAIN_TABLE+'] td');
	var length = clicaveis.length;
	for (var i = 0 ; i < length ; i++) {
		var clicavel = clicaveis[i];
		clicavel.addEventListener('click', this.mainClick, false);
		Utils.addClass(clicavel, 'Clicavel');
	}
	this.clicks = [];
}

Jogo.prototype.removeClickListeners = function() {
	var clicaveis = document.querySelectorAll('table[id='+Jogo.ID_MAIN_TABLE+'] td');
	var length = clicaveis.length;
	for (var i = 0 ; i < length ; i++) {
		var clicavel = clicaveis[i];
		clicavel.removeEventListener('click', this.mainClick, false);
		Utils.removeClass(clicavel, 'Clicavel');
	}
}

Jogo.prototype.mainClick = function(event) {
	var element = event.target;
	var i = element.getAttribute('data-i');
	var j = element.getAttribute('data-j');
	{
		Jogo.log('click: ' + i + ", " + j);
	}
	var _this = Jogo.instance;
	_this.clicks.push({ x: i, y: j });
	_this.incClicks();
	_this.mainFakeGameLoop();
}

Jogo.prototype.mainFakeGameLoop = function() {
	if ( this.clicks.length == this.goal.length ) {
		if( Utils.equalsSingleClick(this.clicks, this.goal) ) {
			this.voceAcertou();
		} else {
			this.end();
		}
	}
}

Jogo.prototype.voceAcertou = function() {
	this.removeClickListeners();
	//
	var displayVoceAcertou = document.getElementById(Jogo.ID_DISPLAY_VOCE_ACERTOU);
	Utils.swapClass(displayVoceAcertou, 'Hide', 'Show');
	//
	var displayClicks = document.getElementById(Jogo.ID_DISPLAY_CLICKS);
	Utils.swapClass(displayClicks, 'Show', 'Hide');
	//
	var _this = this;
	setTimeout(function() { _this.setFase(_this.fase + 1); }, Jogo.SHOW_MESSAGES_DURATION);
}
