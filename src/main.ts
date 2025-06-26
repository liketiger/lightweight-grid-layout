// main.js

import createGrid from ".";

const initialMatrix = [
  [
    { id: "item1", x: 0, y: 0 },
    { id: "item2", x: 1, y: 0 },
    { id: "item3", x: 2, y: 0 },
  ],
  [
    { id: "item4", x: 0, y: 1 },
    { id: "item5", x: 2, y: 1 },
  ],
];

const CELL_SIZE = 100; // 한 셀당 픽셀 크기

const { getMatrix, attachDnd, emitter } = createGrid(initialMatrix);
const container = document.getElementById("grid");

function render() {
  if (!container) return;
  container.innerHTML = "";
  getMatrix()
    .flat()
    .forEach((cell) => {
      if (!cell) return;

      const el = document.createElement("div");
      el.className = "grid-item";
      el.dataset.id = cell.id;
      el.style.left = `${cell.x * CELL_SIZE}px`;
      el.style.top = `${cell.y * CELL_SIZE}px`;
      el.textContent = cell.id;

      container.appendChild(el);

      // 드래그 앤 드롭 기능 연결
      attachDnd(el, cell.id);
      // 드롭 후 상태가 바뀌면 다시 렌더링
      // el.addEventListener("pointerup", render);
    });
  console.log(getMatrix());
}
emitter.addEventListener("grid-change", render);

// 최초 렌더링
render();
