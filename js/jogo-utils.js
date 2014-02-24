function JogoUtils() {
}

JogoUtils.containsSingleClick = function(array, singleClick) {
	var length = array.length;
	for(var i = 0 ; i < length ; i++) {
		var element = array[i];
		if (element.x == singleClick.x && element.y == singleClick.y) {
			return true;
		}
	}
	return false;
}

JogoUtils.equalsSingleClick = function(array1, array2) {
	var length1 = array1.length;
	var length2 = array2.length;
	if ( length1 != length2 ) {
		return false;
	}
	for(var i = 0 ; i < length1 ; i++) {
		var element1 = array1[i];
		var element2 = array2[i];
		if (element1.x != element2.x || element1.y != element2.y) {
			return false;
		}
	}
	return true;
}

JogoUtils.show = function(id) {
	var element = document.getElementById(id);
	Utils.swapClass(element, 'Hide', 'Show');
}

JogoUtils.hide = function(id) {
	var element = document.getElementById(id);
	Utils.swapClass(element, 'Show', 'Hide');
}

JogoUtils.hideTelas = function() {
	var telas = document.querySelectorAll('div[id^=tela-]:not([class*=Bt])');
	var length = telas.length;
	for (var i = 0 ; i < length ; i++) {
		var tela = telas[i];
		JogoUtils.hide(tela);
	}
}
