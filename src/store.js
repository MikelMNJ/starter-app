import React, { createContext, useContext, useMemo } from 'react';
import { makeInitialState, combineReducers, useReducerWithMiddleware } from 'helpers/stateHelpers';
import app from 'modules/app/appReducer';
import apiMiddleware from 'middleware/api';

export const AppContext = createContext();
AppContext.displayName = "AppContext";

export const useStore = () => useContext(AppContext);

const reducers = {
  app,
};

const initialState = makeInitialState(reducers);
const rootReducer = combineReducers(reducers);
const middlewares = [ apiMiddleware ];
const afterwares = [];

// How to use: wrap <App /> in index.js with <AppProvider />
// See 'modules' for reducer and associated state actions/selectors.
// See 'helpers/stateHelpers' for custom hooks, action creator and StateManager methods.

export const AppProvider = ({ children }) => {
  const reducerArgs = { rootReducer, initialState, middlewares, afterwares };
  const [ state, dispatch ] = useReducerWithMiddleware(reducerArgs);
  const memoized = useMemo(() => [ state, dispatch ], [state, dispatch]);
  const store = { state: memoized[0], dispatch: memoized[1] };

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};