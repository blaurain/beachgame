var GAME = GAME || {};

GAME.Menu = function() {}
GAME.Menu.constructor = GAME.Menu;
GAME.Menu.show = false;

GAME.Menu.init = function () {
	GAME.Menu.backButton = new GAME.Button(50, 50, 40, 40, 'Back');
	GAME.Menu.backButton.buttonGraphic.on('tap', GAME.Menu.backClicked);
	GAME.Menu.backButton.buttonGraphic.on('click', GAME.Menu.backClicked);
	GAME.Menu.retryButton = new GAME.Button(50, 50, 40, 40, 'Retry');
	GAME.Menu.retryButton.buttonGraphic.on('tap', GAME.Menu.retryClicked);
	GAME.Menu.retryButton.buttonGraphic.on('click', GAME.Menu.retryClicked);
}

GAME.Menu.draw = function () {
	if(GAME.Menu.show) {
		GAME.Menu.retryButton.draw();
	}
	renderer.render(stage);
}

GAME.Menu.show = function () {
	show = true;
	GAME.Menu.retryButton.show();
	GAME.Menu.draw();
}

GAME.Menu.hide = function () {
	show = false;
	//stage.removeChild(....) //TODO: cleanup 
}

GAME.Menu.retryClicked = function() {
	var r = 0;
}

GAME.Menu.backClicked = function() {
	var r = 0;
}
