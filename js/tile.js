var GAME = GAME || {};

GAME.Tile = function(row, col, type){
	this.tileRow = this.row = row;
	this.tileCol = this.col = col;
	this.xPercent = GAME.Tile.percentFromCol(col);
	this.yPercent = GAME.Tile.percentFromRow(row);
	this.tileType = type;
	this.velocity = 1;
	this.startVelocity = 5;
	this.isSelected = false;
	this.isAlive = true;
	this.isFalling = false;
	var tileColor;
	var xPosition, yPosition;
	var tileGraphic, overGraphic;
	if(this.tileType !== 0) this.hasOver = true;
	else this.hasOver = false;
	if(this.tileType === 1 || this.tileType === 2 || this.tileType === 3) this.isMatchTile = true;
	else this.isMatchTile = false;
}
GAME.Tile.constructor = GAME.Tile;

GAME.Tile.percentFromRow = function(row) {
	switch(row) {
		case 0: 
			return 6;
		case 1:
			return 28;
		case 2:
			return 50;
		case 3:
			return 72;
	}
}

GAME.Tile.percentFromCol = function(col) {
	switch(col) {
		case 0: 
			return 14;
		case 1:
			return 26;
		case 2:
			return 38;
		case 3:
			return 50;
		case 4:
			return 62;
		case 5:
			return 74;
		case 6:
			return 86;
	}
}

GAME.Tile.getRandomTileColor = function() {
switch(Math.floor(Math.random() * 8)) {
    case 0: //teal
        return 0x72F6FF;
    case 1: //green
        return 0x1abc9c;
    case 2: //orange
        return 0xFF7D4F; 
    case 3: //red
        return 0xD3658D;
    // case 4: //purple
    //     return 0x9b59b6;
    // case 5:
    //     return 0x1abc9c;
    // case 4:
    //     return 0x16a085;
    default: //pink
        return 0xEDE9F8;
	}
}





