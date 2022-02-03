import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { fetchClient, fetchTweets } from './actions';
import styled, { css } from 'styled-components';
import Timeline from './components/Timeline.js';
import TweetCreator from './components/TweetCreator';
import CommentsRendering from './components/rendering/CommentsRendering';
import PathController from './PathController.js'
import timer from './data/timer.json';

const Container = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #6ED2D5;
  overflow-x: hidden;
`;

const animation = css`
  animation: pulse ${timer.screenMoving/1000}s ease-out;
  @keyframes pulse {
    0% {
     transform: translateX(80%);
    }
  100% {
     transform: translateX(0); 
    }
  }
`;

const AppContainer = styled.div`
  ${props => props.moveScreen && (
    animation
  )}
`;

const App = ({ moveScreen, fetchClient, fetchTweets }) => {
  useEffect(() => {
    fetchClient('email');
    fetchTweets();
  }, []);

  return (
    <Router>
      <PathController timer={timer}>
        <Container>
          <AppContainer moveScreen={moveScreen}>
            <Switch>
              <Route path='/new/newtweet'>
                <TweetCreator />
              </Route>
              <Route path='/tweet/:id'>
                <CommentsRendering />
              </Route>
              <Route path='/'>
                <Timeline />
              </Route>
            </Switch>
          </AppContainer>
        </Container>
      </PathController>
    </Router>
  );
}

const mapStateToProps = state => ({
  moveScreen: state.screen?.moveScreen
})

export default connect(mapStateToProps, { fetchClient, fetchTweets })(App);