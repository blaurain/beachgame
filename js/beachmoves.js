
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
var DESKTOP_WIDTH = 1136; //16:9 aspect ratio
var DESKTOP_HEIGHT = 640;
var renderer = PIXI.autoDetectRenderer(DESKTOP_WIDTH, DESKTOP_HEIGHT, rendererOptions); 
var selectedAlpha = 1.0;
var unselectedAlpha = .7;
var tileHeight, tileWidth;
var gridShifterW = 0, gridShifterH = 0;
var isVertical = false;
var isMobile = false;
var isTilting = false;
var gravSet = false;
var gridGraphics;
var currentGrid;
var tiles = [[]];
var w, h;

init();
resize();
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
window.addEventListener("orientationchange", orientationchange);
window.addEventListener("resize", resize);
window.addEventListener('keydown', onKeyDown);

//END SETUP**************************

function init() {
	for (var row = 0; row < 4; row++) {
		tiles[row] = [];
		GAME.Grid.currentTiles[row] = [];
	};
	setCurrentGrid(0); //TODO: load from saved local shit
	GAME.Grid.gravDirection = GAME.Grid.Direction.Left;
	GAME.Grid.createTiles();
	GAME.Grid.createGrid();
	GAME.Title.init();
	stage.mousedown = inputStart;
	stage.mousemove = inputMove;
	stage.touchmove = inputMove;
	setInterval(update, 20);
}

function resetGame() {
	GAME.Grid.clearTiles();
	GAME.Grid.createTiles();
	GAME.Grid.clearGrid();
	GAME.Grid.createGrid();
	resize();
}

function update() {
	if(GAME.Grid.somethingFalling && !isTilting) {
		GAME.Grid.applyGravity();
	}
}

