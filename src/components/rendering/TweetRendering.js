import React from 'react';
import AvatarRendering from './AvatarRendering';
import styled from 'styled-components';
import { TweetOnLeft, TweetOnRight, Name, Username, Tweet, TweetOnBottomRight, COLContainer } from '../StyledComponents/Tweet';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { likeTweet, dislikeTweet } from '../../actions';
import { MdInsertComment } from 'react-icons/md';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { FaRegHeart } from 'react-icons/fa';
import { isPersian } from '../../functions/language';
import { isContains } from '../../functions/bool';

const clientUsername = 'msder_amir';

const TweetContainer = styled.div`
  position: relative;
  padding: 5px 5px 25px 5px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 5px 16px -8px rgba(1, 1, 1, .75);
`;

const TweetOnTop = styled.div`
  width: 100%;
  display: flex;
`;

const TweetOnBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    margin: 10px 0;
    max-height: 170px;
    border-radius: 7px;
  }
`;

function TweetRendering({ items, likeTweet, dislikeTweet, iscomment }) {
  const profileSize = '4em';
  const history = useHistory();
  console.log(iscomment ? `comment: ${items}` : `tweet: ${items}`);
  return items.map(item => (
    <TweetContainer key={item.id}>
      <TweetOnTop>
      <TweetOnLeft w={profileSize}>
        <AvatarRendering avatar={item} size={profileSize} onClicked={data => console.log(data)} />
      </TweetOnLeft>
      <TweetOnRight>
        <div>
          <p><Name className='unselectable'>{item.name} hi</Name> <Username>{item.username}</Username></p>
          <Tweet direction={isPersian(item.tweetContent) ? 'rtl' : 'ltr'}>{item.tweetContent}</Tweet>
        </div>
        {
          item.likedBy && item.comments && (
            <TweetOnBottomRight className='unselectable'>
              <COLContainer onClick={() => history.push(`/tweet/${item.id}`)}><MdInsertComment /> <span>{item.comments.length}</span></COLContainer>
              <COLContainer>
                {
                  isContains(item.likedBy, clientUsername) ?
                    <BsFillSuitHeartFill color='red' onClick={() => dislikeTweet(item.id, clientUsername)} /> :
                    <FaRegHeart onClick={() => likeTweet(item.id, clientUsername)} />
                }
                <span>{item.likedBy.length}</span></COLContainer>
            </TweetOnBottomRight>
          )
        }
      </TweetOnRight>
      </TweetOnTop>
      {
        item.tweetMediaAttachedUrl && (
          <TweetOnBottom>
            <img height='100%' src={item.tweetMediaAttachedUrl} alt='this Tweet has a media on itself but your browser didnt fetch it!' />
          </TweetOnBottom>
        )
      }
    </TweetContainer>
  ));
};

export default connect(null, { likeTweet, dislikeTweet })(TweetRendering);