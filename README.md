# About

This project is the basis of all of my apps.  It is created with create-react-app and outfitted with
critical features such as: global state management, routing, SCSS and theme exports for dynamic use in JavaScript files etc.

Feel free to clone, modify and start your own projects with this template.



# Organization

The structure of this template is as followed:
* Main route components > *scenes*.
* Anything state and API related > *modules*.
* Utility related functions > *helpers*.
* Errors and debugging > *errors*.
* Anything static, image or theme related > *themes*.
* Reusable components > *components*.



# Testing

Tests were set up as part of *create-react-app*.  The script command for testing, and others, can be found
in *package.json*.  It uses *Jest* and only requires the name *[componentName].test.js* &mdash; see *scenes/App/App.test.js*.



# Routing

Routing is handled with *react-router-dom*.  The *App* is wrapped in `<BrowserRouter />` tags in *index.js*, and
*App.js* makes use of the `<Routes />` and `<Route />` tags for rendering the appropriate component
for the specified path.  *public/_redirects* forces the server to always return 200, OK so that
*react-router-dom* can handle catching any 404 routes.

As per *react-router-dom*'s instructions, routes that should only be accessible when authenticated are wrapped
in an additional `<Route />` tag using a custom component that checks an *auth* prop and redirects the
user to "/login", if *auth* is falsey.  If *auth* is truthy, it renders the child `<Route />` and component.

The following can be found in *scenes/App/App.js*:
```jsx
<Routes>
  <Route path="*" element={<NotFound />} />
  <Route path="/login" element={<p>Log in</p>} />
  <Route element={<AuthRoute auth={hasToken} />}>
    <Route path={'/'} element={<Component />} />
  </Route>
</Routes>
```

**Note**: Absolute pathing for JavaScript module imports has been added in *jsconfig.json*



# State Management

State is handled with React's *Context* `useContext()` and `useReducer()` hooks.  A custom `useStore()` hook is used to read from *Context* as well.
This has been set up in an identical way to *Redux*, since Redux, under the hood, uses these as well.

**About the Reducer**<br />
The Reducer takes an initial state object and action.  You can find the `actionCreator()` function, along with
other state helpers and custom hooks (like `useDispatch()` or `useSelector()`) in *helpers/stateHelpers.js*.
The action creator passes an object with `{ type, payload }` to the reducer, where the reducer's *switch* statement
reads the `action.type` and updates state accordingly.

**About StateManager()**<br />
I have made a custom class that handles state updates in an immutable manner, see `StateManager()` in *helpers/stateHelpers.js*
If you would rather use a library such as *immutableJS* you can swap the state manager out for that. The custom
`StateManager()`, however, may be more friendly and should provide everything you need. It is aware of, and sets the payload, so no need to
specifically set `action.payload` with each case.  It is also intelligent enough to know if the state key in question is a basic type,
such as a string or number, or more complex, like an Array or Object.  Meaning, you **won't** have to call several methods such as
`state.getIn()`, `state.setIn()`, `state.merge()`, `state.set()` etc. to update something like an array in your state.

**Updating basic or complex key values in state**<br />
Use `state.update(STATE_KEY_TO_UPDATE)`.  It will replace the entire state key value with the payload.

**Updating arrays**<br />
Use `state.update(STATE_KEY_TO_UPDATE, index)`.  Passing an index, as a number, will replace that array item with the payload.

**Updating objects**<br />
Use `state.update(STATE_KEY_TO_UPDATE, "keyName")`.  Passing an object key name, as a string, will replaced that object's key value with the payload.

**Additional Methods**<br />
Similar to the `state.update()` method, there is also `state.remove()`, `state.get()` and `state.add()`.  All of these methods work the
exact same way as `state.update()` when it comes to targetting specific array items, object keys or adding/removing the entire state key altogether.

