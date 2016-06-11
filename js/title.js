var GAME = GAME || {};

GAME.Title = function() {
}
GAME.Title.constructor = GAME.Title;
GAME.Title.titleFontStyle = {};
GAME.Title.tiltFontStyle = {};
GAME.Title.fontColor = 0xff1010;
GAME.Title.fontFamily = 'Arial';
GAME.Title.fontSize = 66;
GAME.Title.widthPercent = 4;
GAME.Title.letterLocations = [];

GAME.Title.init = function() {
	GAME.Title.titleFontStyle = {
		font : GAME.Title.fontSize + 'px ' + GAME.Title.fontFamily, 
		fill : GAME.Title.fontColor
	}; 
	GAME.Title.tiltFontStyle = {
		font : Math.ceil(GAME.Title.fontSize/3.0) + 'px ' + GAME.Title.fontFamily, 
		fill : GAME.Title.fontColor,
		align : 'center'
	}; 
	GAME.Title.letterS = new PIXI.Text('S', GAME.Title.titleFontStyle);
	GAME.Title.letterL = new PIXI.Text('L', GAME.Title.titleFontStyle);
	GAME.Title.letterI = new PIXI.Text('I', GAME.Title.titleFontStyle);
	GAME.Title.letterD = new PIXI.Text('D', GAME.Title.titleFontStyle);
	GAME.Title.letterE = new PIXI.Text('E', GAME.Title.titleFontStyle);
	stage.addChild(GAME.Title.letterS);
	stage.addChild(GAME.Title.letterL);
	stage.addChild(GAME.Title.letterI);
	stage.addChild(GAME.Title.letterD);
	stage.addChild(GAME.Title.letterE);
	if(!isMobile) { 
		GAME.Title.useArrowText = new PIXI.Text('[tilt with arrow keys]', GAME.Title.tiltFontStyle);
		stage.addChild(GAME.Title.useArrowText); 
	}
	GAME.Title.draw();
}
GAME.Title.draw = function() {
	GAME.Title.fontSize = renderer.height / 8.0;
	GAME.Title.titleFontStyle = {
		font : GAME.Title.fontSize + 'px ' + GAME.Title.fontFamily, 
		fill : GAME.Title.fontColor
	}; 
	GAME.Title.letterS.style = (GAME.Title.titleFontStyle);
	GAME.Title.letterL.style = (GAME.Title.titleFontStyle);
	GAME.Title.letterI.style = (GAME.Title.titleFontStyle);
	GAME.Title.letterD.style = (GAME.Title.titleFontStyle);
	GAME.Title.letterE.style = (GAME.Title.titleFontStyle);
	GAME.Title.letterS.x = pixelFromPercentWidth(GAME.Title.widthPercent);
	GAME.Title.letterL.x = pixelFromPercentWidth(GAME.Title.widthPercent);
	GAME.Title.letterI.x = pixelFromPercentWidth(GAME.Title.widthPercent);
	GAME.Title.letterD.x = pixelFromPercentWidth(GAME.Title.widthPercent);
	GAME.Title.letterE.x = pixelFromPercentWidth(GAME.Title.widthPercent);
	if(isVertical) {
		GAME.Title.letterS.rotation = -Math.PI/2.0;
		GAME.Title.letterL.rotation = -Math.PI/2.0;
		GAME.Title.letterI.rotation = -Math.PI/2.0;
		GAME.Title.letterD.rotation = -Math.PI/2.0;
		GAME.Title.letterE.rotation = -Math.PI/2.0;
		GAME.Title.letterS.y = pixelFromPercentHeight(93) - GAME.Title.letterI.width/3.0;
		GAME.Title.letterL.y = pixelFromPercentHeight(73);
		GAME.Title.letterI.y = pixelFromPercentHeight(50) + GAME.Title.letterI.width/2.0;
		GAME.Title.letterD.y = pixelFromPercentHeight(27) + GAME.Title.letterD.width;
		GAME.Title.letterE.y = pixelFromPercentHeight(7) + GAME.Title.letterE.width + (GAME.Title.letterE.width/3.0);
	} else {
		if(GAME.Grid.gravDirection === GAME.Grid.Direction.Right) {
			GAME.Title.letterS.x = pixelFromPercentWidth(95 - GAME.Title.widthPercent);
			GAME.Title.letterL.x = pixelFromPercentWidth(95 - GAME.Title.widthPercent);
			GAME.Title.letterI.x = pixelFromPercentWidth(95 - GAME.Title.widthPercent);
			GAME.Title.letterD.x = pixelFromPercentWidth(95 - GAME.Title.widthPercent);
			GAME.Title.letterE.x = pixelFromPercentWidth(95 - GAME.Title.widthPercent);
		}
		GAME.Title.letterI.x = GAME.Title.letterI.x + GAME.Title.letterI.width/2.0;
		GAME.Title.letterS.rotation = 0;
		GAME.Title.letterL.rotation = 0;
		GAME.Title.letterI.rotation = 0;
		GAME.Title.letterD.rotation = 0;
		GAME.Title.letterE.rotation = 0;
		GAME.Title.letterS.y = pixelFromPercentHeight(7);
		GAME.Title.letterL.y = pixelFromPercentHeight(27) - GAME.Title.letterD.height/4.0;
		GAME.Title.letterI.y = pixelFromPercentHeight(50) - GAME.Title.letterD.height/2.0;
		GAME.Title.letterD.y = pixelFromPercentHeight(73) - (4.0 * GAME.Title.letterD.height/5.0);
		GAME.Title.letterE.y = pixelFromPercentHeight(93) - GAME.Title.letterE.height ;
	}
	if(!isMobile) {
		GAME.Title.tiltFontStyle = {
			font : Math.ceil(GAME.Title.fontSize/3.0) + 'px ' + GAME.Title.fontFamily, 
			fill : GAME.Title.fontColor
		}; 
		GAME.Title.useArrowText.style = (GAME.Title.tiltFontStyle);
		if(isVertical) {
			GAME.Title.useArrowText.x = pixelFromPercentWidth(GAME.Title.widthPercent) + GAME.Title.letterD.height - GAME.Title.useArrowText.height/2.0;
			GAME.Title.useArrowText.y = pixelFromPercentHeight(50) + GAME.Title.useArrowText.width/2.0;
			GAME.Title.useArrowText.rotation = -Math.PI/2.0;
		} else {
			if(GAME.Grid.gravDirection === GAME.Grid.Direction.Right) {
				GAME.Title.useArrowText.x = pixelFromPercentWidth(4);
			} else {
				GAME.Title.useArrowText.x = pixelFromPercentWidth(97) - GAME.Title.useArrowText.width;
			}
			GAME.Title.useArrowText.y = pixelFromPercentHeight(100) - GAME.Title.useArrowText.height;
			GAME.Title.useArrowText.rotation = 0;
		}
	}
}



