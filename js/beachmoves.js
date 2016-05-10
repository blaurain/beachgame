
// create an new instance of a pixi stage
var stage = new PIXI.Container();

// create a renderer instance
// var mainCanvas = document.getElementById('mainCanvas');
var rendererOptions = {
  antialiasing: false,
  transparent: false,
  resolution: 1,
  autoResize: true
}
var GAME_WIDTH = 736;
var GAME_HEIGHT = 414;
var renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, rendererOptions); 
var tileCorner = 10;
var tileHeight, tileWidth;
var isHorizontal;
renderer.backgroundColor = 0xff0000;
stage.interactive = true;

drawGrid(stage);
//renderer.render(stage);

resize();
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
window.addEventListener("resize", resize);
//END SETUP**************************
// renderer.render(stage);


function drawGrid(stage) {

	var gridGraphics = new PIXI.Graphics();
	gridGraphics.lineStyle(10, 0xFF823A, 1); //width, color, alpha

	//outside
	gridGraphics.drawRoundedRect(pixelFromPercentWidth(26), pixelFromPercentHeight(6),
		pixelFromPercentWidth(72), pixelFromPercentHeight(88), 10);
	//vertical
	gridGraphics.moveTo(pixelFromPercentWidth(38), pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(38), pixelFromPercentHeight(94));
	gridGraphics.moveTo(pixelFromPercentWidth(50), pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(50), pixelFromPercentHeight(94));
	gridGraphics.moveTo(pixelFromPercentWidth(62), pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(62), pixelFromPercentHeight(94));
	gridGraphics.moveTo(pixelFromPercentWidth(74), pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(74), pixelFromPercentHeight(94));
	gridGraphics.moveTo(pixelFromPercentWidth(86), pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(86), pixelFromPercentHeight(94));
	//horizontal
	gridGraphics.moveTo(pixelFromPercentWidth(26), pixelFromPercentHeight(72));
	gridGraphics.lineTo(pixelFromPercentWidth(98), pixelFromPercentHeight(72));
	gridGraphics.moveTo(pixelFromPercentWidth(26), pixelFromPercentHeight(50));
	gridGraphics.lineTo(pixelFromPercentWidth(98), pixelFromPercentHeight(50));
	gridGraphics.moveTo(pixelFromPercentWidth(26), pixelFromPercentHeight(28));
	gridGraphics.lineTo(pixelFromPercentWidth(98), pixelFromPercentHeight(28));
	//return
	gridGraphics.moveTo(pixelFromPercentWidth(26), pixelFromPercentHeight(6));

	stage.addChild(gridGraphics);
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
			var rectangle = new PIXI.Graphics();
			var tileColor = getRandomTileColor();
			rectangle.lineStyle(0, tileColor, 1);
			rectangle.beginFill(tileColor);
			rectangle.drawRoundedRect(pixelFromPercentWidth(starterTiles[row][col].xPercent), 
				pixelFromPercentHeight(starterTiles[row][col].yPercent) + 1, tileWidth, tileHeight, tileCorner);
			rectangle.endFill();
			stage.addChild(rectangle);
		};
	};
}

function pixelFromPercentWidth(percent) {
	return Math.ceil(renderer.width * (percent/100));
}
function pixelFromPercentHeight(percent) {
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

function resize() {
//MAYBE DONT SCALE AT ALL? SMALLER THAN MOBILE WILL NEED SMALLER BOXES (worth it?)
	rotateHorizontal();

	if(window.innerWidth > GAME_WIDTH && window.innerHeight > GAME_HEIGHT)
	{ //Larger than needs be, desktop mode
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
		  renderer.resize(Math.min(Math.ceil(GAME_WIDTH * ratio), GAME_WIDTH),
		                  Math.min(Math.ceil(GAME_HEIGHT * ratio), GAME_HEIGHT));
		}
		else
		{ //vertical
		  ratio = Math.min(window.innerWidth/GAME_HEIGHT,
		                   window.innerHeight/GAME_WIDTH);
		  
		  // Scale the view appropriately to fill that dimension
		  if(ratio < 1) stage.scale.x = stage.scale.y = ratio;
		  else stage.scale.x = stage.scale.y = 1;

		  rotateVertical();
		  // Update the renderer dimensions
		  renderer.resize(Math.min(Math.ceil(GAME_HEIGHT * ratio), GAME_HEIGHT),
		                  Math.min(Math.ceil(GAME_WIDTH * ratio), GAME_WIDTH));
		}
	}

 // renderer.resize(window.innerWidth,window.innerHeight);
 renderer.render(stage);
}

function rotateHorizontal() {
	stage.rotation = 0;
	stage.x = 0;
}

function rotateVertical() {
	stage.rotation = Math.PI/2.0;
	stage.x = window.innerWidth;
}














