import { setZero } from "../functions/number";

export const addTweet = (client, newTweetContent) => {
  const newTweet = {
    name: client.name,
    username: client.username,
    profileUrl: client.profileUrl,
    tweetContent: newTweetContent.text,
    tweetMediaAttachedUrl: newTweetContent.mediaAttached || '',
    likedBy: [],
    id: `${client.username}-${setZero(client.tweetCounts + 1)}`,
    comments: []
  }

  return newTweet;
};

export const addComment = (client, newTweetContent) => {
  const newTweet = {
    name: client.name,
    username: client.username,
    profileUrl: client.profileUrl,
    tweetContent: newTweetContent.text,
    tweetMediaAttachedUrl: newTweetContent.mediaAttached || '',
    id: `${client.username}-${setZero(client.tweetCounts + 1)}`
  }

  return newTweet;
};