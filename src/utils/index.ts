import type { GridItem, GridMatrix } from "../types";

export const toMatrix = (
  items: GridItem[],
  rows: number,
  cols: number
): GridMatrix => {
  const matrix: GridMatrix = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );

  items.forEach((item) => {
    if (item.y >= 0 && item.y < rows && item.x >= 0 && item.x < cols) {
      matrix[item.y][item.x] = item;
    }
  });

  return matrix;
};
