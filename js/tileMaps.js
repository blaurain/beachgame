var GAME = GAME || {};

GAME.TileMap = function() {}
GAME.TileMap.constructor = GAME.TileMap;
GAME.TileMap.numberOfGrids = 4;
GAME.TileMap.currentGridIndex = 0;

GAME.TileMap.grid0 = [
  [1,0,0,0,2,0,1],
  [0,0,3,0,4,0,0],
  [0,4,0,0,0,0,0],
  [0,2,0,0,0,0,3]
]

GAME.TileMap.grid1 = [
  [4,0,0,2,0,4,3],
  [0,1,0,4,0,0,0],
  [0,0,0,4,1,0,0],
  [0,4,3,0,2,0,4]
]

GAME.TileMap.grid2 = [
  [4,2,4,0,4,1,4],
  [0,0,0,0,0,0,0],
  [1,0,0,0,0,0,3],
  [3,4,0,4,0,4,2]
]

GAME.TileMap.grid3 = [
  [0,0,0,3,0,0,0],
  [0,1,4,4,4,2,0],
  [0,4,3,2,1,4,0],
  [0,0,0,4,0,0,0]
]

// GAME.TileMap.grid2 = [
//   [0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0]
// ]

GAME.TileMap.setCurrentGrid = function(gridNum) {
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
		case 3:
			currentGrid = GAME.TileMap.grid3;
			break;
	}
}

// GAME.TileMap.grid2 = [
//   [0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0]
// ]