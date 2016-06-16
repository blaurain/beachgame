var GAME = GAME || {};

GAME.Menu = function() {}
GAME.Menu.constructor = GAME.Menu;
GAME.Menu.inMenu = false;
GAME.Menu.backGraphic = new PIXI.Graphics();

GAME.Menu.init = function () {
	GAME.Menu.backGraphic = new PIXI.Graphics();
	GAME.Menu.backButton = new GAME.Button(50, 80, 35, 25, 'Back', 70);
	GAME.Menu.backButton.buttonGraphic.on('tap', GAME.Menu.backClicked);
	GAME.Menu.backButton.buttonGraphic.on('click', GAME.Menu.backClicked);
	GAME.Menu.retryButton = new GAME.Button(50, 50, 35, 25, 'Retry', 50);
	GAME.Menu.retryButton.buttonGraphic.on('tap', GAME.Menu.retryClicked);
	GAME.Menu.retryButton.buttonGraphic.on('click', GAME.Menu.retryClicked);
	GAME.Menu.nextButton = new GAME.Button(50, 20, 35, 25, 'Next', 30);
	GAME.Menu.nextButton.buttonGraphic.on('tap', GAME.Menu.nextClicked);
	GAME.Menu.nextButton.buttonGraphic.on('click', GAME.Menu.nextClicked);
}

GAME.Menu.draw = function () {
	if(GAME.Menu.inMenu) {
		GAME.Menu.drawBack();
		GAME.Menu.backButton.draw();
		GAME.Menu.retryButton.draw();
		GAME.Menu.nextButton.draw();
	}
	renderer.render(stage);
}

GAME.Menu.show = function () {
	if(GAME.Menu.inMenu) return;
	GAME.Menu.inMenu = true;
	stage.addChild(GAME.Menu.backGraphic);
	GAME.Menu.backButton.show();
	GAME.Menu.retryButton.show();
	GAME.Menu.nextButton.show();
	GAME.Menu.draw();
}

GAME.Menu.hide = function () {
	if(!GAME.Menu.inMenu) return;
	GAME.Menu.inMenu = false;
	stage.removeChild(GAME.Menu.backGraphic);
	GAME.Menu.retryButton.hide();
	GAME.Menu.backButton.hide();
	GAME.Menu.nextButton.hide();
	//stage.removeChild(....) //TODO: cleanup 
}

GAME.Menu.drawBack = function () {
	GAME.Menu.backGraphic.clear();
	GAME.Menu.backGraphic.lineStyle(1, 0x000000, 0);
	GAME.Menu.backGraphic.beginFill(0x000000, .6);
	GAME.Menu.backGraphic.drawRect(0, 0, pixelFromPercentWidth(100), pixelFromPercentHeight(100));
	GAME.Menu.backGraphic.endFill();
}

GAME.Menu.retryClicked = function() {
	var r = 0;
}

GAME.Menu.backClicked = function() {
	var r = 0;
}

GAME.Menu.nextClicked = function() {
	var r = 0;
}
