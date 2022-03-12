import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import { fadeIn } from 'helpers/animationHelpers';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';
import Checklist from './Checklist';
import NextSteps from './NextSteps';
import './ReplaceMe.scss';

const ReplaceMe = props => {
  const { apiTestPath } = props;
  const dispatch = useDispatch();

  // Sample actions/selectors from global state...
  const sampleAction = useCallback(payload => dispatch(appActions?.sampleAction(payload)), [dispatch]);
  const sampleSelector = useSelector(state => appSelectors?.sampleSelector(state));

  useEffect(() => {
    if (!sampleSelector) {
      sampleAction("New value from global state!");
    }
  }, [sampleSelector, sampleAction]);

  return (
    <div className="replaceMe">
      <div className={`layout ${fadeIn}`}>
        <Checklist apiTestPath={apiTestPath} sampleSelector={sampleSelector} />
        <NextSteps />
      </div>
    </div>
  );
};

export default ReplaceMe;