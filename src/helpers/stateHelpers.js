import { useEffect, useReducer, useRef } from 'react';
import { useStore } from 'store';

export const actionCreator = (type, payload, meta) => {
  const action = { type, payload };

  if (meta) {
    action.meta = meta;
  }

  return action;
};

export const useSelector = selector => {
  const { state } = useStore();
  if (selector) return selector(state);
};

export const useDispatch = () => {
  const { dispatch } = useStore();
  return dispatch;
};

export const useReducerWithWares = args => {
  const { rootReducer, initialState, middlewares, afterwares } = args;
  const [ state, dispatch ] = useReducer(rootReducer, initialState);
  const actionRef = useRef();

  const dispatchWithMiddleware = action => {
    middlewares?.forEach(middleware => middleware(dispatch, action, state));
    actionRef.current = action;
  };

  useEffect(() => {
    if (!actionRef.current) return;
    afterwares?.forEach(afterware => afterware(dispatch, actionRef.current, state));
    actionRef.current = null;
  }, [afterwares, state]);

  return [ state, dispatchWithMiddleware ];
};

export const makeInitialState = reducers => (
  Object.keys(reducers).reduce((prevState, key) => {
    const reducer = reducers[key];
    const reducerState = reducer();
    const combinedState = { ...prevState, [key]: reducerState };
    return combinedState;
  }, {})
);


export const combineReducers = reducers => (initialState, action) => (
  Object.keys(reducers).reduce((prevState, key) => {
    const reducer = reducers[key];
    const reducerInitialState = prevState[key];
    const reducerState = reducer(reducerInitialState, action);
    const combinedState = { ...prevState, [key]: reducerState };
    return combinedState;
  }, initialState)
);