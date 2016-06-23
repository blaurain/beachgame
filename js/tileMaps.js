var GAME = GAME || {};

GAME.TileMap = function() {}
GAME.TileMap.constructor = GAME.TileMap;
GAME.TileMap.numberOfGrids = 3;
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

// GAME.TileMap.grid2 = [
//   [0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0]
// ]