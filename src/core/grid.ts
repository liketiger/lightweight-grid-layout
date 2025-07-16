import type { GridItem, GridMatrix } from "../types";
import { toMatrix } from "../utils";
import createStore from "./redux";


const createGrid = (initialMatrix: GridMatrix) => {
  const rows = initialMatrix.length;
  const cols = initialMatrix[0]?.length ?? 0;

  const flatItems: GridItem[] = initialMatrix
    .flat()
    .filter((cell): cell is GridItem => cell !== null);

  const store = createStore({ items: flatItems });

  const listeners: Array<() => void> = [];

  const subscribe = (fn: () => void) => {
    listeners.push(fn);
    return () => {
      const idx = listeners.indexOf(fn);
      if (idx >= 0) listeners.splice(idx, 1);
    }
  }

  const notify = () => listeners.forEach(fn => fn());

  const swapItem = (idA: string, idB: string) => {
    store.dispatch({ type: "SWAP_ITEMS", payload: { idA, idB } });
    notify();
  };

  const getMatrix = () => toMatrix(store.getState().items, rows, cols);

  const attachDnd = (el: HTMLElement, id: string) => {
    let dragging = false;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      el.setPointerCapture(e.pointerId);
      el.addEventListener("pointerup", onPointerUp);
    };

    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      el.releasePointerCapture(e.pointerId);
      el.removeEventListener("pointerup", onPointerUp);

      const under = document
        .elementFromPoint(e.clientX, e.clientY)
        ?.closest<HTMLElement>("[data-id]");
      const dropId = under?.dataset.id;

      if (dropId && dropId !== id) {
        swapItem(id, dropId);
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    return () => el.removeEventListener("pointerdown", onPointerDown);
  };

  return { getMatrix, attachDnd, subscribe, swapItem};
};

export default createGrid;
