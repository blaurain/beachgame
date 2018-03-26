var GAME = GAME || {};

GAME.Ender = function() {}
GAME.Ender.constructor = GAME.Ender;
GAME.Ender.inMenu = false;
GAME.Ender.backGraphic = new PIXI.Graphics();
GAME.Ender.winY = 25;
GAME.Ender.winYVert = 50;
GAME.Ender.winX = 50;
GAME.Ender.winXVert = 35;
GAME.Ender.enderPhrases = ['Right on!', 'Awesome!', 'Nice!', 'Good Stuff!', 'Far Out!', 'Groovy!']
GAME.Ender.enderPhrase = GAME.Ender.enderPhrases[0];
GAME.Ender.backCornerRadius = 15;
GAME.Ender.backColor = 0x8BCBDE;
GAME.Ender.backBorderColor = 0xBADEB2;
GAME.Ender.backTextColor = 0x000000;
GAME.Ender.backBorderHeight = 60;
GAME.Ender.backBorderWidth = 45;
GAME.Ender.backBorderHeightVert = 40;
GAME.Ender.backBorderWidthVert = 75;


GAME.Ender.init = function () {
	GAME.Ender.backGraphic = new PIXI.Graphics();
	GAME.Ender.backBorderGraphic = new PIXI.Graphics();
	GAME.Ender.nextButton = new GAME.Button(50, 63, 35, 25, 'Next', 50, 60);
	GAME.Ender.nextButton.buttonGraphic.interactive = true;
	GAME.Ender.nextButton.buttonGraphic.on('tap', GAME.Ender.nextClicked.bind(true));
	GAME.Ender.nextButton.buttonGraphic.on('click', GAME.Ender.nextClicked.bind(true));
	GAME.Ender.winFontStyle = {
		font : Math.ceil(GAME.Title.fontSize) + 'px ' + GAME.Title.fontFamily, 
		fill : GAME.Ender.backTextColor,
		align : 'center'
	}; 
	GAME.Ender.winText = new PIXI.Text(GAME.Ender.enderPhrase, GAME.Ender.winFontStyle);
}

GAME.Ender.getEnderPhrase = function () {
	var phraseNum = Math.floor(Math.random() * 4);
	GAME.Ender.enderPhrase = GAME.Ender.enderPhrases[phraseNum];
}

GAME.Ender.draw = function () {
	if(GAME.Ender.inMenu) {
		GAME.Ender.drawBack();
		GAME.Ender.nextButton.draw();
		GAME.Ender.drawEnder();
	}
	renderer.render(stage);
}

GAME.Ender.show = function () {
	if(GAME.Ender.inMenu) return;
	GAME.Ender.getEnderPhrase();
	GAME.Ender.inMenu = true;
	stage.addChild(GAME.Ender.backGraphic);
	stage.addChild(GAME.Ender.backBorderGraphic);
	GAME.Ender.nextButton.show();
	GAME.Ender.showEnder();
	if(!isMobile) {
		document.body.style.backgroundColor = backgroundColFade;
		resize();
	}
	else {
		resizeMobile();
	}
}

GAME.Ender.hide = function () {
	if(!GAME.Ender.inMenu) return;
	GAME.Ender.inMenu = false;
	stage.removeChild(GAME.Ender.backGraphic);
	stage.removeChild(GAME.Ender.backBorderGraphic);
	GAME.Ender.nextButton.hide();
	GAME.Ender.hideEnder();
	if(!isMobile) {
		document.body.style.backgroundColor = backgroundCol;
	}
	renderer.render(stage);
}

GAME.Ender.drawBack = function () {
	GAME.Ender.backGraphic.clear();
	GAME.Ender.backGraphic.lineStyle(1, 0x000000, 0);
	GAME.Ender.backGraphic.beginFill(0x000000, GAME.Menu.backAlpha);
	GAME.Ender.backGraphic.drawRect(0, 0, pixelFromPercentWidth(100), pixelFromPercentHeight(100));
	GAME.Ender.backGraphic.endFill();
	GAME.Ender.backBorderGraphic.clear();
	GAME.Ender.backBorderGraphic.lineStyle(getGridWidth(), GAME.Ender.backBorderColor, 1);
	GAME.Ender.backBorderGraphic.beginFill(GAME.Ender.backColor, 1);
	var backWidth, backHeight;
	if(isVertical){
		backWidth = pixelFromPercentWidth(GAME.Ender.backBorderHeightVert);
		backHeight = pixelFromPercentHeight(GAME.Ender.backBorderWidthVert);
	} else {
		backWidth = pixelFromPercentWidth(GAME.Ender.backBorderWidth);
		backHeight = pixelFromPercentHeight(GAME.Ender.backBorderHeight);
	}
	GAME.Ender.backBorderGraphic.drawRect(pixelFromPercentWidth(50) - backWidth/2.0, pixelFromPercentHeight(50) - backHeight/2.0, backWidth, backHeight);
	GAME.Ender.backBorderGraphic.endFill();
}

GAME.Ender.drawEnder = function () {
	var winFontStyle = {
			font : Math.ceil(GAME.Title.fontSize) + 'px ' + GAME.Title.fontFamily, 
			fill : GAME.Ender.backTextColor,
			align : 'center'
		}; 
	GAME.Ender.winText.style = winFontStyle;
	if(isVertical) {
		GAME.Ender.winText.setText(GAME.Ender.enderPhrase);
		GAME.Ender.winText.rotation = -Math.PI/2.0;
		GAME.Ender.winText.x = pixelFromPercentWidth(GAME.Ender.winXVert);
		GAME.Ender.winText.y = pixelFromPercentHeight(GAME.Ender.winYVert) + (GAME.Ender.winText.width/2.0);
	} else {
		GAME.Ender.winText.setText(GAME.Ender.enderPhrase);
		GAME.Ender.winText.rotation = 0;
		GAME.Ender.winText.x = pixelFromPercentWidth(GAME.Ender.winX) - (GAME.Ender.winText.width/2.0);;
		GAME.Ender.winText.y = pixelFromPercentHeight(GAME.Ender.winY);
	}
}

GAME.Ender.showEnder = function () {
	stage.addChild(GAME.Ender.winText);
}

GAME.Ender.hideEnder = function () {
	stage.removeChild(GAME.Ender.winText);
}

GAME.Ender.nextClicked = function() {
	nextGrid();
	GAME.Ender.hide();
}


