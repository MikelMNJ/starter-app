import React, { createContext, useContext, useMemo } from 'react';
import { makeInitialState, combineReducers, useReducerWithWares } from 'helpers/stateHelpers';
import rootReducer from 'modules/root/rootReducer';
import app from 'modules/app/appReducer';
import auth from 'modules/auth/authReducer';
import apiMiddleware from 'wares/apiMiddleware';

export const AppContext = createContext();
AppContext.displayName = "AppContext";

export const useStore = () => useContext(AppContext);

export const reducers = {
  app,
  auth,
};

export const initialState = makeInitialState(reducers);
export const mainReducer = combineReducers(reducers);
const middlewares = [ apiMiddleware ];
const afterwares = [];

// How to use: wrap <App /> in index.js with <AppProvider />
// See 'modules' for reducer and associated state actions/selectors.
// See 'helpers/stateHelpers' for custom hooks, action creator and StateManager methods.

export const AppProvider = ({ children }) => {
  const reducerArgs = { rootReducer, initialState, middlewares, afterwares };
  const [ state, dispatch ] = useReducerWithWares(reducerArgs);
  const memoized = useMemo(() => [ state, dispatch ], [state, dispatch]);
  const store = { state: memoized[0], dispatch: memoized[1] };

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};