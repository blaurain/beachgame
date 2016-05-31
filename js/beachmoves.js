
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
var match = {
	start: null,
	end: null,
	type: null,
	path: []
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
var gridGraphics = new PIXI.Graphics();
var tiles = [[]];


init();
resize();
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
window.addEventListener("resize", resize);
//END SETUP**************************

function init() {
	for (var row = 0; row < 4; row++) {
		tiles[row] = [];
		GAME.Grid.currentGrid[row] = [];
	};
	GAME.Grid.createTiles(stage);
	stage.addChild(gridGraphics);
	setInterval(update, 100);
}

function update() {
	if(GAME.Grid.somethingFalling) {
		GAME.Grid.applyGravity();
	}
}

function redraw(stage) {
	GAME.Grid.drawTiles();
	GAME.Grid.drawGrid();
}

function pixelFromPercentWidth(percent) {
	return Math.ceil(renderer.width * (percent/100));
}
function pixelFromPercentHeight(percent) {
	return Math.ceil(renderer.height * (percent/100));
}

function getGridWidth() {
	var baseWidth = 5;
	if(renderer.width < 500) return baseWidth;
	else if(renderer.width < 700) return baseWidth + 1;
	else if(renderer.width < 900) return baseWidth + 2;
	else if(renderer.width < 1100) return baseWidth + 3;
	else if(renderer.width < 1300) return baseWidth + 4;
	else return baseWidth + 5;
}

function getMatchIconWidth(halfTile) {
	var baseWidth = 3;
	if(halfTile < 10) return baseWidth;
	else if(halfTile < 20) return baseWidth + 0.5;
	else if(halfTile < 30) return baseWidth + 1.0;
	else if(halfTile < 40) return baseWidth + 1.5;
	else if(halfTile < 50) return baseWidth + 2.0;
	else return baseWidth + 2.5;
}

function selectTile(tile) {
	if(tile.isMatchTile && !tile.isSelected && match.start === null) { //start match
		match.start = tile;
		match.end = match.start;
		match.type = match.start.tileType;
		match.path.push(tile);
		setTileSelected(tile, true);
	} else if((!tile.isMatchTile || (tile.isMatchTile && tile.tileType === match.type)) 
		&& !tile.isSelected && match.start !== null && isMatchRun(tile)) { //continue match run
		match.path.push(tile);
		match.end = tile;
		setTileSelected(tile, true);
		if(tile.isMatchTile && tile.tileType === match.type) { //match complete
			removePathTiles();
			clearMatch();
		}
	} else if(!isTouchingPath(tile)) { //not selectable and away from path, select new
		clearMatch();
	} else if(tile === match.start) { //hit start tile again
		clearMatch();
	}//else do nothing its next to the path but not selectable
} //TODO: not selecting match tile until it clears on another tile after a successfull match, idk why

function setTileSelected(tile, isSelected) {
	tile.isSelected = isSelected;
	tile.tileGraphic.clear();
	if(isSelected) tile.tileGraphic.beginFill(tile.tileColor, selectedAlpha);
	else tile.tileGraphic.beginFill(tile.tileColor, unselectedAlpha);
	tile.tileGraphic.drawRect(tile.xPosition, tile.yPosition, tileWidth, tileHeight);
	tile.tileGraphic.endFill();
	renderer.render(stage);
}

function onTilePressDown(data) {
	var tileRow = this.row;
	var tileCol = this.col;
// TODO: make selection smoother later, just tap for now
	// selectTile(row, col, true);
}

function onTileTap(data) {
	//tap can be remove too
	var tileRow = this.row;
	var tileCol = this.col;
	if(GAME.Grid.currentGrid[tileRow][tileCol].isAlive) {
		selectTile(tiles[GAME.Grid.currentGrid[tileRow][tileCol].row][GAME.Grid.currentGrid[tileRow][tileCol].col]);
	}
	// selectTile(tileRow, tileCol);
}

function isMatchRun(tile) {
	if(match.end === null) return false;
	if(!touching(tile, match.end)) return false;

	return !isTouchingPath(tile);
}

function isTouchingPath(tile) {
	for (var i = 0; i < match.path.length; i++) {
		if(match.path[i] === match.end) continue;
		if(touching(tile, match.path[i])) return true; //touching one in the run
	};
	return false;
}

function touching(tile1, tile2) {
	if(((tile1.row === (tile2.row - 1)) || (tile1.row === (tile2.row + 1))) && tile1.col === tile2.col) {
		return true;
	} else if (((tile1.col === (tile2.col - 1)) || (tile1.col === (tile2.col + 1))) && tile1.row === tile2.row) {
		return true;
	}
	return false;
}

function removePathTiles() {
	for (var i = 0; i < match.path.length; i++) {
		match.path[i].isAlive = false;
		GAME.Grid.currentGrid[match.path[i].row][match.path[i].col].isAlive = false;
		GAME.Grid.currentGrid[match.path[i].row][match.path[i].col].row = -1;
		GAME.Grid.currentGrid[match.path[i].row][match.path[i].col].col = -1;
		match.path[i].tileGraphic.alpha = 0;
		if(match.path[i].isMatchTile) match.path[i].matchGraphic.alpha = 0;
	};
	GAME.Grid.checkGrav();
	renderer.render(stage);
}

function clearMatch() {
	for (var i = 0; i < match.path.length; i++) {
		setTileSelected(match.path[i], false);
	};
	match.start = null;
	match.end = null;
	match.path = [];
	match.type = null;
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

function resize() {
	rotateHorizontal();
	isVertical = false;
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














