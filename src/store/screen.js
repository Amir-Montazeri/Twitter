import { SET_MOVE_SCREEN } from "../actions"

const INITIAL_STATE = {
  moveScreen: false,
}

export const screen = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MOVE_SCREEN:
      return { ...state, moveScreen: payload }
    default:
      return state;
  }
};