
// create an new instance of a pixi stage
var stage = new PIXI.Container();

// create a renderer instance
// var mainCanvas = document.getElementById('mainCanvas');
var rendererOptions = {
  antialiasing: false,
  transparent: false,
  resolution: 1,
  autoResize: true,
  clearBeforeRender: true
}
var GAME_WIDTH = 1136;
var GAME_HEIGHT = 640;
var renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, rendererOptions); 
var tileCorner = 10;
var selectedAlpha = 1.0;
var unselectedAlpha = .7;
var tileHeight, tileWidth;
var gridShifterW = 0, gridShifterH = 0;
var isVertical = false;
stage.interactive = true;

var gridGraphics = new PIXI.Graphics();
var tileGraphics = [];
var tiles = [[]];

init();
resize();
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
window.addEventListener("resize", resize);
//END SETUP**************************

function init() {
	for (var row = 0; row < 4; row++) {
		tileGraphics[row] = [];
		tiles[row] = [];
		for (var col = 0; col < 6; col++) {
			tileGraphics[row][col] = new PIXI.Graphics();
			stage.addChild(tileGraphics[row][col]);
			tiles[row][col] = new Tile();
		};
	};
	stage.addChild(gridGraphics);
	createTiles(stage);
}

function redraw(stage){
	drawTiles(stage);
	drawGrid(stage);
	// renderer.render(stage);
}

function drawGrid(stage) {
	// gridGraphics.clearBeforeRender = true;
	gridGraphics.clear();
	gridGraphics.lineStyle(10, 0xFF823A, 1); //width, color, alpha

	//outside
	gridGraphics.drawRoundedRect(pixelFromPercentWidth(26) - gridShifterW, pixelFromPercentHeight(6),
		pixelFromPercentWidth(72), pixelFromPercentHeight(88), 10);
	//vertical
	gridGraphics.moveTo(pixelFromPercentWidth(38) - gridShifterW, pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(38) - gridShifterW, pixelFromPercentHeight(94));
	gridGraphics.moveTo(pixelFromPercentWidth(50) - gridShifterW, pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(50) - gridShifterW, pixelFromPercentHeight(94));
	gridGraphics.moveTo(pixelFromPercentWidth(62) - gridShifterW, pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(62) - gridShifterW, pixelFromPercentHeight(94));
	gridGraphics.moveTo(pixelFromPercentWidth(74) - gridShifterW, pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(74) - gridShifterW, pixelFromPercentHeight(94));
	gridGraphics.moveTo(pixelFromPercentWidth(86) - gridShifterW, pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(86) - gridShifterW, pixelFromPercentHeight(94));
	//horizontal
	gridGraphics.moveTo(pixelFromPercentWidth(26) - gridShifterW, pixelFromPercentHeight(72));
	gridGraphics.lineTo(pixelFromPercentWidth(98) - gridShifterW, pixelFromPercentHeight(72));
	gridGraphics.moveTo(pixelFromPercentWidth(26) - gridShifterW, pixelFromPercentHeight(50));
	gridGraphics.lineTo(pixelFromPercentWidth(98) - gridShifterW, pixelFromPercentHeight(50));
	gridGraphics.moveTo(pixelFromPercentWidth(26) - gridShifterW, pixelFromPercentHeight(28));
	gridGraphics.lineTo(pixelFromPercentWidth(98) - gridShifterW, pixelFromPercentHeight(28));
	//return
	gridGraphics.moveTo(pixelFromPercentWidth(26) - gridShifterW, pixelFromPercentHeight(6));
}

