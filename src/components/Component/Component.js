import React, { useEffect } from 'react';
import { buildClasses } from 'helpers/utilityHelpers';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';
import './Component.scss';

const Component = props => {
  const { className, ...rest } = props;
  const dispatch = useDispatch();

  const sampleAction = payload => dispatch(appActions?.sampleAction(payload));
  const sampleSelector = useSelector(state => appSelectors?.sampleSelector(state));

  const classes = [
    { condition: className, name: className }
  ];

  useEffect(() => {
    if (!sampleSelector) {
      // Example: Setting new global state value.
      sampleAction("Sample value!");
    }
  }, [sampleSelector]);

  return (
    <div className={buildClasses(classes, "default")} {...rest}>
      {sampleSelector || "Store empty."}
    </div>
  );
};

export default Component;