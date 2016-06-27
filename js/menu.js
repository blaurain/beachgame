var GAME = GAME || {};

GAME.Menu = function() {}
GAME.Menu.constructor = GAME.Menu;
GAME.Menu.inMenu = false;
GAME.Menu.backGraphic = new PIXI.Graphics();
GAME.Menu.backAlpha = .8;
GAME.Menu.instructionY = 20;
GAME.Menu.instructionYVert = 50;
GAME.Menu.instructionX = 22;
GAME.Menu.instructionXVert = 16;

GAME.Menu.init = function () {
	GAME.Menu.backGraphic = new PIXI.Graphics();
	GAME.Menu.backButton = new GAME.Button(50, 80, 35, 25, 'Back', 50, 85);
	GAME.Menu.backButton.buttonGraphic.interactive = true;
	GAME.Menu.backButton.buttonGraphic.on('tap', GAME.Menu.backClicked.bind(true));
	GAME.Menu.backButton.buttonGraphic.on('click', GAME.Menu.backClicked.bind(true));
	GAME.Menu.nextMapButton = new GAME.Button(60, 50, 15, 25, '>', 32, 65);
	GAME.Menu.nextMapButton.buttonGraphic.interactive = true;
	GAME.Menu.nextMapButton.buttonGraphic.on('tap', GAME.Menu.nextMapClicked.bind(true));
	GAME.Menu.nextMapButton.buttonGraphic.on('click', GAME.Menu.nextMapClicked.bind(true));
	GAME.Menu.backMapButton = new GAME.Button(40, 50, 15, 25, '<', 68, 65);
	GAME.Menu.backMapButton.buttonGraphic.interactive = true;
	GAME.Menu.backMapButton.buttonGraphic.on('tap', GAME.Menu.backMapClicked.bind(true));
	GAME.Menu.backMapButton.buttonGraphic.on('click', GAME.Menu.backMapClicked.bind(true));
	GAME.Menu.retryButton = new GAME.Button(50, 20, 35, 25, 'Retry', 50, 45);
	GAME.Menu.retryButton.buttonGraphic.interactive = true;
	GAME.Menu.retryButton.buttonGraphic.on('tap', GAME.Menu.retryClicked.bind(true));
	GAME.Menu.retryButton.buttonGraphic.on('click', GAME.Menu.retryClicked.bind(true));
	GAME.Menu.instructionFontStyle = {
		font : Math.ceil(GAME.Title.fontSize) + 'px ' + GAME.Title.fontFamily, 
		fill : GAME.Title.fontColor,
		align : 'center'
	}; 
	GAME.Menu.tiltText = new PIXI.Text('tilt\nto\nslide', GAME.Menu.instructionFontStyle);
	GAME.Menu.matchText = new PIXI.Text('match\nthe\nshapes', GAME.Menu.instructionFontStyle);
}

GAME.Menu.draw = function () {
	if(GAME.Menu.inMenu) {
		GAME.Menu.drawBack();
		GAME.Menu.backButton.draw();
		GAME.Menu.retryButton.draw();
		GAME.Menu.drawInstructions();
		GAME.Menu.drawMapButtons();
	}
	renderer.render(stage);
}

GAME.Menu.drawMapButtons = function () {
	if(isVertical) {
		GAME.Menu.nextMapButton.draw(GAME.Menu.retryButton.buttonY);
		GAME.Menu.backMapButton.draw(GAME.Menu.retryButton.buttonY + 
			GAME.Menu.retryButton.buttonHeight - pixelFromPercentWidth(GAME.Menu.backMapButton.wPercent));
	} else {
		GAME.Menu.nextMapButton.draw(GAME.Menu.retryButton.buttonX + 
			GAME.Menu.retryButton.buttonWidth - pixelFromPercentWidth(GAME.Menu.backMapButton.wPercent));
		GAME.Menu.backMapButton.draw(GAME.Menu.retryButton.buttonX);
	}
}

