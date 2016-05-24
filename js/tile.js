function Tile(row, col){
	this.startRow = this.row = row;
	this.startCol = this.col = col;
	this.xPercent = percentFromCol(col);
	this.yPercent = percentFromRow(row);
	this.isSelected = false;
	var tileColor;
	var xPosition, yPosition;


}


	function percentFromRow(row) {
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

	function percentFromCol(col) {
		switch(col) {
			case 0: 
				return 26;
			case 1:
				return 38;
			case 2:
				return 50;
			case 3:
				return 62;
			case 4:
				return 74;
			case 5:
				return 86;
		}
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