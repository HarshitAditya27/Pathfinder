import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import {
  initFunctionCost,
  initHeuristicCost,
} from "../../../utils/heuristicCost";
import { GridType, TileType } from "../../../utils/types";

export const aStar = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles = [];
  const heuristicCost = initHeuristicCost(grid, endTile);
  const functionCost = initFunctionCost();

  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  functionCost[base.row][base.col] =
    base.distance + heuristicCost[base.row][base.col];
  base.isTraversed = true;
  const untraversedTiles = [base];

  while (untraversedTiles.length > 0) {
    untraversedTiles.sort((a, b) => {
      if (functionCost[a.row][a.col] === functionCost[b.row][b.col]) {
        return b.distance - a.distance;
      }
      return functionCost[a.row][a.col] - functionCost[b.row][b.col];
    });
    const currentTile = untraversedTiles.shift();
    if (currentTile) {
      if (currentTile.isWall) continue;
      if (currentTile.distance == Infinity) break;
      currentTile.isTraversed = true;
      traversedTiles.push(currentTile);
      if (isEqual(currentTile, endTile)) break;
      const neighbours = getUntraversedNeighbours(grid, currentTile);
      for (let i = 0; i < neighbours.length; i++) {
        const distanceToNeighbours = currentTile.distance + 1;
        if (distanceToNeighbours < neighbours[i].distance) {
          dropFromQueue(neighbours[i], untraversedTiles);
          neighbours[i].distance = distanceToNeighbours;
          functionCost[neighbours[i].row][neighbours[i].col] =
            neighbours[i].distance +
            heuristicCost[neighbours[i].row][neighbours[i].col];
          neighbours[i].parent = currentTile;
          untraversedTiles.push(neighbours[i]);
        }
      }
    }
  }
  const path = [];
  let current = grid[endTile.row][endTile.col];
  while (current !== null) {
    current.isPath = true;
    path.unshift(current);

    current = current.parent;
  }
  return { traversedTiles, path };
};
