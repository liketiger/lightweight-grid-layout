export interface GridItem {
  id: string; // x-y
  x: number; // column index
  y: number; // row index
}

export type GridMatrix = GridItem[][];

export type Action = {
  type: "SWAP_ITEMS";
  payload: { idA: string; idB: string };
};

export interface State {
  items: GridItem[];
}
