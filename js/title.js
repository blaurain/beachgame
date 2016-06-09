var GAME = GAME || {};

GAME.Title = function() {
}
GAME.Title.constructor = GAME.Title;
GAME.Title.fontStyle = {};
GAME.Title.fontColor = 0xff1010;
GAME.Title.fontFamily = 'Arial';
GAME.Title.fontSize = 66;
GAME.Title.widthPercent = 4;
GAME.Title.letterLocations = [];

GAME.Title.init = function() {
	GAME.Title.arrowGraphic = new PIXI.Graphics();
	stage.addChild(GAME.Title.arrowGraphic);
	GAME.Title.fontStyle = {
		font : GAME.Title.fontSize + 'px ' + GAME.Title.fontFamily, 
		fill : GAME.Title.fontColor}; 
	GAME.Title.letterS = new PIXI.Text('S', GAME.Title.fontStyle);
	GAME.Title.letterL = new PIXI.Text('L', GAME.Title.fontStyle);
	GAME.Title.letterI = new PIXI.Text('I', GAME.Title.fontStyle);
	GAME.Title.letterD = new PIXI.Text('D', GAME.Title.fontStyle);
	GAME.Title.letterE = new PIXI.Text('E', GAME.Title.fontStyle);
	stage.addChild(GAME.Title.letterS);
	stage.addChild(GAME.Title.letterL);
	stage.addChild(GAME.Title.letterI);
	stage.addChild(GAME.Title.letterD);
	stage.addChild(GAME.Title.letterE);
	GAME.Title.draw();
}
GAME.Title.draw = function() {
	GAME.Title.fontSize = renderer.height / 8.0;
	GAME.Title.fontStyle = {
		font : GAME.Title.fontSize + 'px ' + GAME.Title.fontFamily, 
		fill : GAME.Title.fontColor}; 
	GAME.Title.letterS.style = (GAME.Title.fontStyle);
	GAME.Title.letterL.style = (GAME.Title.fontStyle);
	GAME.Title.letterI.style = (GAME.Title.fontStyle);
	GAME.Title.letterD.style = (GAME.Title.fontStyle);
	GAME.Title.letterE.style = (GAME.Title.fontStyle);
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
}




