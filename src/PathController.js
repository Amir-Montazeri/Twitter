import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMoveScreen } from './actions';

function PathController({ timer, children, history, moveScreen, setMoveScreen }) {
  useEffect(() => {
    if (moveScreen) {
      const TimerId = setTimeout(() => {
        setMoveScreen(false);
      }, timer.screenMoving);
      return () => clearTimeout(TimerId)
    }
  }, [moveScreen]);

  history.listen(() => {
    setMoveScreen(true);
  })

  return <>{children}</>
}

const mapStateToProps = state => ({
  moveScreen: state.screen?.moveScreen
});

export default connect(mapStateToProps, { setMoveScreen })(withRouter(PathController));