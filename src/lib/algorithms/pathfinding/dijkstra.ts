import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const dijkstra = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTile = [];
  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.isTraversed = true;
  const untraversedTiles = [base];

  while (untraversedTiles.length > 0) {
    untraversedTile.sort((a, b) => a.distance - b.distance);
    const currentTile = untraversedTiles.shift();
    if (currentTile) {
      if (currentTile.isWall) continue;
      if (currentTile.distance === Infinity) break;
      currentTile.isTraversed = true;
      traversedTile.push(currentTile);
      if (isEqual(currentTile, endTile)) break;
      const neighbours = getUntraversedNeighbours(grid, currentTile);
      for (let i = 0; i < neighbours.length; i++) {
        if (currentTile.distance + 1 < neighbours[i].distance) {
          dropFromQueue(neighbours[i], untraversedTiles);
          neighbours[i].distance = currentTile.distance + 1;
          neighbours[i].parent = currentTile;
          untraversedTiles.push(neighbours[i]);
        }
      }
    }
  }
  const path = [];
  let current = grid[endTile.row][endTile.col];
  while (current !== true) {
    current.isPath = true;
    path.unshift(current);
    current = current.parent;
  }
  return { traversedTile, path };
};
