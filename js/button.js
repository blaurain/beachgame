var GAME = GAME || {};

GAME.Button = function(xPercent, yPercent, width, height, text, xVertPercent, yVertPercent) {
	this.showButton= false;
	this.xPercent = xPercent;
	this.yPercent = yPercent;
	this.wPercent = width;
	this.hPercent = height;
	this.yVertPercent = yVertPercent;
	this.xVertPercent = xVertPercent;
	this.text = text;
	this.buttonGraphic = new PIXI.Graphics();
	this.cornerRadius = 15;
	this.buttonColor = 0xefe8c2;
	this.buttonTextColor = 0x000000;
	this.buttonBorderColor = 0xdd8c77;
	this.fontStyle = {
		font : Math.ceil(renderer.height / 8.0) + 'px ' + GAME.Title.fontFamily, 
		fill : this.buttonTextColor,
		align : 'center'
	}; 
	this.buttonText = new PIXI.Text(text, this.fontStyle);
	this.drawManualX = false;

	this.draw = function (manualX) {
		if(manualX) {
			this.drawManualX = true;
			this.manualX = manualX;
		}
		this.buttonGraphic.clear();
		this.fontStyle = {
			font : Math.ceil(renderer.height / 8.0) + 'px ' + GAME.Title.fontFamily, 
			fill : this.buttonTextColor,
			align : 'center'
		}; 
		this.buttonText.style = this.fontStyle;
		this.buttonGraphic.lineStyle(getGridWidth(), this.buttonBorderColor, 1);
		this.buttonGraphic.beginFill(this.buttonColor, 1);
		if(isVertical) {
			this.buttonText.rotation = -Math.PI/2.0;
			this.buttonWidth = pixelFromPercentHeight(this.hPercent);
			this.buttonHeight = pixelFromPercentWidth(this.wPercent);
			this.buttonX = pixelFromPercentWidth(this.yVertPercent) - (this.buttonWidth/2.0);
			if(this.drawManualX) {
				this.buttonY = this.manualX;
			} else {
				this.buttonY = pixelFromPercentHeight(this.xPercent) - (this.buttonHeight/2.0);
			}
			this.buttonText.x = this.buttonX + (this.buttonWidth/2.0) - (this.buttonText.height/2.0);
			this.buttonText.y = this.buttonY + (this.buttonHeight/2.0) + (this.buttonText.width/2.0);
		} else {
			this.buttonText.rotation = 0;
			this.buttonWidth = pixelFromPercentWidth(this.wPercent);
			this.buttonHeight = pixelFromPercentHeight(this.hPercent);
			if(this.drawManualX) {
				this.buttonX = this.manualX;
			} else {
				this.buttonX = pixelFromPercentWidth(this.xPercent) - (this.buttonWidth/2.0);
			}
			this.buttonY = pixelFromPercentHeight(this.yPercent)- (this.buttonHeight/2.0);
			this.buttonText.x = this.buttonX + (this.buttonWidth/2.0) - (this.buttonText.width/2.0);
			this.buttonText.y = this.buttonY + (this.buttonHeight/2.0) - (this.buttonText.height/2.0);
		}
		this.buttonGraphic.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
		this.buttonGraphic.endFill();
		this.buttonGraphic.interactive = true;
		this.buttonGraphic.buttonMode = true;
		this.buttonGraphic.hitArea = new PIXI.Rectangle(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
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



