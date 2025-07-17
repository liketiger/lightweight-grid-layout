import type { Action, State } from '../types';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SWAP_ITEMS': {
      const { idA, idB } = action.payload;

      const itemA = state.items.find((it) => it.id === idA);
      const itemB = state.items.find((it) => it.id === idB);
      if (!itemA || !itemB) {
        return state;
      }

      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === idA) {
            return { ...item, x: itemB.x, y: itemB.y };
          }
          if (item.id === idB) {
            return { ...item, x: itemA.x, y: itemA.y };
          }
          return item;
        }),
      };
    }

    default:
      return state;
  }
};

export default reducer;
