var GAME = GAME || {};

GAME.Button = function(xPercent, yPercent, width, height, text, yVertPercent) {
	this.showButton= false;
	this.xPercent = xPercent;
	this.yPercent = yPercent;
	this.wPercent = width;
	this.hPercent = height;
	this.yVertPercent = yVertPercent;
	this.text = text;
	this.buttonGraphic = new PIXI.Graphics();
	this.cornerRadius = 15;
	this.buttonColor = 0x16a085;
	this.buttonTextColor = 0x000000;
	this.buttonBorderColor = 0x34495e;
	this.fontStyle = {
		font : Math.ceil(renderer.height / 8.0) + 'px ' + GAME.Title.fontFamily, 
		fill : this.buttonTextColor,
		align : 'center'
	}; 
	this.buttonText = new PIXI.Text(text, this.fontStyle);

	this.draw = function () {
		this.buttonGraphic.clear();
		this.fontStyle = {
			font : Math.ceil(renderer.height / 8.0) + 'px ' + GAME.Title.fontFamily, 
			fill : this.buttonTextColor,
			align : 'center'
		}; 
		this.buttonText.style = this.fontStyle;
		this.buttonGraphic.lineStyle(getGridWidth(), this.buttonBorderColor, 1);
		this.buttonGraphic.beginFill(this.buttonColor, 1);
		var buttonWidth, buttonHeight, x, y;
		if(isVertical) {
			this.buttonText.rotation = -Math.PI/2.0;
			buttonWidth = pixelFromPercentHeight(this.hPercent);
			buttonHeight = pixelFromPercentWidth(this.wPercent);
			x = pixelFromPercentWidth(this.yVertPercent) - (buttonWidth/2.0);
			y = pixelFromPercentHeight(this.xPercent) - (buttonHeight/2.0);
			this.buttonText.x = x + (buttonWidth/2.0) - (this.buttonText.height/2.0);
			this.buttonText.y = y + (buttonHeight/2.0) + (this.buttonText.width/2.0);
		} else {
			this.buttonText.rotation = 0;
			buttonWidth = pixelFromPercentWidth(this.wPercent);
			buttonHeight = pixelFromPercentHeight(this.hPercent);
			x = pixelFromPercentWidth(this.xPercent) - (buttonWidth/2.0);
			y = pixelFromPercentHeight(this.yPercent)- (buttonHeight/2.0);
			this.buttonText.x = x + (buttonWidth/2.0) - (this.buttonText.width/2.0);
			this.buttonText.y = y + (buttonHeight/2.0) - (this.buttonText.height/2.0);
		}
		this.buttonGraphic.drawRect(x, y, buttonWidth, buttonHeight);
		this.buttonGraphic.endFill();
		this.buttonGraphic.interactive = true;
		this.buttonGraphic.buttonMode = true;
		this.buttonGraphic.hitArea = new PIXI.Rectangle(x, y, buttonWidth, buttonHeight);
	}

	this.show = function () {
		this.showButton = true;
		stage.addChild(this.buttonGraphic);	
		stage.addChild(this.buttonText);
	}

	this.hide = function () {
		this.showButton = false;
		stage.removeChild(this.buttonGraphic);
		stage.removeChild(this.buttonText); //TODO: cleanup 
	}
}
GAME.Button.constructor = GAME.Button;