GAME.Menu.show = function () {
	if(GAME.Menu.inMenu) return;
	GAME.Menu.inMenu = true;
	stage.addChild(GAME.Menu.backGraphic);
	GAME.Menu.backButton.show();
	GAME.Menu.retryButton.show();
	GAME.Menu.nextMapButton.show();
	GAME.Menu.backMapButton.show();
	GAME.Menu.showInstructions();
	resize();
}

GAME.Menu.hide = function () {
	if(!GAME.Menu.inMenu) return;
	GAME.Menu.inMenu = false;
	stage.removeChild(GAME.Menu.backGraphic);
	GAME.Menu.retryButton.hide();
	GAME.Menu.backButton.hide();
	GAME.Menu.nextMapButton.hide();
	GAME.Menu.backMapButton.hide();
	GAME.Menu.hideInstructions();
	renderer.render(stage);
}

GAME.Menu.drawBack = function () {
	GAME.Menu.backGraphic.clear();
	GAME.Menu.backGraphic.lineStyle(1, 0x000000, 0);
	GAME.Menu.backGraphic.beginFill(0x000000, GAME.Menu.backAlpha);
	GAME.Menu.backGraphic.drawRect(0, 0, pixelFromPercentWidth(100), pixelFromPercentHeight(100));
	GAME.Menu.backGraphic.endFill();
}

GAME.Menu.drawInstructions = function () {
	var fontStyle = {
			font : Math.ceil(GAME.Title.fontSize) + 'px ' + GAME.Title.fontFamily, 
			fill : GAME.Title.fontColor,
			align : 'center'
		}; 
	GAME.Menu.tiltText.style = fontStyle;
	GAME.Menu.matchText.style = fontStyle;
	if(isVertical) {
		GAME.Menu.tiltText.setText('tilt to slide');
		GAME.Menu.tiltText.rotation = -Math.PI/2.0;
		GAME.Menu.tiltText.x = pixelFromPercentWidth(GAME.Menu.instructionXVert);
		GAME.Menu.tiltText.y = pixelFromPercentHeight(GAME.Menu.instructionYVert) + (GAME.Menu.tiltText.width/2.0);
		GAME.Menu.matchText.setText('match shapes');
		GAME.Menu.matchText.rotation = -Math.PI/2.0;
		GAME.Menu.matchText.x = pixelFromPercentWidth(GAME.Menu.instructionXVert) + (GAME.Menu.matchText.height * 1.2);
		GAME.Menu.matchText.y = pixelFromPercentHeight(GAME.Menu.instructionYVert) + (GAME.Menu.matchText.width/2.0);
	} else {
		GAME.Menu.tiltText.setText('tilt\nto\nslide');
		GAME.Menu.tiltText.rotation = 0;
		GAME.Menu.tiltText.x = pixelFromPercentWidth(50 - GAME.Menu.instructionX) - GAME.Menu.tiltText.width;
		GAME.Menu.tiltText.y = pixelFromPercentHeight(GAME.Menu.instructionY);
		GAME.Menu.matchText.setText('match\nthe\nshapes');
		GAME.Menu.matchText.rotation = 0;
		GAME.Menu.matchText.x = pixelFromPercentWidth(50 + GAME.Menu.instructionX);
		GAME.Menu.matchText.y = pixelFromPercentHeight(GAME.Menu.instructionY);
	}
}

GAME.Menu.showInstructions = function () {
	stage.addChild(GAME.Menu.tiltText);
	stage.addChild(GAME.Menu.matchText);
}

GAME.Menu.hideInstructions = function () {
	stage.removeChild(GAME.Menu.tiltText);
	stage.removeChild(GAME.Menu.matchText);
}

GAME.Menu.retryClicked = function() {
	resetGame();	
	GAME.Menu.hide();
}

GAME.Menu.backClicked = function() {
	GAME.Menu.hide();
}

GAME.Menu.nextMapClicked = function() {
	nextGrid();
	GAME.Menu.hide();
}

GAME.Menu.backMapClicked = function() {
	previousGrid();
	GAME.Menu.hide();
}

