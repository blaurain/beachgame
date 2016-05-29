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
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 6; col++) { 
			var toFall = [];
			switch(GAME.Grid.gravDirection) {
				case GAME.Grid.Direction.Down:
					if(col < 5 && GAME.Grid.currentGrid[row][col + 1].isAlive === false) {
						toFall.push({"tile":tiles[GAME.Grid.currentGrid[row][col].row][GAME.Grid.currentGrid[row][col].col], "row":row, "col":(col + 1)})
					}
				break;
				case Grid.Direction.Left:

				break;
				case Grid.Direction.Right:

				break;
			}
			if(toFall.length !== 0) { //delay to avoid conflict with currentGrid
				for(var t = 0; t < toFall.length; t++) {
					GAME.Grid.setFall(toFall[t].tile, toFall[t].row, toFall[t].col);
				}
			}
		}
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
GAME.Grid.drawGrid = function(stage) {
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
			tileGraphics[row][col].interactive = true;
			tileGraphics[row][col].on('mousedown', onTilePressDown.bind({"row": row, "col": col}));
			tileGraphics[row][col].on('touchstart', onTilePressDown.bind({"row": row, "col": col}));
			tileGraphics[row][col].on('tap', onTileTap.bind({"row": row, "col": col}));
			tileGraphics[row][col].on('click', onTileTap.bind({"row": row, "col": col}));
			if(tiles[row][col].tileType !== 0) {
				tiles[row][col].matchGraphic = new PIXI.Graphics();
				stage.addChild(tiles[row][col].matchGraphic);
			}
		};
	};
}
GAME.Grid.drawTiles = function(stage) {
	tileHeight = pixelFromPercentHeight(22) - 2;
	tileWidth = pixelFromPercentWidth(12) - 2;
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 6; col++) {
			tileGraphics[row][col].clear();
			tileGraphics[row][col].lineStyle(0, tiles[row][col].tileColor, selectedAlpha);
			if(tiles[row][col].isSelected) tileGraphics[row][col].beginFill(tiles[row][col].tileColor, selectedAlpha);
			else tileGraphics[row][col].beginFill(tiles[row][col].tileColor, unselectedAlpha);
			tiles[row][col].xPosition = (pixelFromPercentWidth(GAME.Tile.percentFromCol(tiles[row][col].col)) - gridShifterW);
			tiles[row][col].yPosition = (pixelFromPercentHeight(GAME.Tile.percentFromRow(tiles[row][col].row)) + 1);
			tileGraphics[row][col].drawRect(tiles[row][col].xPosition, tiles[row][col].yPosition, tileWidth, tileHeight);
			tileGraphics[row][col].endFill();
			if(tiles[row][col].tileType !== 0) {
				var halfTile = (Math.min(tileWidth, tileHeight) / 2.0);
				var halfWidth = (tileWidth / 2.0);
				var halfHeight = (tileHeight / 2.0);
				var quarterTile = (halfTile / 2.0);
				tiles[row][col].matchGraphic.clear();
				tiles[row][col].matchGraphic.lineStyle(getMatchIconWidth(halfTile), 0x000000, 1); //width, color, alpha

				switch(tiles[row][col].tileType) {
					case 1: //Circle
						tiles[row][col].matchGraphic.drawCircle(tiles[row][col].xPosition + halfWidth, tiles[row][col].yPosition + halfHeight, quarterTile);
					break;
					case 2: //Rectangle
						tiles[row][col].matchGraphic.drawRect(tiles[row][col].xPosition + (halfWidth - quarterTile), tiles[row][col].yPosition + (halfHeight - quarterTile), halfTile, halfTile);
					break;
					case 3: //Triangle
						if(isVertical){
							tiles[row][col].matchGraphic.moveTo(tiles[row][col].xPosition + (halfWidth/2.0), tiles[row][col].yPosition + halfHeight);
							tiles[row][col].matchGraphic.lineTo(tiles[row][col].xPosition + halfWidth + (halfWidth/2.0), tiles[row][col].yPosition + halfHeight + (halfHeight/2.0));
							tiles[row][col].matchGraphic.lineTo(tiles[row][col].xPosition + halfWidth + (halfWidth/2.0), tiles[row][col].yPosition + (halfHeight/2.0));
							tiles[row][col].matchGraphic.lineTo(tiles[row][col].xPosition + (halfWidth/2.0), tiles[row][col].yPosition + halfHeight);
						} else {
							tiles[row][col].matchGraphic.moveTo(tiles[row][col].xPosition + (halfWidth/2.0), tiles[row][col].yPosition + halfHeight + (halfHeight/2.0));
							tiles[row][col].matchGraphic.lineTo(tiles[row][col].xPosition + halfWidth + (halfWidth/2.0), tiles[row][col].yPosition + halfHeight + (halfHeight/2.0));
							tiles[row][col].matchGraphic.lineTo(tiles[row][col].xPosition + halfWidth, tiles[row][col].yPosition + (halfHeight/2.0));
							tiles[row][col].matchGraphic.lineTo(tiles[row][col].xPosition + (halfWidth/2.0), tiles[row][col].yPosition + halfHeight + (halfHeight/2.0));
						}
					break;
				}
			}
		};
	};
}