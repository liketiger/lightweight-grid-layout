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

const CELL_SIZE = 100;

const { getMatrix, attachDnd, subscribe } = createGrid(initialMatrix);
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

      attachDnd(el, cell.id);
    });
}
const unsubscribe = subscribe(render);

render();