function redraw(stage) {
	GAME.Grid.drawTiles();
	GAME.Grid.drawGrid();
	GAME.Title.draw();
	GAME.Menu.draw();
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

function loadGrid() {

}

function saveGrid(gridNum) {

}

function setCurrentGrid(gridNum) {
	GAME.TileMap.currentGridIndex = gridNum;
	switch(gridNum) {
		case 0:
			currentGrid = GAME.TileMap.grid0;
			break;
		case 1:
			currentGrid = GAME.TileMap.grid1;
			break;
		case 2:
			currentGrid = GAME.TileMap.grid2;
			break;
	}
}

function nextGrid() {
	GAME.TileMap.currentGridIndex++;
	if(GAME.TileMap.currentGridIndex >= GAME.TileMap.numberOfGrids) setCurrentGrid(0);
	else setCurrentGrid(GAME.TileMap.currentGridIndex);
	resetGame();
}

function removePathTiles() {
	for (var i = 0; i < match.path.length; i++) {
		match.path[i].isAlive = false;
		GAME.Grid.currentTiles[match.path[i].row][match.path[i].col] = null;
		match.path[i].tileGraphic.visible = false;
		if(match.path[i].hasOver) {
			match.path[i].overGraphic.clear();
		} 
	};
	clearMatch();
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

function selectTile(tile) {
	if(tile.tileType === 4 || tile.isSelected) return; //static tile
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

function inputStart(data) {
	if(GAME.Menu.inMenu) return;
	if(this.isAlive && !this.isSelected) {
		selectTile(this);
	}
}

function inputMoveToTile(tile) {
	if(GAME.Menu.inMenu) return;
	if(this.isAlive && !this.isSelected) {
		selectTile(this);
	}
}

function inputMove(event) {
	if(GAME.Menu.inMenu) return;
	var hitPos = event.data.getLocalPosition(gridGraphics);
	var hitPosParent = event.data.getLocalPosition(gridGraphics.parent); 

	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 7; col++) {
			var x = tiles[row][col].xPosition;
			var y = tiles[row][col].yPosition;
			var x2 = x + tileWidth;
			var y2 = y + tileHeight; //TODO: might need to change if vert
			if(hitPos.x > x && hitPos.x < x2 && hitPos.y > y && hitPos.y < y2) {
				if(tiles[row][col].isAlive && !tiles[row][col].isSelected) {
					selectTile(tiles[row][col]);
					return;
				}
			}
			if(isVertical) {

			} else {

			}
		}
	}
	// console.log("INPUT MOVE: pageX--" + event.data.originalEvent.pageX + " pageY--" + event.data.originalEvent.pageY );
}

function onTilePressDown(data) {
	if(GAME.Menu.inMenu) return;
	var tileRow = this.row;
	var tileCol = this.col;
// TODO: make selection smoother later, just tap for now
	// selectTile(row, col, true);
}

function onTileTap(data) {
	if(GAME.Menu.inMenu) return;
	//tap can be remove too
	var tileRow = this.row;
	var tileCol = this.col;
	if(this.tile.isAlive && !this.tile.isSelected) {
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

function onKeyDown(key) {
	// Left arrow is 37
 	if (key.keyCode === 37) {
        desktopShift(false);
    }
    // Right arrow is 39
    if (key.keyCode === 39) {
        desktopShift(true);
    }
}

function showMenu() {
	if(GAME.Menu.inMenu) {
		GAME.Menu.hide();
	} else {
		GAME.Menu.show();
	}
}

function desktopShift(shiftRight) {
	if(shiftRight && GAME.Grid.gravDirection !== GAME.Grid.Direction.Right) {
		if(GAME.Grid.gravDirection === GAME.Grid.Direction.Left) GAME.Grid.gravDirection = GAME.Grid.Direction.Down;
		else if(GAME.Grid.gravDirection === GAME.Grid.Direction.Down) GAME.Grid.gravDirection = GAME.Grid.Direction.Right;
	} else if(!shiftRight && GAME.Grid.gravDirection !== GAME.Grid.Direction.Left){
		if(GAME.Grid.gravDirection === GAME.Grid.Direction.Right) GAME.Grid.gravDirection = GAME.Grid.Direction.Down;
		else if(GAME.Grid.gravDirection === GAME.Grid.Direction.Down) GAME.Grid.gravDirection = GAME.Grid.Direction.Left;
	} else {
		return; //can't shift with keys
	}

	GAME.Grid.stopFalling();
	resize();
	GAME.Grid.checkGrav();
}

function rotateHorizontal() {
	stage.rotation = 0;
	stage.x = 0;
}

function rotateVertical() {
	stage.rotation = Math.PI/2.0;
	stage.x = renderer.width;
	stage.y = 0;
}

function resize() {
	rotateHorizontal();
	if(!gravSet) {
		setGravity();
		gravSet = true;
	}

	if(window.orientation === undefined) { //desktop only
		resizeDesktop();
	} else {  //mobile/small
		if(!resizeMobile()) return; //returns false on bail
	}
 	isTilting = false;
 	renderer.render(stage);
}

function resizeDesktop() {
	var bufferX, bufferY;
	isMobile = false;		
	window.scrollBy(0,0);

	//is it restricted by height, width or nothing
	if(window.innerHeight < DESKTOP_WIDTH) { //keep at 16:9 aspect ratio
		//restricted by height
		w = window.innerHeight;
		h = (9.0/16.0) * window.innerHeight;
	} else if(window.innerWidth < DESKTOP_WIDTH && ((DESKTOP_HEIGHT - window.innerHeight) < (DESKTOP_WIDTH - window.innerWidth))) {
		//restricted by width
		w = window.innerWidth;
		h = (9.0/16.0) * window.innerWidth;
	} else {
		//restricted by nothing
		w = DESKTOP_WIDTH;
		h = DESKTOP_HEIGHT;
	}
			
	renderer.resize(w, h);

	if(GAME.Grid.gravDirection === GAME.Grid.Direction.Down) {
		isVertical = true;
		gridShifterW = 0;
		GAME.Grid.beginDraw();
		redraw(stage);
		GAME.Grid.endDraw();
		rotateVertical();
		bufferX = (window.innerWidth)/2.0 - renderer.width/2.0;
		bufferY = (window.innerHeight)/2.0 - renderer.height/2.0;
	} else {
		isVertical = false;
		if(GAME.Grid.gravDirection === GAME.Grid.Direction.Right) gridShifterW = pixelFromPercentWidth(10);
		else gridShifterW = 0;
		rotateHorizontal();
		redraw(stage);
		bufferX = (window.innerWidth - w)/2.0;
		bufferY = (window.innerHeight - h)/2.0;
	}
	renderer.view.style.position = "absolute";
	renderer.view.style.top = bufferY + "px";
	renderer.view.style.left = bufferX + "px";
}

function resizeMobile() {
	isMobile = true;
	window.scrollBy(0,0);
	renderer.view.style.position = "absolute";
	renderer.view.style.top = "0px";
	renderer.view.style.left = "0px";
	w = window.innerWidth;
	h = window.innerHeight;
	renderer.resize(w, h);

	if(window.innerWidth < window.innerHeight) { //vert
		if(window.orientation !== undefined && GAME.Grid.gravDirection !== GAME.Grid.Direction.Down && window.orientation === 0) {
			isTilting = true;
			GAME.Grid.stopFalling();
			renderer.render(stage);
			return false;
		} //prevent double refresh
		isVertical = true;
		gridShifterW = 0;
		GAME.Grid.gravDirection = GAME.Grid.Direction.Down;
		GAME.Grid.beginDraw();
		redraw(stage);
		GAME.Grid.endDraw();
		rotateVertical();
	} else {
		//horizontal
		if(window.orientation !== undefined && (
		(GAME.Grid.gravDirection === GAME.Grid.Direction.Down) ||
		(GAME.Grid.gravDirection === GAME.Grid.Direction.Right && window.orientation === 90) || 
		(GAME.Grid.gravDirection === GAME.Grid.Direction.Left && window.orientation === -90))) { //prevent double refresh 
			isTilting = true;
			GAME.Grid.stopFalling();
			renderer.render(stage);
			return false;
		}
		isVertical = false; 
		if(GAME.Grid.gravDirection === GAME.Grid.Direction.Right) gridShifterW = pixelFromPercentWidth(10);
		else gridShifterW = 0;
		redraw(stage);
		if(window.pageYOffset > 0) {
	 		renderer.view.style.top = window.pageYOffset + "px";
		}
	}
	return true;
}

function orientationchange(event) {  //Mobile only
	if(window.orientation === undefined) return;
	var oldDirection = GAME.Grid.gravDirection;
	setGravity();
	GAME.Grid.stopFalling();
	if((oldDirection === GAME.Grid.Direction.Left && GAME.Grid.gravDirection === GAME.Grid.Direction.Right) ||
		(oldDirection === GAME.Grid.Direction.Right && GAME.Grid.gravDirection === GAME.Grid.Direction.Left)) {	
		resize();
	}
	GAME.Grid.checkGrav();
} 
function setGravity() {
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
}











