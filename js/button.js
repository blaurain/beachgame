var GAME = GAME || {};

GAME.Button = function(xPercent, yPercent, width, height, text) {
	this.xPercent = xPercent;
	this.yPercent = yPercent;
	this.wPercent = width;
	this.hPercent = height;
	this.text = text;
	this.buttonGraphic = new PIXI.Graphics();
	this.cornerRadius = 15;
	this.buttonColor = 0x16a085;
	this.buttonBorderColor = 0x34495e;

	this.draw = function () {
		this.buttonGraphic.clear();
		this.buttonGraphic.lineStyle(getGridWidth(), this.buttonBorderColor, 1);
		this.buttonGraphic.beginFill(this.buttonColor, 1);
		var buttonWidth = pixelFromPercentWidth(this.wPercent);
		var buttonHeight = pixelFromPercentHeight(this.hPercent);
		this.buttonGraphic.drawRoundedRect(
			pixelFromPercentWidth(this.xPercent) - (buttonWidth/2.0), 
			pixelFromPercentHeight(this.yPercent)- (buttonHeight/2.0), 
			buttonWidth, 
			buttonHeight, 
			this.cornerRadius);
		this.buttonGraphic.endFill();
	}
}
GAME.Button.constructor = GAME.Button;

// GAME.Button.draw = function () {
// 	this.buttonGraphic.clear();
// 	tileGraphic.lineStyle(1, this.buttonBorderColor, 1);
// 	this.buttonGraphic.beginFill(this.buttonColor, 1);
// 	this.buttonGraphic.drawRoundedRect(
// 		pixelFromPercentWidth(this.xPercent), 
// 		pixelFromPercentWidth(this.yPercent), 
// 		pixelFromPercentWidth(this.wPercent), 
// 		pixelFromPercentWidth(this.hPercent), 
// 		this.cornerRadius);
// 	this.buttonGraphic.endFill();
// }


