var GAME = GAME || {};

GAME.Grid = function() {}
GAME.Grid.constructor = GAME.Grid;

GAME.Grid.Direction = {
	Down: 0,
	Left: 1,
	Right: 2
}
GAME.Grid.currentGrid = [[]];
GAME.Grid.gravDirection = GAME.Grid.Direction.Down;
GAME.Grid.somethingFalling = false;
GAME.Grid.checkGrav = function() {
	var toFall = [];
	switch(GAME.Grid.gravDirection) {
		case GAME.Grid.Direction.Down:
			for (var row = 0; row < 4; row++) {
				for (var col = 5; col >= 0; col--) { 
					if(col < 5 && GAME.Grid.currentGrid[row][col].isAlive === true && 
					   GAME.Grid.currentGrid[row][col + 1].isAlive === false) {
						var dropCol = col + 1;
						while(dropCol < 5 && GAME.Grid.currentGrid[row][dropCol + 1].isAlive === false) { dropCol++; }
						GAME.Grid.setFall(tiles[GAME.Grid.currentGrid[row][col].row][GAME.Grid.currentGrid[row][col].col], row, dropCol);
					}
				}
			}
		break;
		case GAME.Grid.Direction.Left:
		case GAME.Grid.Direction.Right:
			for (var col = 5; col >= 0; col--) { 
				for (var row = 3; row >= 0; row--) {
					if(row < 3 && GAME.Grid.currentGrid[row][col].isAlive === true && 
					   GAME.Grid.currentGrid[row + 1][col].isAlive === false) {
						var dropRow = row + 1;
						while(dropRow < 3 && GAME.Grid.currentGrid[dropRow + 1][col].isAlive === false) { dropRow++; }
						GAME.Grid.setFall(tiles[GAME.Grid.currentGrid[row][col].row][GAME.Grid.currentGrid[row][col].col], dropRow, col);
					}
				}
			}
		break;
	}
}
GAME.Grid.setFall = function(tile, fallRow, fallCol) {
	GAME.Grid.somethingFalling = true;
	GAME.Grid.currentGrid[tile.row][tile.col].isAlive = false;
	GAME.Grid.currentGrid[tile.row][tile.col].row = -1;
	GAME.Grid.currentGrid[tile.row][tile.col].col = -1;
	GAME.Grid.currentGrid[fallRow][fallCol].isAlive = true;
	GAME.Grid.currentGrid[fallRow][fallCol].row = tile.row;
	GAME.Grid.currentGrid[fallRow][fallCol].col = tile.col;
	tile.isFalling = true;
	tile.row = fallRow;
	tile.col = fallCol;
}
GAME.Grid.applyGravity = function() {
	var i = 0; //TODO;
}
GAME.Grid.drawGrid = function() {
	// gridGraphics.clearBeforeRender = true;
	gridGraphics.clear();
	gridGraphics.lineStyle(getGridWidth(), 0xFF823A, 1); //width, color, alpha

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
GAME.Grid.createTiles = function(stage) {
	tileHeight = pixelFromPercentHeight(22) - 2;
	tileWidth = pixelFromPercentWidth(12) - 2;

	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 6; col++) {
			GAME.Grid.currentGrid[row][col] = {"row": row, "col": col, "isAlive": true};
			tiles[row][col] = new GAME.Tile(row, col, GAME.TileMap.grid1[row][col]); //TODO: Change this to load different grids
			tiles[row][col].tileColor = GAME.Tile.getRandomTileColor();
			tiles[row][col].xPosition = (pixelFromPercentWidth(GAME.Tile.percentFromCol(tiles[row][col].col)) - gridShifterW);
			tiles[row][col].yPosition = (pixelFromPercentHeight(GAME.Tile.percentFromRow(tiles[row][col].row)) + 1);
			tiles[row][col].isSelected = false;
			tiles[row][col].tileGraphic = new PIXI.Graphics();
			tiles[row][col].tileGraphic.interactive = true;
			tiles[row][col].tileGraphic.on('mousedown', onTilePressDown.bind({"row": row, "col": col, "tile":tiles[row][col]}));
			tiles[row][col].tileGraphic.on('touchstart', onTilePressDown.bind({"row": row, "col": col, "tile":tiles[row][col]}));
			tiles[row][col].tileGraphic.on('tap', onTileTap.bind({"row": row, "col": col, "tile":tiles[row][col]}));
			tiles[row][col].tileGraphic.on('click', onTileTap.bind({"row": row, "col": col, "tile":tiles[row][col]}));
			stage.addChild(tiles[row][col].tileGraphic);
			if(tiles[row][col].tileType !== 0) {
				tiles[row][col].matchGraphic = new PIXI.Graphics();
				stage.addChild(tiles[row][col].matchGraphic);
			}
		};
	};
}
GAME.Grid.drawTiles = function() {
	tileHeight = pixelFromPercentHeight(22) - 2;
	tileWidth = pixelFromPercentWidth(12) - 2;
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 6; col++) {
			if(tiles[row][col].isAlive) GAME.Grid.drawTile(row,col);
		};
	};
}
GAME.Grid.drawTile = function(row, col) { 
	var tile = tiles[row][col];
	var tileGraphic = tile.tileGraphic;
	tileGraphic.clear();
	if(!tile.isAlive) return; //dont draw anything if not alive
	tileGraphic.lineStyle(0, tile.tileColor, selectedAlpha);
	if(tile.isSelected) tileGraphic.beginFill(tile.tileColor, selectedAlpha);
	else tileGraphic.beginFill(tile.tileColor, unselectedAlpha);
	tile.xPosition = (pixelFromPercentWidth(GAME.Tile.percentFromCol(tile.col)) - gridShifterW);
	tile.yPosition = (pixelFromPercentHeight(GAME.Tile.percentFromRow(tile.row)) + 1);
	tileGraphic.drawRect(tile.xPosition, tile.yPosition, tileWidth, tileHeight);
	tileGraphic.endFill();
	if(tile.tileType !== 0) {
		var halfTile = (Math.min(tileWidth, tileHeight) / 2.0);
		var halfWidth = (tileWidth / 2.0);
		var halfHeight = (tileHeight / 2.0);
		var quarterTile = (halfTile / 2.0);
		tile.matchGraphic.clear();
		tile.matchGraphic.lineStyle(getMatchIconWidth(halfTile), 0x000000, 1); //width, color, alpha

		switch(tile.tileType) {
			case 1: //Circle
				tile.matchGraphic.drawCircle(tile.xPosition + halfWidth, tile.yPosition + halfHeight, quarterTile);
			break;
			case 2: //Rectangle
				tile.matchGraphic.drawRect(tile.xPosition + (halfWidth - quarterTile), tile.yPosition + (halfHeight - quarterTile), halfTile, halfTile);
			break;
			case 3: //Triangle
				if(isVertical){
					tile.matchGraphic.moveTo(tile.xPosition + (halfWidth/2.0), tile.yPosition + halfHeight);
					tile.matchGraphic.lineTo(tile.xPosition + halfWidth + (halfWidth/2.0), tile.yPosition + halfHeight + (halfHeight/2.0));
					tile.matchGraphic.lineTo(tile.xPosition + halfWidth + (halfWidth/2.0), tile.yPosition + (halfHeight/2.0));
					tile.matchGraphic.lineTo(tile.xPosition + (halfWidth/2.0), tile.yPosition + halfHeight);
				} else {
					tile.matchGraphic.moveTo(tile.xPosition + (halfWidth/2.0), tile.yPosition + halfHeight + (halfHeight/2.0));
					tile.matchGraphic.lineTo(tile.xPosition + halfWidth + (halfWidth/2.0), tile.yPosition + halfHeight + (halfHeight/2.0));
					tile.matchGraphic.lineTo(tile.xPosition + halfWidth, tile.yPosition + (halfHeight/2.0));
					tile.matchGraphic.lineTo(tile.xPosition + (halfWidth/2.0), tile.yPosition + halfHeight + (halfHeight/2.0));
				}
			break;
		}
	}
}

