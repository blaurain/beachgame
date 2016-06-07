var GAME = GAME || {};

GAME.Title = function() {
}
GAME.Title.constructor = GAME.Title;
GAME.Title.fontStyle = {};
GAME.Title.fontColor = 0xff1010;
GAME.Title.fontFamily = 'Arial';
GAME.Title.fontSize = 66;
GAME.Title.letterLocations = [];

GAME.Title.init = function() {

	GAME.Title.fontStyle = {
		font : GAME.Title.fontSize + 'px ' + GAME.Title.fontFamily, 
		fill : GAME.Title.fontColor}; 
	GAME.Title.letterS = new PIXI.Text('S', GAME.Title.fontStyle);
	GAME.Title.letterL = new PIXI.Text('L', GAME.Title.fontStyle);
	GAME.Title.letterD = new PIXI.Text('D', GAME.Title.fontStyle);
	GAME.Title.letterE = new PIXI.Text('E', GAME.Title.fontStyle);
	stage.addChild(GAME.Title.letterS);
	stage.addChild(GAME.Title.letterL);
	stage.addChild(GAME.Title.letterD);
	stage.addChild(GAME.Title.letterE);

	GAME.Title.draw();
}
GAME.Title.draw = function() {

	GAME.Title.fontStyle = {
		font : GAME.Title.fontSize + 'px ' + GAME.Title.fontFamily, 
		fill : GAME.Title.fontColor}; 
	GAME.Title.letterS.setStyle(GAME.Title.fontStyle);
	GAME.Title.letterL.setStyle(GAME.Title.fontStyle);
	GAME.Title.letterD.setStyle(GAME.Title.fontStyle);
	GAME.Title.letterE.setStyle(GAME.Title.fontStyle);

}
GAME.Title.drawArrow = function() {

}
