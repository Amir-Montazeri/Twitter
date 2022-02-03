import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import TweetRendering from './rendering/TweetRendering';
import { TweetContainer } from './StyledComponents/Tweet';
import { BiMessageRounded } from 'react-icons/bi';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NewTweetContainer = styled.span`
  padding: 15px;
  position: fixed;
  bottom: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: skyblue;
  border-radius: 50%;
  box-shadow: 0 0 6px #fff;
  cursor: pointer;
  z-index: 10;
`;

function Timeline({ tweets }) {
  const history = useHistory();

  return (
    <Container>
      <TweetContainer>
        <TweetRendering items={tweets} />
      </TweetContainer>
      <NewTweetContainer onClick={() => history.push('/new/newtweet')}>
        <BiMessageRounded color='#fff' size={'30px'} />
      </NewTweetContainer>
    </Container>
  );
}

const mapStateToProps = state => ({
  tweets: state.tweets
});

export default connect(mapStateToProps)(Timeline);