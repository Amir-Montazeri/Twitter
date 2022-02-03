import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { newTweet } from '../actions';
import { addTweet } from '../functions/tweets';
import { useHistory } from 'react-router-dom';
import { isPersian } from '../functions/language';
import AvatarRendering from './rendering/AvatarRendering';
import { Button } from './StyledComponents/elements';
import { AiOutlineClose } from 'react-icons/ai';

const TweetCreatorContainer = styled.section`
  width: 75vw;
  height: 500px;
  background: #fff;
  box-shadow: 0 3px 13px -6px rgba(1, 1, 1, .75);
  > div {
    width: 100%;
  }
  @media screen and (max-width: 800px) {
    width: 100vw;
    height: 100vh;
    box-shadow: none;
  }
`;
const TweetCreatorTop = styled.div`
  padding: 0 5px;
  height: 42px;
  display: flex;
  justify-content: space-between;
`;
const TweetCreatorLeftTop = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const TweetCreatorRightTop = styled(TweetCreatorLeftTop)``;
const TweetCreatorMiddle = styled.div`
  position: relative;
  margin: 20px 0;
  padding: 0 15px;
  height: 75%;
  display: flex;
  ::before {
    content: '';
    width: 12%;
    height: 1px;
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(1, 1, 1, .25);
  }
  ::after {
    content: '';
    width: 12%;
    height: 1px;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(1, 1, 1, .25);
  }
`;
const TextArea = styled.textarea`
  padding-top: 12px;
  margin-left: 10px;
  width: 100%;
  min-height: 30px;
  max-height: 100%;
  font-size: 1em;
  direction: ${props => props.persian ? 'rtl' : 'ltr'};
  resize: none;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #1D9BF0 #fff;
`;
const TweetCreatorBottom = styled.div`
  padding: 0 15px;
  display: flex;
  justify-content: center;
`;
const Input = styled.input`
  padding: 0 5px;
  width: 300px;
  border-bottom: .1px solid rgba(1, 1, 1, .3);
`;
const TweetCreatorBottomTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    margin: 3px 0;
  }
  > p {
    font-size: .9em;
  }
`;

function TweetCreator({ client, newTweet }) {
  const INITIAL_CREATED_TWEET = { text: '', mediaAttached: '' };
  const [createdTweet, setCreatedTweet] = useState(INITIAL_CREATED_TWEET);
  const textareaRef = useRef();
  const history = useHistory();

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  const onFormSubmited = e => {
    e.preventDefault();
    if (createdTweet.text) {
      newTweet(addTweet(client, createdTweet))
      setCreatedTweet(INITIAL_CREATED_TWEET);
      history.push('/');
    }
  };

  const onTextareaKeyDowned = e => {
    if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase === 'enter' || e.keyCode === 13 || e.keyCode === 10)) {
      onFormSubmited(e);
    }
  };

  return (
    <form onSubmit={onFormSubmited}>
      <TweetCreatorContainer>
        <TweetCreatorTop>
          <TweetCreatorLeftTop>
            <AiOutlineClose size={'23px'} cursor={'pointer'} onClick={() => history.push('/')} />
          </TweetCreatorLeftTop>
          <TweetCreatorRightTop>
            <Button bg="#1D9BF0" radius="13px" type='submit' disabled={!createdTweet.text}>Tweet</Button>
          </TweetCreatorRightTop>
        </TweetCreatorTop>
        <TweetCreatorMiddle>
          <AvatarRendering avatar={client} size="2.8em" />
          <TextArea
            ref={textareaRef}
            placeholder={'What\'s new?'}
            value={createdTweet.text}
            onChange={e => setCreatedTweet({ ...createdTweet, text: e.target.value })}
            persian={isPersian(createdTweet.text)}
            onKeyDown={onTextareaKeyDowned}
          />
        </TweetCreatorMiddle>
        <TweetCreatorBottom>
          <TweetCreatorBottomTop>
            <Input
              placeholder='Enter your media URL there, If you have...'
              value={createdTweet.mediaAttached}
              onChange={e => setCreatedTweet({ ...createdTweet, mediaAttached: e.target.value })}
            />
            <p>Note: Press enter button after putting link there!</p>
          </TweetCreatorBottomTop>
        </TweetCreatorBottom>
      </TweetCreatorContainer>
    </form>
  );
};

const mapStateToProps = state => ({
  client: state.client
});

export default connect(mapStateToProps, { newTweet })(TweetCreator);