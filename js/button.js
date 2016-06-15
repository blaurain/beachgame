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
	this.buttonTextColor = 0x000000;
	this.buttonBorderColor = 0x34495e;
	this.fontStyle = {
		font : Math.ceil(GAME.Title.fontSize) + 'px ' + GAME.Title.fontFamily, 
		fill : this.buttonTextColor,
		align : 'center'
	}; 
	this.buttonText = new PIXI.Text(text, this.fontStyle);

	this.draw = function () {
		this.buttonGraphic.clear();
		this.buttonGraphic.lineStyle(getGridWidth(), this.buttonBorderColor, 1);
		this.buttonGraphic.beginFill(this.buttonColor, 1);
		var buttonWidth = pixelFromPercentWidth(this.wPercent);
		var buttonHeight = pixelFromPercentHeight(this.hPercent);
		var x = pixelFromPercentWidth(this.xPercent) - (buttonWidth/2.0);
		var y = pixelFromPercentHeight(this.yPercent)- (buttonHeight/2.0);
		this.buttonGraphic.drawRoundedRect(x, y, buttonWidth, buttonHeight, this.cornerRadius);
		this.buttonGraphic.endFill();

		// this.buttonText.clear();
		// this.fontStyle = {
		// 	font : Math.ceil(GAME.Title.fontSize) + 'px ' + GAME.Title.fontFamily, 
		// 	fill : this.buttonTextColor,
		// 	align : 'center'
		// }; 
		// this.buttonText.style = this.fontStyle;
		this.buttonText.x = x + (buttonWidth/2.0) - (this.buttonText.width/2.0);
		this.buttonText.y = y + (buttonHeight/2.0) - (this.buttonText.height/2.0);
	}

	this.show = function () {
		show = true;
		stage.addChild(this.buttonGraphic);	
		stage.addChild(this.buttonText);
		this.draw();
	}

	this.hide = function () {
		show = false;
		stage.removeChild(this.buttonGraphic);
		stage.removeChild(this.buttonText); //TODO: cleanup 
	}
}
GAME.Button.constructor = GAME.Button;