The following can be found in *modules/appReducer.js*:
```jsx
import StateManager from 'helpers/stateHelpers';
import constants from './appConstants';

const reducer = (initialState = {}, action = {}) => {
  const state = new StateManager(initialState, action);

  switch(action.type) {
    case constants.SAMPLE_ACTION:
      return state.update(constants.STATE_KEY_SAMPLE_SELECTOR);

    default:
      return initialState;
  }
};

export default reducer;
```

**Note**: It's recommended to create a new folder in *modules* for any other reducers, actions, selectors etc. you wish to have.
Don't forget to add any new reducers in the *store.js* `const reducers = {}` object.

**About Actions and Selectors**<br />
Actions and Selectors are defined in objects for their specific module &mdash; the following can be found in *modules/appConstants.js*, *modules/appActions.js* and *modules/appSelectors.js*:
```jsx
// appConstants.js
const constants = {
  SAMPLE_ACTION: "modules/app/SAMPLE_ACTION",
  STATE_KEY_SAMPLE_SELECTOR: "sampleSelector",
};

// appActions.js
const appActions = {
  sampleAction: payload => actionCreator(constants.SAMPLE_ACTION, payload),
};

// appSelectors.js
const appSelectors = {
  // state.app with "app" being the reducer's imported name in store.js
  sampleSelector: state => state.app[constants.STATE_KEY_SAMPLE_SELECTOR],
}
```

**Calling an action or reading a state selector from a component**<br />
The process of using an action/selector to update or read from a targeted reducer is identical to *Redux*.
A more complete example can be found in *components/Component/Component.js*:
```jsx
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';

const Component = props => {
  // Sample actions/selectors from global state...
  const dispatch = useDispatch();
  const sampleAction = useCallback(payload => dispatch(appActions?.sampleAction(payload)), [dispatch]);
  const sampleSelector = useSelector(state => appSelectors?.sampleSelector(state));

  useEffect(() => {
    if (!sampleSelector) {
      sampleAction("Sample value!");
    }
  }, [sampleSelector, sampleAction]);

  return (
    <div>
      {sampleSelector || "Store empty."}
    </div>
  );
};

export default Component;
```

**About store.js**<br />
Now that we are very familiar with how the reducer works, how to define constants/actions/selectors, and how to dispatch
actions and read state selector values from components, we can take a look at the heart of it &mdash; the store.

In a nutshell:
* Create state by creating *Context* for our app.
* Set up the ability to use that context with a *useStore* variable.
* Create `useSelector()` and `useDispatch()` hooks found in *helpers/stateHelpers.js* with *useStore*.
* Import all reducers from the *modules* folder and store in the `reducers = {}` object &mdash; think of this as an object containing all our modules.
* Loop through all reducers asking for their initial state object.
* Loop through all reducers and combine them, as functions, letting each manage their own "slice" of state.
* Call `useReducer()` to get the complete state object as well as the dispatch function.
* Memoize the array to prevent every subscribed component from updating if it's "slice" hasn't been touched.
* Pass the final `{ state, dispatch }` object to the `<AppContext.Provider />`.
* Wrap `<App />` in *index.js* with `<AppProvider />`

And that completes the Redux-like global state management flow!

The following can be found in *store.js*:
```jsx
import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { makeInitialState, combineReducers } from 'helpers/stateHelpers';
import app from 'modules/app/appReducer';

export const AppContext = createContext();
AppContext.displayName = "AppContext";

export const useStore = () => useContext(AppContext);

const reducers = {
  app,
};

const initialState = makeInitialState(reducers);
const rootReducer = combineReducers(reducers);

// How to use: wrap <App /> in index.js with <AppProvider />
// See 'modules' for reducer and associated state actions/selectors.
// See 'helpers/stateHelpers' for custom hooks, action creator and StateManager methods.

export const AppProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(rootReducer, initialState);
  const memoized = useMemo(() => [ state, dispatch ], [state]);
  const store = { state: memoized[0], dispatch: memoized[1] };

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};
```