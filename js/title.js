var GAME = GAME || {};

GAME.Title = function() {}
GAME.Title.constructor = GAME.Title;
GAME.Title.titleFontStyle = {};
GAME.Title.tiltFontStyle = {};
GAME.Title.fontColor = 0x000000;
GAME.Title.hamburgerColor = 0x7f8c8d;
GAME.Title.buttonColor = 0xfbf298;
GAME.Title.buttonBorderColor = 0x34495e;
GAME.Title.fontFamily = 'Lucida Console';
GAME.Title.fontSize = 46;
GAME.Title.vertWidthPercent = 3;
GAME.Title.widthPercent = 5;
GAME.Title.cornerRadius = 15;
GAME.Title.letterLocations = [];
GAME.Title.letterHeights = [25, 33, 51, 64, 77, 90];

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
	GAME.Title.letterR = new PIXI.Text('R', GAME.Title.titleFontStyle);
	stage.addChild(GAME.Title.letterS);
	stage.addChild(GAME.Title.letterL);
	stage.addChild(GAME.Title.letterI);
	stage.addChild(GAME.Title.letterD);
	stage.addChild(GAME.Title.letterE);
	stage.addChild(GAME.Title.letterR);
	if(!isMobile) { 
		GAME.Title.useArrowText = new PIXI.Text('[tilt with arrow keys]', GAME.Title.tiltFontStyle);
		stage.addChild(GAME.Title.useArrowText); 
	}
	GAME.Title.hamburgerGraphic = new PIXI.Graphics();
	stage.addChild(GAME.Title.hamburgerGraphic);
	GAME.Title.draw();
}
GAME.Title.draw = function() {
	var xPlacement, xRect = 0, lineStart, lineEnd;
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
	GAME.Title.letterR.style = (GAME.Title.titleFontStyle);
	GAME.Title.buttonGraphic.clear();
	GAME.Title.buttonGraphic.lineStyle(getGridWidth(), GAME.Grid.gridColor, 1);
	GAME.Title.buttonGraphic.beginFill(GAME.Title.buttonColor, 1);
	GAME.Title.hamburgerGraphic.clear();
	GAME.Title.hamburgerGraphic.lineStyle(getGridWidth(), GAME.Title.hamburgerColor, 1); //width, color, alpha
	if(isVertical) {
		GAME.Title.letterS.rotation = -Math.PI/2.0;
		GAME.Title.letterL.rotation = -Math.PI/2.0;
		GAME.Title.letterI.rotation = -Math.PI/2.0;
		GAME.Title.letterD.rotation = -Math.PI/2.0;
		GAME.Title.letterE.rotation = -Math.PI/2.0;
		GAME.Title.letterR.rotation = -Math.PI/2.0;
		GAME.Title.letterS.y = pixelFromPercentHeight(GAME.Title.letterHeights[5]) - GAME.Title.letterS.width/2.0;
		GAME.Title.letterL.y = pixelFromPercentHeight(GAME.Title.letterHeights[4]);
		GAME.Title.letterI.y = pixelFromPercentHeight(GAME.Title.letterHeights[3]) + GAME.Title.letterI.width/2.0;
		GAME.Title.letterD.y = pixelFromPercentHeight(GAME.Title.letterHeights[2]) + GAME.Title.letterD.width;
		GAME.Title.letterE.y = pixelFromPercentHeight(GAME.Title.letterHeights[1]) + (2.0 * GAME.Title.letterE.width) ;
		GAME.Title.letterR.y = pixelFromPercentHeight(GAME.Title.letterHeights[0]) + (1.5 * GAME.Title.letterR.width) ;
		xRect = pixelFromPercentWidth(2);
		xPlacement = pixelFromPercentWidth(GAME.Title.vertWidthPercent);
		lineStart = xRect + (2.0*tileWidth/10.0);
		lineEnd = xRect + (6.0*tileWidth/10.0);
		var left = 21, right = 10;
		GAME.Title.hamburgerGraphic.moveTo(lineStart, pixelFromPercentHeight(left));
		GAME.Title.hamburgerGraphic.lineTo(lineStart, pixelFromPercentHeight(right));
		GAME.Title.hamburgerGraphic.moveTo(lineStart + Math.abs(lineStart - lineEnd)/2.0, pixelFromPercentHeight(left));
		GAME.Title.hamburgerGraphic.lineTo(lineStart + Math.abs(lineStart - lineEnd)/2.0, pixelFromPercentHeight(right));
		GAME.Title.hamburgerGraphic.moveTo(lineEnd, pixelFromPercentHeight(left));
		GAME.Title.hamburgerGraphic.lineTo(lineEnd, pixelFromPercentHeight(right));
	} else {
		if(GAME.Grid.gravDirection === GAME.Grid.Direction.Right) {
			xRect = pixelFromPercentWidth(98) - gridShifterW;
			xPlacement = xRect + (tileWidth/2.0) - (2.0*GAME.Title.letterD.width/5.0);

		} else {
			xRect = pixelFromPercentWidth(2);
			xPlacement = xRect + (tileWidth/2.0) - (2.0*GAME.Title.letterD.width/5.0);
		}
		GAME.Title.letterS.rotation = 0;
		GAME.Title.letterL.rotation = 0;
		GAME.Title.letterI.rotation = 0;
		GAME.Title.letterD.rotation = 0;
		GAME.Title.letterE.rotation = 0;
		GAME.Title.letterR.rotation = 0;
		GAME.Title.letterS.y = pixelFromPercentHeight(GAME.Title.letterHeights[0]);
		GAME.Title.letterL.y = pixelFromPercentHeight(GAME.Title.letterHeights[1]) + GAME.Title.letterL.height/12.0;
		GAME.Title.letterI.y = pixelFromPercentHeight(GAME.Title.letterHeights[2]) - GAME.Title.letterD.height/2.0;
		GAME.Title.letterD.y = pixelFromPercentHeight(GAME.Title.letterHeights[3]) - (4.0 * GAME.Title.letterD.height/5.0);
		GAME.Title.letterE.y = pixelFromPercentHeight(GAME.Title.letterHeights[4]) - GAME.Title.letterE.height ;
		GAME.Title.letterR.y = pixelFromPercentHeight(GAME.Title.letterHeights[5]) - (1.2 * GAME.Title.letterR.height);
		lineStart = xRect + (2.0*tileWidth/10.0);
		lineEnd = xRect + (8.0*tileWidth/10.0);
		var startHeight = 12;
		GAME.Title.hamburgerGraphic.moveTo(lineStart, pixelFromPercentHeight(startHeight));
		GAME.Title.hamburgerGraphic.lineTo(lineEnd, pixelFromPercentHeight(startHeight));
		GAME.Title.hamburgerGraphic.moveTo(lineStart, pixelFromPercentHeight(startHeight + 4));
		GAME.Title.hamburgerGraphic.lineTo(lineEnd, pixelFromPercentHeight(startHeight + 4));
		GAME.Title.hamburgerGraphic.moveTo(lineStart, pixelFromPercentHeight(startHeight + 8));
		GAME.Title.hamburgerGraphic.lineTo(lineEnd, pixelFromPercentHeight(startHeight + 8));
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
	GAME.Title.letterR.x = xPlacement;
	if(!isVertical) GAME.Title.letterI.x = GAME.Title.letterI.x  + GAME.Title.letterI.width/3.0;
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
	//Hamburger Menu Graphic

	// GAME.Title.hamburgerGraphic.pivot = new PIXI.Point(lineStart + lineEnd/2.0, pixelFromPercentHeight(17));
	// if(isVertical) GAME.Title.hamburgerGraphic.rotation = -Math.PI/2.0;
	// else GAME.Title.hamburgerGraphic.rotation = 0; //TODO: figure out rotation with pivot, seems to work just not right order
}



