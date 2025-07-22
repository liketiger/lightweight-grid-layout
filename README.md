# light-weight-grid-layout

A headless, dependency-free grid layout library for pure JavaScript/TypeScript environments. Use it with any framework (React, Vue, Angular) or without.
It is up to library users to render and style with returned matrix.

## 📦 Features

- **Zero Configuration**: Provides grid logic without external CSS or libraries.
- **Lightweight**: Minimal dependencies for fast performance.
- **Drag and Drop**: Swap items easily with the `attachDnd` API.
- **Subscription & Notifications**: Separate rendering logic using `subscribe`.

## 🚀 Installation

```bash
npm install light-weight-grid-layout
# or
yarn add light-weight-grid-layout
```

## 🔧 Usage Example

```js
import createGrid from 'light-weight-grid-layout';

const initialMatrix = [
  [
    { id: 'item1', x: 0, y: 0 },
    { id: 'item2', x: 1, y: 0 },
    { id: 'item3', x: 2, y: 0 },
  ],
  [
    { id: 'item4', x: 0, y: 1 },
    { id: 'item5', x: 2, y: 1 },
  ],
];

const CELL_SIZE = 100;
const { getMatrix, attachDnd, subscribe } = createGrid(initialMatrix);

function render() {
  const container = document.getElementById('grid'); // if there is element with id='grid'

  if (!container) return;
  container.innerHTML = '';
  getMatrix()
    .flat()
    .forEach((cell) => {
      if (!cell) return;
      const el = document.createElement('div');
      el.className = 'grid-item';
      el.dataset.id = cell.id;
      el.style.cssText = `
        position: absolute;
        width: ${CELL_SIZE}px;
        height: ${CELL_SIZE}px;
        left: ${cell.x * CELL_SIZE}px;
        top: ${cell.y * CELL_SIZE}px;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      el.textContent = cell.id;
      container.appendChild(el);
      attachDnd(el, cell.id);
    });
}

export { render, subscribe };

// render();
// subscribe(render);
```

## 📝 API

| Function     | Signature                                                                      | Description                                                      |
| ------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `createGrid` | `(initialMatrix: GridMatrix) => { getMatrix, swapItem, attachDnd, subscribe }` | Instantiate a grid instance with the provided initial 2D matrix. |

**GridMatrix Type**

| Type         | Signature                              | Description                                                    |
| ------------ | -------------------------------------- | -------------------------------------------------------------- |
| `GridMatrix` | `GridItem[][]`                         | GridItem 2D matrix.                                            |
| `GridItem`   | `{ id: string, x: number, y: number }` | Id must be unique ex. 'x-y', x -> column index, y -> row index |

**Returned Methods**

| Method      | Signature                                   | Description                                                              |
| ----------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| `getMatrix` | `(): GridMatrix`                            | Returns the current grid state as a 2D matrix.                           |
| `swapItem`  | `(idA: string, idB: string): void`          | Swaps two items by their IDs and notifies subscribers.                   |
| `attachDnd` | `(el: HTMLElement, id: string): () => void` | Binds drag-and-drop handlers; returns an unbind function.                |
| `subscribe` | `(fn: () => void): () => void`              | Registers a callback for state changes; returns an unsubscribe function. |

## 🛠️ Configuration

- **TypeScript Support**: Includes type definitions in `dist/index.d.ts`.
- **Bundling**: Distributed as an ES module.
- **Peer Dependencies**: None.

## 📖 Github

[GitHub repository](https://github.com/liketiger/lightweight-grid-layout).

## 📄 License

MIT © Sung-jae Hwang
