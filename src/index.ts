import createStore from "./core/redux";
import type { GridItem, GridMatrix } from "./types";
import { toMatrix } from "./utils";

const createGrid = (initialMatrix: GridMatrix) => {
  const rows = initialMatrix.length;
  const cols = initialMatrix[0]?.length ?? 0;

  const flatItems: GridItem[] = initialMatrix
    .flat()
    .filter((cell): cell is GridItem => cell !== null);
  const store = createStore({ items: flatItems });

  const swapItem = (idA: string, idB: string) =>
    store.dispatch({ type: "SWAP_ITEMS", payload: { idA, idB } });

  const getMatrix = () => toMatrix(store.getState().items, rows, cols);
  const emitter = new EventTarget();

  const attachDnd = (el: HTMLElement, id: string) => {
    let dragging = false;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      el.setPointerCapture(e.pointerId);
      // 이후 포인터만 잡아두면 됨
      el.addEventListener("pointerup", onPointerUp);
    };

    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      el.releasePointerCapture(e.pointerId);
      el.removeEventListener("pointerup", onPointerUp);

      // 드롭 시점에 포인터 아래 셀을 감지
      const under = document
        .elementFromPoint(e.clientX, e.clientY)
        ?.closest<HTMLElement>("[data-id]");
      const dropId = under?.dataset.id;

      if (dropId && dropId !== id) {
        // swap만 하면 되므로 offset 계산 불필요
        swapItem(id, dropId);
        console.log(getMatrix());
        emitter.dispatchEvent(new CustomEvent("grid-change"));
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    return () => el.removeEventListener("pointerdown", onPointerDown);
  };

  return { getMatrix, attachDnd, emitter };
};

export default createGrid;
