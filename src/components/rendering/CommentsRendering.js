import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { newComment } from '../../actions';
import { convertArrayToObject } from '../../functions/arrVobj';
import { isPersian } from '../../functions/language';
import TweetRendering from './TweetRendering';
import { TweetContainer } from '../StyledComponents/Tweet';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { addComment } from '../../functions/tweets';

const CommentsContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentedOn = styled.div`
  width: 90vw;
  margin-bottom: 20px;
`;

const CloseContainer = styled.span`
  position: fixed;
  top: 10px;
  right: 10px;
  padding-bottom: 50px;
  cursor: pointer;
  z-index: 10;
`;

const TweetNewComment = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  padding-top: 3px;
  width: 100%;
  max-width: 700px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-50%);
  background: #fff;
  box-shadow: 0 0 14px -7px rgba(1, 1, 1, 1);
  z-index: 8;
`;

const Input = styled.input`
  padding: 3px;
  width: 80%;
  border-bottom: 1px solid rgba(1, 1, 1, .4);
  direction: ${props => props.persian ? 'rtl' : 'ltr'};
`;

function CommentsRendering({ tweets, client, newComment }) {
  const INITIAL_COMMENT = { text: '', mediaAttached: '' };
  const [item, setItem] = useState({});
  const [newCommentTweet, setNewCommentTweet] = useState(INITIAL_COMMENT);
  const match = useRouteMatch(),
    history = useHistory(),
    inputCommentRef = useRef();
  const id = match.params.id;

  useEffect(() => {
    console.log('rerendered')
    setItem(convertArrayToObject(tweets)[id]);
    inputCommentRef.current?.focus();
  });

  const formSubmited = e => {
    e.preventDefault();
    newComment(id, addComment(client, newCommentTweet))
    setNewCommentTweet(INITIAL_COMMENT);
  }

  return (
    <CommentsContainer>
      <CloseContainer onClick={() => history.push('/')}>
        <AiOutlineCloseCircle size={'33px'} />
      </CloseContainer>
      {
        !item?.id ? <div>Loading...</div> :
          <>
            <CommentedOn>
              <TweetRendering items={[item]} />
            </CommentedOn>
            <TweetContainer opa={.9} bg={'#E7F1F3'}>
              <TweetRendering items={item.comments} iscomment={true} />
            </TweetContainer>
          </>
      }
      <form onSubmit={formSubmited}>
        <TweetNewComment>
          <Input
            placeholder='Tweet your reply...'
            ref={inputCommentRef}
            value={newCommentTweet.text}
            onChange={e => setNewCommentTweet({ ...newCommentTweet, text: e.target.value })}
            persian={isPersian(newCommentTweet.text)}
          />
        </TweetNewComment>
      </form>
    </CommentsContainer>
  );
};

const mapStateToProps = state => ({
  tweets: state.tweets,
  client: state.client
});

export default connect(mapStateToProps, { newComment })(CommentsRendering);