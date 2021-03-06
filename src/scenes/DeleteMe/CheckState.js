import React, { Fragment, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';

export const CheckState = props => {
  const dispatch = useDispatch();

  // Sample actions/selectors from global state...
  const sampleAction = useCallback(payload => dispatch(appActions?.sampleAction(payload)), [dispatch]);
  const sampleSelector = useSelector(state => appSelectors?.sampleSelector(state));

  useEffect(() => {
    if (!sampleSelector) {
      sampleAction("New value from global state!");
    }

    /* eslint-disable-next-line */
  }, [sampleSelector]);

  return (
    <Fragment>
      <Status color={sampleSelector ? colors.green : colors.red} text={
        <p>
          <strong>
            Global state {sampleSelector ? "ready" : "offline"}
          </strong>:<br />

          Reducer {sampleSelector ? "updated" : "could not be reached"}.
        </p>
      } />
    </Fragment>
  );
};

export default CheckState;