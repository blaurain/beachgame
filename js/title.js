var GAME = GAME || {};

GAME.Title = function() {}
GAME.Title.constructor = GAME.Title;
GAME.Title.titleFontStyle = {};
GAME.Title.tiltFontStyle = {};
GAME.Title.fontColor = 0xff1010;
GAME.Title.fontFamily = 'Arial';
GAME.Title.fontSize = 66;
GAME.Title.vertWidthPercent = 3;
GAME.Title.widthPercent = 5;
GAME.Title.cornerRadius = 15;
GAME.Title.buttonColor = 0x2c3e50;
GAME.Title.buttonBorderColor = 0x34495e;
GAME.Title.letterLocations = [];

GAME.Title.init = function() {
	GAME.Title.buttonGraphic = new PIXI.Graphics();
	GAME.Title.buttonGraphic.interactive = true;
	GAME.Title.buttonGraphic.on('tap', showMenu);
	GAME.Title.buttonGraphic.on('click', showMenu);
	stage.addChild(GAME.Title.buttonGraphic);
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
	var xPlacement, xRect = 0;
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
	GAME.Title.buttonGraphic.clear();
	GAME.Title.buttonGraphic.lineStyle(getGridWidth(), GAME.Grid.gridColor, 1);
	GAME.Title.buttonGraphic.beginFill(GAME.Title.buttonColor, 1);
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
		// GAME.Title.buttonGraphic.x = pixelFromPercentWidth(2);
		xRect = pixelFromPercentWidth(2);
		xPlacement = pixelFromPercentWidth(GAME.Title.vertWidthPercent);
	} else {
		if(GAME.Grid.gravDirection === GAME.Grid.Direction.Right) {
			xRect = pixelFromPercentWidth(98) - gridShifterW;
			xPlacement = xRect + (tileWidth/2.0) - (GAME.Title.letterD.width/2.0);

		} else {
			xRect = pixelFromPercentWidth(2);
			xPlacement = xRect + (tileWidth/2.0) - (GAME.Title.letterD.width/2.0);
		}
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
	GAME.Title.buttonGraphic.drawRect(
		xRect, 
		pixelFromPercentHeight(6), 
		tileWidth, 
		pixelFromPercentHeight(88));
	GAME.Title.letterS.x = xPlacement;
	GAME.Title.letterL.x = xPlacement;
	GAME.Title.letterI.x = xPlacement;
	GAME.Title.letterD.x = xPlacement;
	GAME.Title.letterE.x = xPlacement;
	if(!isVertical) GAME.Title.letterI.x = GAME.Title.letterI.x  + GAME.Title.letterI.width/2.0;

	if(!isMobile) {
		GAME.Title.tiltFontStyle = {
			font : Math.ceil(GAME.Title.fontSize/3.0) + 'px ' + GAME.Title.fontFamily, 
			fill : GAME.Title.fontColor
		}; 
		GAME.Title.useArrowText.style = (GAME.Title.tiltFontStyle);
		if(isVertical) {
			GAME.Title.useArrowText.x = xPlacement + GAME.Title.letterD.height - GAME.Title.useArrowText.height/3.0;
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
	GAME.Title.buttonGraphic.endFill();
}



