import {
  FETCH_TWEETS,
  LIKE_TWEET,
  DISLIKE_TWEET,
  NEW_TWEET,
  NEW_COMMENT
} from '../actions';
import { convertArrayToObject } from '../functions/arrVobj';
import { isContains } from '../functions/bool';

export const tweets = (state = [], action) => {
  const { payload, type } = action;
  switch (type) {
    case NEW_TWEET:
    case FETCH_TWEETS: {
      let new_array = [];
      payload.forEach(item => {
        if (!state.includes(item) || state.length === 0) {
          new_array.push(item);
        }
      })
      return [ ...state, ...new_array ];
    }
    case LIKE_TWEET: {
      const { id, username } = payload;
      let target = convertArrayToObject(state);
      if (!isContains(target[id].likedBy, username)) {
        target[id].likedBy.push(username)
      }
      const result = Object.values(target)
      return result;
    }
    case DISLIKE_TWEET: {
      const { id, username } = payload;
      let target = convertArrayToObject(state);
      const index = target[id].likedBy.indexOf(username);
      if (index > -1 && isContains(target[id].likedBy, username)) {
        target[id].likedBy.splice(index, 1)
      }
      const result = Object.values(target);
      return result;
    }
    case NEW_COMMENT: {
      const { tweetId, commentData } = payload;
      let target = convertArrayToObject(state);
      target[tweetId].comments.push(commentData);
      const result = Object.values(target);
      return [ ...state, result ];
    }
    default:
      return state;
  };
};