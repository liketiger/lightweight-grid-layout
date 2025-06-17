import type { Action, State } from "../types";

const reducer = (state: State, action: Action): State => {
  const actions = {
    SWAP_ITEMS: {
      items: state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, x: action.payload.x, y: action.payload.y }
          : item
      ),
    },
  };

  return actions[action.type] ?? state;
};

export default reducer;