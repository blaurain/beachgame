
// create an new instance of a pixi stage
var stage = new PIXI.Container();

// create a renderer instance
// var mainCanvas = document.getElementById('mainCanvas');
var rendererOptions = {
  antialiasing: false,
  transparent: false,
  resolution: 1,
  autoResize: false,
  clearBeforeRender: true
}
var GAME_WIDTH = 1136;
var GAME_HEIGHT = 640;
var renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, rendererOptions); 
var tileCorner = 10;
var tileHeight, tileWidth;
var gridShifter = 0;
var isVertical = false;
stage.interactive = true;

var gridGraphics = new PIXI.Graphics();
var tileGraphics = [];

// redraw(stage);
// drawTiles(stage);
// drawGrid(stage);
//renderer.render(stage);
init();
resize();
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
window.addEventListener("resize", resize);
//END SETUP**************************
// renderer.render(stage);

function init() {
	for (var row = 0; row < 4; row++) {
		tileGraphics[row] = [];
		for (var col = 0; col < 6; col++) {
			tileGraphics[row][col] = new PIXI.Graphics();
			stage.addChild(tileGraphics[row][col]);
		};
	};
	stage.addChild(gridGraphics);
}

function redraw(stage){
	setGridShifter();
	drawTiles(stage);
	drawGrid(stage);
	renderer.render(stage);
}

function drawGrid(stage) {
	// gridGraphics.clearBeforeRender = true;
	gridGraphics.clear();
	gridGraphics.lineStyle(10, 0xFF823A, 1); //width, color, alpha

	//outside
	gridGraphics.drawRoundedRect(pixelFromPercentWidth(26) - gridShifter, pixelFromPercentHeight(6),
		pixelFromPercentWidth(72), pixelFromPercentHeight(88), 10);
	//vertical
	gridGraphics.moveTo(pixelFromPercentWidth(38) - gridShifter, pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(38) - gridShifter, pixelFromPercentHeight(94));
	gridGraphics.moveTo(pixelFromPercentWidth(50) - gridShifter, pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(50) - gridShifter, pixelFromPercentHeight(94));
	gridGraphics.moveTo(pixelFromPercentWidth(62) - gridShifter, pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(62) - gridShifter, pixelFromPercentHeight(94));
	gridGraphics.moveTo(pixelFromPercentWidth(74) - gridShifter, pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(74) - gridShifter, pixelFromPercentHeight(94));
	gridGraphics.moveTo(pixelFromPercentWidth(86) - gridShifter, pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(86) - gridShifter, pixelFromPercentHeight(94));
	//horizontal
	gridGraphics.moveTo(pixelFromPercentWidth(26) - gridShifter, pixelFromPercentHeight(72));
	gridGraphics.lineTo(pixelFromPercentWidth(98) - gridShifter, pixelFromPercentHeight(72));
	gridGraphics.moveTo(pixelFromPercentWidth(26) - gridShifter, pixelFromPercentHeight(50));
	gridGraphics.lineTo(pixelFromPercentWidth(98) - gridShifter, pixelFromPercentHeight(50));
	gridGraphics.moveTo(pixelFromPercentWidth(26) - gridShifter, pixelFromPercentHeight(28));
	gridGraphics.lineTo(pixelFromPercentWidth(98) - gridShifter, pixelFromPercentHeight(28));
	//return
	gridGraphics.moveTo(pixelFromPercentWidth(26) - gridShifter, pixelFromPercentHeight(6));

	// stage.addChild(gridGraphics);
}

function drawTiles(stage) {
	tileHeight = pixelFromPercentHeight(22) - 2;
	tileWidth = pixelFromPercentWidth(12) - 2;

	var starterTiles = [[]];
	starterTiles[0][0] = new Tile(0,0,26,6);
	starterTiles[0][1] = new Tile(0,1,38,6);
	starterTiles[0][2] = new Tile(0,2,50,6);
	starterTiles[0][3] = new Tile(0,3,62,6);
	starterTiles[0][4] = new Tile(0,4,74,6);
	starterTiles[0][5] = new Tile(0,5,86,6);
	starterTiles[1] = [];
	starterTiles[1][0] = new Tile(1,0,26,28);
	starterTiles[1][1] = new Tile(1,1,38,28);
	starterTiles[1][2] = new Tile(1,2,50,28);
	starterTiles[1][3] = new Tile(1,3,62,28);
	starterTiles[1][4] = new Tile(1,4,74,28);
	starterTiles[1][5] = new Tile(1,5,86,28);
	starterTiles[2] = [];
	starterTiles[2][0] = new Tile(2,0,26,50);
	starterTiles[2][1] = new Tile(2,1,38,50);
	starterTiles[2][2] = new Tile(2,2,50,50);
	starterTiles[2][3] = new Tile(2,3,62,50);
	starterTiles[2][4] = new Tile(2,4,74,50);
	starterTiles[2][5] = new Tile(2,5,86,50);
	starterTiles[3] = [];
	starterTiles[3][0] = new Tile(3,0,26,72);
	starterTiles[3][1] = new Tile(3,1,38,72);
	starterTiles[3][2] = new Tile(3,2,50,72);
	starterTiles[3][3] = new Tile(3,3,62,72);
	starterTiles[3][4] = new Tile(3,4,74,72);
	starterTiles[3][5] = new Tile(3,5,86,72);

	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 6; col++) {
			var tileColor = getRandomTileColor();
			tileGraphics[row][col].clear();
			tileGraphics[row][col].lineStyle(0, tileColor, 1);
			tileGraphics[row][col].beginFill(tileColor);
			tileGraphics[row][col].drawRoundedRect(pixelFromPercentWidth(starterTiles[row][col].xPercent) - gridShifter, 
				pixelFromPercentHeight(starterTiles[row][col].yPercent) + 1, tileWidth, tileHeight, tileCorner);
			tileGraphics[row][col].endFill();
		};
	};
}

