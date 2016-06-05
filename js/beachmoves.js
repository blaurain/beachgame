
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
var isMobile = false;
var gridGraphics = new PIXI.Graphics();
var tiles = [[]];


init();
resize();
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", orientationchange);

//END SETUP**************************

function init() {
	for (var row = 0; row < 4; row++) {
		tiles[row] = [];
		GAME.Grid.currentTiles[row] = [];
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

function removePathTiles() {
	for (var i = 0; i < match.path.length; i++) {
		match.path[i].isAlive = false;
		GAME.Grid.currentTiles[match.path[i].row][match.path[i].col] = null;
		match.path[i].tileGraphic.visible = false;
		if(match.path[i].isMatchTile) {
			match.path[i].overGraphic.clear();
		} 
	};
	clearMatch();
	GAME.Grid.checkGrav();
	renderer.render(stage);

	//TEMP for testing TODO: remove
	// resize();
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

function selectTile(tile) {
	if(tile.tileType === 4) return; //static tile
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
		}
	} else if(!isTouchingPath(tile)) { //not selectable and away from path, select new
		clearMatch();
	} else if(tile === match.start) { //hit start tile again
		clearMatch();
	}//else do nothing its next to the path but not selectable
} 

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
	if(this.tile.isAlive) {
		selectTile(this.tile);
	}
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
	if(window.orientation === undefined) { //desktop only
		var oldGrav = GAME.Grid.gravDirection;
		if(window.innerWidth < window.innerHeight)
		{ //vert 
			GAME.Grid.gravDirection = GAME.Grid.Direction.Down;
		} else {
			GAME.Grid.gravDirection = GAME.Grid.Direction.Left;
		}
		if(oldGrav !== GAME.Grid.gravDirection) {
			GAME.Grid.stopFalling();
			GAME.Grid.checkGrav();
		}
	}
	if(window.innerWidth > GAME_WIDTH && window.innerHeight > GAME_HEIGHT)
	{ //Larger than needs be, desktop mode
		// redraw(stage);
		isMobile = false;
		renderer.resize(GAME_WIDTH, GAME_HEIGHT);
		renderer.view.style.position = "relative";

		var centerX = Math.ceil((window.innerWidth / 2.0) - (GAME_WIDTH / 2.0));
		var centerY = Math.ceil((window.innerHeight / 2.0) - (GAME_HEIGHT / 2.0));

		renderer.view.style.top = centerY + "px";
		renderer.view.style.left = centerX + "px";
		redraw(stage); //TODO: if vert on desktop probably need to resize like mobile
	}
	else
	{  //mobile/small
		isMobile = true;
		window.scrollBy(0,0);
		renderer.view.style.position = "absolute";
		renderer.view.style.top = "0px";
		renderer.view.style.left = "0px";

		if(window.innerWidth < window.innerHeight)
		{ //vert
			isVertical = true;
			// GAME.Grid.gravDirection = GAME.Grid.Direction.Down;
			GAME.Grid.beginDraw();
			redraw(stage);
			GAME.Grid.endDraw();
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

function orientationchange(event) {  //Mobile only
	if(window.orientation === undefined) return;
	switch(window.orientation) {
		case 0:
			GAME.Grid.gravDirection = GAME.Grid.Direction.Down;
		break;
		case -90:
			GAME.Grid.gravDirection = GAME.Grid.Direction.Right;
		break;
		case 90:
		default:
			GAME.Grid.gravDirection = GAME.Grid.Direction.Left;
		break;
	}
	GAME.Grid.stopFalling();
	// resize();
	GAME.Grid.checkGrav();
}














