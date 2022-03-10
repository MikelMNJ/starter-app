import React, { useEffect, useCallback } from 'react';
import { buildClasses } from 'helpers/utilityHelpers';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';
import './Component.scss';

const Component = props => {
  const { className, ...rest } = props;
  const dispatch = useDispatch();

  // Sample actions/selectors from global state...
  const sampleAction = useCallback(payload => dispatch(appActions?.sampleAction(payload)), [dispatch]);
  const sampleSelector = useSelector(state => appSelectors?.sampleSelector(state));

  const classes = [
    { condition: className, name: className }
  ];

  useEffect(() => {
    if (!sampleSelector) {
      sampleAction("Sample value!");
    }
  }, [sampleSelector, sampleAction]);

  return (
    <div className={buildClasses(classes, "default")} {...rest}>
      <p>
        {sampleSelector || "Store empty."}
      </p>
    </div>
  );
};

export default Component;