function pixelFromPercentWidth(percent) {
	// if(!isVertical) return Math.ceil(renderer.width * (percent/100));
	// else return Math.ceil(renderer.height * (percent/100));
	return Math.ceil(renderer.width * (percent/100));
}
function pixelFromPercentHeight(percent) {
	// if(!isVertical) return Math.ceil(renderer.height * (percent/100));
	// else return Math.ceil(renderer.width * (percent/100));
	return Math.ceil(renderer.height * (percent/100));
}

function getRandomTileColor() {
	switch(Math.floor(Math.random() * 8)) {
	    case 0:
	        return 0x72F6FF;
	    // case 1:
	    //     return 0xF04155;
	    case 2:
	        return 0xC1E8C7;
	    // case 3:
	    //     return 0xFF7D4F; //orange
	    case 4:
	        return 0xEFFF7BD;
	    case 5:
	        return 0xD3658D;
	    case 6:
	        return 0x95CFB7; 
	    case 7:
	        return 0xEDE9F8;
	        //  case 5:
	        // return 0xD3658D;
	    default:
	        return 0x00AAFF;
	}
}

function setGridShifter() {
	if(window.innerWidth < GAME_WIDTH || window.innerHeight < GAME_HEIGHT) {
		if(window.innerWidth < window.innerHeight) {
			ratio = window.innerWidth/GAME_HEIGHT;
		    yRatio = (window.innerHeight/GAME_WIDTH)
		    if((ratio - yRatio) > .05 && ratio <= 1) {
		    	gridShifter = window.innerHeight * .43;
		    }
		}

	}
}

function resize() {
//MAYBE DONT SCALE AT ALL? SMALLER THAN MOBILE WILL NEED SMALLER BOXES (worth it?)
	renderer.resize(GAME_WIDTH, GAME_HEIGHT);
	redraw(stage);

	rotateHorizontal();
	// gridShifter = 0;
	isVertical = false;
// redraw(stage);
	if(window.innerWidth > GAME_WIDTH && window.innerHeight > GAME_HEIGHT)
	{ //Larger than needs be, desktop mode
		// redraw(stage);
		renderer.resize(GAME_WIDTH, GAME_HEIGHT);
		renderer.view.style.position = "relative";

		var centerX = Math.ceil((window.innerWidth / 2.0) - (GAME_WIDTH / 2.0));
		var centerY = Math.ceil((window.innerHeight / 2.0) - (GAME_HEIGHT / 2.0));

		renderer.view.style.top = centerY + "px";
		renderer.view.style.left = centerX + "px";
	}
	else
	{  //mobile/small
		renderer.view.style.position = "absolute";
		renderer.view.style.top = "0px";
		renderer.view.style.left = "0px";

		 if(window.innerWidth > window.innerHeight)
		 { //horizontal
		  // Determine which screen dimension is most constrained
		  ratio = Math.min(window.innerWidth/GAME_WIDTH,
		                   window.innerHeight/GAME_HEIGHT);
		 
		  // Scale the view appropriately to fill that dimension
		  if(ratio < 1) stage.scale.x = stage.scale.y = ratio;
		  else stage.scale.x = stage.scale.y = 1;
		  // Update the renderer dimensions
		  // renderer.resize(Math.min(Math.ceil(GAME_WIDTH * ratio), GAME_WIDTH),
		  //                 Math.min(Math.ceil(GAME_HEIGHT * ratio), GAME_HEIGHT));
		  // renderer.resize(window.innerWidth, window.innerHeight);
		}
		else
		{ //vertical
		    // ratio = Math.min(window.innerWidth/GAME_HEIGHT,
		    //                window.innerHeight/GAME_WIDTH);
			isVertical = true;
		    ratio = window.innerWidth/GAME_HEIGHT;
		    // yRatio = (window.innerHeight/GAME_WIDTH)
		    // if((ratio - yRatio) > .05) {
		    // 	gridShifter = 40;
		    // }

		    // Scale the view appropriately to fill that dimension
			stage.scale.x = stage.scale.y = ratio;

		    rotateVertical();
			// renderer.resize(window.innerWidth, window.innerHeight);
		}

		// redraw(stage);
		renderer.resize(window.innerWidth, window.innerHeight);

	}

	// redraw(stage);
 renderer.render(stage);
}

function rotateHorizontal() {
	stage.rotation = 0;
	stage.x = 0;
}

function rotateVertical() {
	stage.rotation = Math.PI/2.0;
	stage.x = window.innerWidth;
	stage.y = 0;
}














