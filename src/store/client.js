import { FETCH_CLIENT } from '../actions';

const INITIAL_STATE = {
  name: '',
  username: '',
  profileUrl: '',
  email: '',
  followers: [],
  following: [],
  tweetCounts: 0,
}

export const client = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CLIENT:
      return { ...state, ...payload }
    default:
      return state;
  }
};