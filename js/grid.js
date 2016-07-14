var GAME = GAME || {};

GAME.Grid = function() {}
GAME.Grid.constructor = GAME.Grid;

GAME.Grid.Direction = {
	Down: 0,
	Left: 1,
	Right: 2
}
GAME.Grid.currentTiles = [[]];
GAME.Grid.gravDirection = GAME.Grid.Direction.Down;
GAME.Grid.gravity = .2;
GAME.Grid.somethingFalling = false;
GAME.Grid.reverseTileX = 100;
GAME.Grid.reverseTileY = 78;
GAME.Grid.gridColor = 0x428bca;
GAME.Grid.checkGrav = function() {
	var toFall = [];
	switch(GAME.Grid.gravDirection) {
		case GAME.Grid.Direction.Down:
			for (var row = 0; row < 4; row++) {
				for (var col = 6; col >= 0; col--) { 
					if(col < 6 && GAME.Grid.currentTiles[row][col] !== null && 
						GAME.Grid.currentTiles[row][col].tileType !== 4 && GAME.Grid.currentTiles[row][col].isAlive && 
						(GAME.Grid.currentTiles[row][col + 1] === null || !GAME.Grid.currentTiles[row][col + 1].isAlive)) {
						var dropCol = col + 1;
						while(dropCol < 6 && (GAME.Grid.currentTiles[row][dropCol + 1] === null || 
							GAME.Grid.currentTiles[row][dropCol + 1].isAlive === false)) { dropCol++; }
						GAME.Grid.setFall(GAME.Grid.currentTiles[row][col], row, dropCol);
					}
				}
			}
		break;
		case GAME.Grid.Direction.Left: 
			for (var col = 6; col >= 0; col--) { 
				for (var row = 3; row >= 0; row--) {
					if(row < 3 && GAME.Grid.currentTiles[row][col] !== null && 
						GAME.Grid.currentTiles[row][col].tileType !== 4  && GAME.Grid.currentTiles[row][col].isAlive &&
					 	(GAME.Grid.currentTiles[row + 1][col] === null || !GAME.Grid.currentTiles[row + 1][col].isAlive)) {
						var dropRow = row + 1;
						while(dropRow < 3 && (GAME.Grid.currentTiles[dropRow + 1][col] === null || 
							GAME.Grid.currentTiles[dropRow + 1][col].isAlive === false)) { dropRow++; }
						GAME.Grid.setFall(GAME.Grid.currentTiles[row][col], dropRow, col);
					}
				}
			}
		break;
		case GAME.Grid.Direction.Right:
		for (var col = 6; col >= 0; col--) { 
				for (var row = 0; row < 4; row++) {
					if(row > 0 && GAME.Grid.currentTiles[row][col] !== null && 
						GAME.Grid.currentTiles[row][col].tileType !== 4  && GAME.Grid.currentTiles[row][col].isAlive &&
					 	(GAME.Grid.currentTiles[row - 1][col] === null || !GAME.Grid.currentTiles[row - 1][col].isAlive)) {
						var dropRow = row - 1;
						while(dropRow > 0 && (GAME.Grid.currentTiles[dropRow - 1][col] === null || 
							GAME.Grid.currentTiles[dropRow - 1][col].isAlive === false)) { dropRow--; }
						GAME.Grid.setFall(GAME.Grid.currentTiles[row][col], dropRow, col);
					}
				}
			}
		break;
	}
}
GAME.Grid.setFall = function(tile, fallRow, fallCol) {
	GAME.Grid.somethingFalling = true; 
	GAME.Grid.currentTiles[fallRow][fallCol] = tile;
	GAME.Grid.currentTiles[tile.row][tile.col] = null;
	tile.isFalling = true;
	tile.row = fallRow;
	tile.col = fallCol;
	clearMatch();
}
GAME.Grid.applyGravity = function() {
	GAME.Grid.beginDraw();
	var falling = false;
	for (var col = 6; col >= 0; col--) { 
		for (var row = 3; row >= 0; row--) {
			if(tiles[row][col].isFalling) {
				falling = true;
				GAME.Grid.drawTile(row, col);
				tiles[row][col].velocity = Math.min(tiles[row][col].velocity + GAME.Grid.gravity, 50);
			}
		}
	}
	if(!falling) { //nothing falling anymore
		GAME.Grid.stopFalling();
	}
	GAME.Grid.endDraw();
 	renderer.render(stage);
}
GAME.Grid.moveTileToward = function(point1, point2, velocity) {
	if(Math.abs(point1 - point2) <= velocity) { //close enough
		return point2;
	} else if(point1 < point2) {
		return point1 + velocity;
	} else { //point1 > point2
		return point1 - velocity;
	}
}
GAME.Grid.stopFalling = function() { 
	GAME.Grid.somethingFalling = false;
	for (var col = 6; col >= 0; col--) { 
		for (var row = 3; row >= 0; row--) {
			tiles[row][col].isFalling = false;
		}
	}
}
GAME.Grid.createGrid = function() {
	gridGraphics = new PIXI.Graphics();
	stage.addChild(gridGraphics);
}
GAME.Grid.clearGrid = function() {
	gridGraphics.clear();
	stage.removeChild(gridGraphics);
}
GAME.Grid.drawGrid = function() {
	// gridGraphics.clearBeforeRender = true;
	gridGraphics.clear();
	gridGraphics.lineStyle(getGridWidth(), GAME.Grid.gridColor, 1); //width, color, alpha
	//outside
	// var xGrid = 0;
	// if(GAME.Grid.gravDirection === GAME.Grid.Direction.Right) xGrid = 2;
	gridGraphics.drawRect(pixelFromPercentWidth(14) - gridShifterW, pixelFromPercentHeight(6),
		pixelFromPercentWidth(84), pixelFromPercentHeight(88));
	//vertical
	gridGraphics.moveTo(pixelFromPercentWidth(26) - gridShifterW, pixelFromPercentHeight(6));
	gridGraphics.lineTo(pixelFromPercentWidth(26) - gridShifterW, pixelFromPercentHeight(94));
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
	gridGraphics.moveTo(pixelFromPercentWidth(14) - gridShifterW, pixelFromPercentHeight(72));
	gridGraphics.lineTo(pixelFromPercentWidth(98) - gridShifterW, pixelFromPercentHeight(72));
	gridGraphics.moveTo(pixelFromPercentWidth(14) - gridShifterW, pixelFromPercentHeight(50));
	gridGraphics.lineTo(pixelFromPercentWidth(98) - gridShifterW, pixelFromPercentHeight(50));
	gridGraphics.moveTo(pixelFromPercentWidth(14) - gridShifterW, pixelFromPercentHeight(28));
	gridGraphics.lineTo(pixelFromPercentWidth(98) - gridShifterW, pixelFromPercentHeight(28));
	//return
	gridGraphics.moveTo(pixelFromPercentWidth(26) - gridShifterW, pixelFromPercentHeight(6));
	gridGraphics.interactive = true;
	gridGraphics.on('touchstart', inputMove.bind());
	gridGraphics.on('touchmove', inputMove.bind());
}
GAME.Grid.clearTiles = function() {
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 7; col++) {
			tiles[row][col].tileGraphic.clear();
			stage.removeChild(tiles[row][col].tileGraphic);
			if(tiles[row][col].tileType !== 0) {
				tiles[row][col].overGraphic.clear();
				stage.removeChild(tiles[row][col].overGraphic);
			}
			tiles[row][col] = null;
		}
	}
	for (var row = 0; row < 4; row++) { //seperate to avoid cross reference conflict
		for (var col = 0; col < 7; col++) {
			GAME.Grid.currentTiles[row][col] = null;
		}
	}
}
GAME.Grid.createTiles = function() {
	tileHeight = pixelFromPercentHeight(22) - 2;
	tileWidth = pixelFromPercentWidth(12) - 2;
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 7; col++) {
			tiles[row][col] = new GAME.Tile(row, col, currentGrid[row][col]); //TODO: Change this to load different grids
			GAME.Grid.currentTiles[row][col] = tiles[row][col];
			tiles[row][col].tileColor = GAME.Tile.getRandomTileColor();
			switch(GAME.Grid.gravDirection) {
				case GAME.Grid.Direction.Right:
					tiles[row][col].xPosition = (pixelFromPercentWidth(GAME.Grid.reverseTileX - GAME.Tile.percentFromCol(tiles[row][col].col)) - gridShifterW);
					tiles[row][col].yPosition = (pixelFromPercentHeight(GAME.Grid.reverseTileY - GAME.Tile.percentFromRow(tiles[row][col].row)) + 1);
					break;
				case GAME.Grid.Direction.Down:
				case GAME.Grid.Direction.Left:	
					tiles[row][col].xPosition = (pixelFromPercentWidth(GAME.Tile.percentFromCol(tiles[row][col].col)) - gridShifterW);
					tiles[row][col].yPosition = (pixelFromPercentHeight(GAME.Tile.percentFromRow(tiles[row][col].row)) + 1);
					break;
			}
			tiles[row][col].isSelected = false;
			tiles[row][col].tileGraphic = new PIXI.Graphics();
			tiles[row][col].tileGraphic.interactive = true;
			// tiles[row][col].tileGraphic.on('touchmove', inputMoveToTile.bind(tiles[row][col]));
			//TODO: add touchstart/touchmove (and click) to a single object make it global check through array for which it's hitting
			tiles[row][col].tileGraphic.on('tap', onTileTap.bind({"row": row, "col": col, "tile":tiles[row][col]}));
			tiles[row][col].tileGraphic.on('click', onTileTap.bind({"row": row, "col": col, "tile":tiles[row][col]}));
			stage.addChild(tiles[row][col].tileGraphic);
			if(tiles[row][col].tileType !== 0) {
				tiles[row][col].overGraphic = new PIXI.Graphics();
				stage.addChild(tiles[row][col].overGraphic);
			}
		};
	};
}
GAME.Grid.drawTiles = function() {
	tileHeight = pixelFromPercentHeight(22) - 2;
	tileWidth = pixelFromPercentWidth(12) - 2;
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 7; col++) {
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
	// if(tile.isSelected) tileGraphic.beginFill(tile.tileColor, selectedAlpha);
	if(tile.isSelected) tileGraphic.beginFill(match.start.tileColor, selectedAlpha);
	else tileGraphic.beginFill(tile.tileColor, unselectedAlpha);
	if(tile.isFalling) { //animate tile fall
		switch(GAME.Grid.gravDirection) {
			case GAME.Grid.Direction.Right:
				var target = (pixelFromPercentHeight(GAME.Grid.reverseTileY - GAME.Tile.percentFromRow(tile.row)) + 1);
				tile.xPosition = (pixelFromPercentWidth(GAME.Grid.reverseTileX - GAME.Tile.percentFromCol(tile.col)) - gridShifterW);
				tile.yPosition = GAME.Grid.moveTileToward(tile.yPosition, target, tile.velocity);
				if(Math.abs(target - tile.yPosition) < tile.velocity || tile.yPosition > target) { //close enough
					tile.isFalling = false;
					tile.velocity = tile.startVelocity;
					tile.yPosition = target;
				}
				break;
			case GAME.Grid.Direction.Left:	
				var target = (pixelFromPercentHeight(GAME.Tile.percentFromRow(tile.row)) + 1);
				tile.xPosition = (pixelFromPercentWidth(GAME.Tile.percentFromCol(tile.col)) - gridShifterW);
				tile.yPosition = GAME.Grid.moveTileToward(tile.yPosition, target, tile.velocity);
				if(Math.abs(target - tile.yPosition) < tile.velocity|| tile.yPosition > target) { //close enough
					tile.isFalling = false;
					tile.velocity = tile.startVelocity;
					tile.yPosition = target;
				}
				break;
			case GAME.Grid.Direction.Down:	
				var target = (pixelFromPercentWidth(GAME.Tile.percentFromCol(tile.col)) - gridShifterW);
				tile.yPosition = (pixelFromPercentHeight(GAME.Tile.percentFromRow(tile.row)) + 1);
				tile.xPosition = GAME.Grid.moveTileToward(tile.xPosition, target, tile.velocity);
				if(Math.abs(target - tile.xPosition) < tile.velocity|| tile.xPosition > target) { //close enough
					tile.isFalling = false;
					tile.velocity = tile.startVelocity;
					tile.xPosition = target;
				}
				break;
		}
	} else { // Not falling - regular
		switch(GAME.Grid.gravDirection) {
			case GAME.Grid.Direction.Right:
				tile.xPosition = (pixelFromPercentWidth(GAME.Grid.reverseTileX - GAME.Tile.percentFromCol(tile.col)) - gridShifterW);
				tile.yPosition = (pixelFromPercentHeight(GAME.Grid.reverseTileY - GAME.Tile.percentFromRow(tile.row)) + 1); 
			break;
			case GAME.Grid.Direction.Left:	
			case GAME.Grid.Direction.Down:
				tile.xPosition = (pixelFromPercentWidth(GAME.Tile.percentFromCol(tile.col)) - gridShifterW);
				tile.yPosition = (pixelFromPercentHeight(GAME.Tile.percentFromRow(tile.row)) + 1);
			break;
		}
	}
	if(tile.tileType !== 0) GAME.Grid.drawSpecialTile(tile);
	tileGraphic.drawRect(tile.xPosition, tile.yPosition, tileWidth, tileHeight);
	tileGraphic.endFill();
}
GAME.Grid.drawSpecialTile = function(tile) {
	var halfTile = (Math.min(tileWidth, tileHeight) / 2.0);
	var halfWidth = (tileWidth / 2.0);
	var halfHeight = (tileHeight / 2.0);
	var quarterTile = (halfTile / 2.0);
	tile.overGraphic.clear();
	tile.overGraphic.lineStyle(getMatchIconWidth(halfTile), 0x000000, 1); //width, color, alpha
	switch(tile.tileType) {
		case 1: //Circle match
			tile.overGraphic.drawCircle(tile.xPosition + halfWidth, tile.yPosition + halfHeight, quarterTile);
			break;
		case 2: //Rectangle match
			tile.overGraphic.drawRect(tile.xPosition + (halfWidth - quarterTile), tile.yPosition + (halfHeight - quarterTile), halfTile, halfTile);
			break;
		case 3: //Triangle match
			if(isVertical){
				tile.overGraphic.moveTo(tile.xPosition + (halfWidth/2.0), tile.yPosition + halfHeight);
				tile.overGraphic.lineTo(tile.xPosition + halfWidth + (halfWidth/2.0), tile.yPosition + halfHeight + (halfHeight/2.0));
				tile.overGraphic.lineTo(tile.xPosition + halfWidth + (halfWidth/2.0), tile.yPosition + (halfHeight/2.0));
				tile.overGraphic.lineTo(tile.xPosition + (halfWidth/2.0), tile.yPosition + halfHeight);
			} else {
				tile.overGraphic.moveTo(tile.xPosition + (halfWidth/2.0), tile.yPosition + halfHeight + (halfHeight/2.0));
				tile.overGraphic.lineTo(tile.xPosition + halfWidth + (halfWidth/2.0), tile.yPosition + halfHeight + (halfHeight/2.0));
				tile.overGraphic.lineTo(tile.xPosition + halfWidth, tile.yPosition + (halfHeight/2.0));
				tile.overGraphic.lineTo(tile.xPosition + (halfWidth/2.0), tile.yPosition + halfHeight + (halfHeight/2.0));
			}
			break;
		case 4: //Static tile
			var border = .4;
			tile.tileGraphic.beginFill(0x000000, 1);
			tile.overGraphic.lineStyle(0, 0x000000, 1); //width, color, alpha
			tile.overGraphic.beginFill(0xFFFFFF, 1);
			tile.overGraphic.drawRect(tile.xPosition + (tileWidth * (border/2.0)), tile.yPosition + (tileHeight * (border/2.0)), 
				(tileWidth * (1 - border)), (tileHeight * (1 - border)));
			tile.overGraphic.endFill();
			break;
	}
}
GAME.Grid.beginDraw = function() { 
	if(isVertical) { 
		if(window.orientation === undefined) {
			renderer.resize(w,h);
		} else {
			renderer.resize(window.innerHeight, window.innerWidth);
		}
	}
}
GAME.Grid.endDraw = function() {
	if(isVertical) { 
		if(window.orientation === undefined) {
			renderer.resize(h,w);
		} else {
			renderer.resize(window.innerWidth, window.innerHeight); 
		}
	}
}