function createTiles(stage) {
	tileHeight = pixelFromPercentHeight(22) - 2;
	tileWidth = pixelFromPercentWidth(12) - 2;

	tiles[0][0] = new Tile(0,0);
	tiles[0][1] = new Tile(0,1);
	tiles[0][2] = new Tile(0,2);
	tiles[0][3] = new Tile(0,3);
	tiles[0][4] = new Tile(0,4);
	tiles[0][5] = new Tile(0,5);
	tiles[1][0] = new Tile(1,0);
	tiles[1][1] = new Tile(1,1);
	tiles[1][2] = new Tile(1,2);
	tiles[1][3] = new Tile(1,3);
	tiles[1][4] = new Tile(1,4);
	tiles[1][5] = new Tile(1,5);
	tiles[2][0] = new Tile(2,0);
	tiles[2][1] = new Tile(2,1);
	tiles[2][2] = new Tile(2,2);
	tiles[2][3] = new Tile(2,3);
	tiles[2][4] = new Tile(2,4);
	tiles[2][5] = new Tile(2,5);
	tiles[3][0] = new Tile(3,0);
	tiles[3][1] = new Tile(3,1);
	tiles[3][2] = new Tile(3,2);
	tiles[3][3] = new Tile(3,3);
	tiles[3][4] = new Tile(3,4);
	tiles[3][5] = new Tile(3,5);

	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 6; col++) {
			tiles[row][col].tileColor = getRandomTileColor();
			tiles[row][col].xPosition = (pixelFromPercentWidth(percentFromCol(tiles[row][col].col)) - gridShifterW);
			tiles[row][col].yPosition = (pixelFromPercentHeight(percentFromRow(tiles[row][col].row)) + 1);
			tiles[row][col].isSelected = false;
			tileGraphics[row][col].interactive = true;
			tileGraphics[row][col].on('mousedown', onTilePressDown.bind({"row": row, "col": col}));
			tileGraphics[row][col].on('touchstart', onTilePressDown.bind({"row": row, "col": col}));
			tileGraphics[row][col].on('tap', onTileTap.bind({"row": row, "col": col}));
			tileGraphics[row][col].on('click', onTileTap.bind({"row": row, "col": col}));

		};
	};
}

function drawTiles(stage) {
	tileHeight = pixelFromPercentHeight(22) - 2;
	tileWidth = pixelFromPercentWidth(12) - 2;
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 6; col++) {
			tileGraphics[row][col].clear();
			tileGraphics[row][col].lineStyle(0, tiles[row][col].tileColor, selectedAlpha);
			if(tiles[row][col].isSelected) tileGraphics[row][col].beginFill(tiles[row][col].tileColor, selectedAlpha);
			else tileGraphics[row][col].beginFill(tiles[row][col].tileColor, unselectedAlpha);
			tiles[row][col].xPosition = (pixelFromPercentWidth(percentFromCol(tiles[row][col].col)) - gridShifterW);
			tiles[row][col].yPosition = (pixelFromPercentHeight(percentFromRow(tiles[row][col].row)) + 1);
			tileGraphics[row][col].drawRoundedRect(tiles[row][col].xPosition, tiles[row][col].yPosition, tileWidth, tileHeight, tileCorner);
			tileGraphics[row][col].endFill();
		};
	};
}

function pixelFromPercentWidth(percent) {
	return Math.ceil(renderer.width * (percent/100));
}
function pixelFromPercentHeight(percent) {
	return Math.ceil(renderer.height * (percent/100));
}

function setTileSelected(row, col, isSelected) {
	tiles[row][col].isSelected = isSelected;
	tileGraphics[row][col].clear();
	if(isSelected) tileGraphics[row][col].beginFill(tiles[row][col].tileColor, selectedAlpha);
	else tileGraphics[row][col].beginFill(tiles[row][col].tileColor, unselectedAlpha);
	tileGraphics[row][col].drawRoundedRect(tiles[row][col].xPosition, tiles[row][col].yPosition, tileWidth, tileHeight, tileCorner);
	tileGraphics[row][col].endFill();
	renderer.render(stage);
}



function onTilePressDown(data) {
	var row = this.row;
	var col = this.col;
// TODO: make selection smoother later, just tap for now
	// setTileSelected(row, col, true);
}

function onTileTap(data) {
	//tap can be remove too
	var row = this.row;
	var col = this.col;

	setTileSelected(row, col, !tiles[row][col].isSelected);
}

function resize() {
//MAYBE DONT SCALE AT ALL? SMALLER THAN MOBILE WILL NEED SMALLER BOXES (worth it?)
	// renderer.resize(GAME_WIDTH, GAME_HEIGHT);
	// redraw(stage);

	rotateHorizontal();
	// gridShifterW = 0;
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
		redraw(stage);
	}
	else
	{  //mobile/small
		window.scrollBy(0,0);
		renderer.view.style.position = "absolute";
		renderer.view.style.top = "0px";
		renderer.view.style.left = "0px";

		if(window.innerWidth < window.innerHeight)
		{ //vert
			isVertical = true;

			renderer.resize(window.innerHeight, window.innerWidth);
			redraw(stage);
			renderer.resize(window.innerWidth, window.innerHeight);
			rotateVertical();
		}
		else {
			//horizontal
			renderer.resize(window.innerWidth, window.innerHeight);
			redraw(stage);

			if(window.pageYOffset > 0) {
		 		renderer.view.style.top = window.pageYOffset + "px";
			}
		}
	}
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













