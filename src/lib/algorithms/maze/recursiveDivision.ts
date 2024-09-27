import { GridType, SpeedType, TileType } from "../../../utils/types";
import { verticleDivision } from "./verticleDivision";
import horizontalDivision from "./horizontalDivision";

export default async function recursiveDivision({
  grid,
  startTile,
  endTile,
  row,
  col,
  height,
  width,
  setIsDisabled,
  speed,
}: {
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  row: number;
  col: number;
  height: number;
  width: number;
  setIsDisabled: (isDisabled: boolean) => void;
  speed: SpeedType;
}) {
  if (height <= 1 || width <= 1) {
    return;
  }
  if (height > width) {
    await horizontalDivision({
      grid,
      startTile,
      endTile,
      row,
      col,
      height,
      width,
      setIsDisabled,
      speed,
    });
  } else {
    await verticleDivision({
      grid,
      startTile,
      endTile,
      row,
      col,
      height,
      width,
      setIsDisabled,
      speed,
    });
  }
}
