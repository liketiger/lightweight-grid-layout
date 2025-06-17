import type { Action, State } from "../types";
import reducer from "./reducer";

export default function createStore(initialState: State) {
  let state = initialState;
  const getState = () => state;

  const dispatch = (action: Action) => {
    state = reducer(state, action);
  };

  return { getState, dispatch };
}
