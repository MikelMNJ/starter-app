# About

This project is created with create-react-app and heavily modified with
features that enable you to quickly get up and running with a highly scalable, production-ready, web app.
It is also made specifically for MongoDB and Netlify with Netlify lambda functions.  The app contains the following
features to get you started:

**Front-end**:<br />
* Routing.
* Global state management (equal to Redux).
* Front-end middleware/afterware support for global state updates.
* Notification system.
* Style-sheet variable compatibility in JavaScript files.

**Back-end Features**:<br />
* MongoDB compatible connection.
* Express server with express-validator for payload validation.
* Sample Mongoose user model schema.
* Back-end middleware for route authentication checks.
* Sample /auth and /test routes for API testing.

The following back-end features are coming:<br />
* Authentication.
* Email dispatching.
* API rate limiting.
* Cors configuration.

Feel free to clone, modify and start your own projects with this template.



# Getting up and running

**Note to NPM users**: You will need to remove *yarn.lock* and *.yarnrc.yml* and change the deploy script in *package.json* from:<br />
`"deploy": "yarn build && yarn build:server && netlify deploy --prod",`<br />
to:<br />
`"deploy": "npm run build && npm run build:server && netlify deploy --prod",`

1. Clone the repo.
2. Add *.env.development.local* to the project root with the following variables:
    ```
    REACT_APP_API_BASE_PATH="/.netlify/functions/server"
    REACT_APP_MONGO_URI=""
    REACT_APP_JWT_SECRET=""
    REACT_APP_SENTRY_DSN=""
    ```
3. In terminal, run `cd /path/to/project` then `yarn set version berry` (if not on a modern version of yarn already), followed by `yarn`.
For NPM users, run `npm i` in the project directory.
4. Finally, run `yarn start` and `yarn start:server` or `npm run start` and `npm run start:server`.

See deployment section for additional steps to take before deployment to Netlify.


**Note about deployment services**: This has not been tested with other deployment services, like Heroku etc.  Any changes are likely to be in the
use of a *[service].toml* file, modification of the *start:server*, *build:server* and *deploy* scripts in *package.json*.
There will likely need to be modifications to how the *functions* folder is handled by your service.



# Organization

The structure of this template is as follows:
* Anything back-end > *functions*.
* Reusable components > *components*.
* Errors and debugging > *errors*.
* Utility related functions > *helpers*.
* Front-end middleware/afterware > *middleware*.
* Anything state related > *modules*.
* Main route components > *scenes*.
* Anything theme related > *theme*.
* Custom SVG, fonts or image files > *static*.

**Note**: Absolute pathing for JavaScript module imports has been added in *jsconfig.json*.



# Testing

Tests were set up as part of *create-react-app*.  The script command for testing, and others, can be found
in *package.json*.  It uses *Jest* and only requires the name *[componentName].test.js* &mdash; see *scenes/App/App.test.js*.



# Routing

Routing is handled with *react-router-dom*.  The *App* is wrapped in `<BrowserRouter />` tags in *index.js*, and
*App.js* makes use of the `<Routes />` and `<Route />` tags for rendering the appropriate component
for the specified path.  *public/_redirects* forces the server to always return 200, OK so that
*react-router-dom* can handle catching any 404 routes.

Routes that should only be accessible when authenticated are wrapped in an additional `<Route />` tag, using a custom component.
The custom component checks an *auth* prop and redirects the user to "/login", if *auth* is false.  If *auth* is true, it renders the child `<Route />` and component.

The following can be found in *scenes/App/App.js*:
```jsx
 <Routes>
  <Route path="*" element={<NotFound />} />
  <Route path="/login" element={<p>Log in</p>} />
  <Route path="/ready" element={<DeleteMe />} />

  {/* Authenticated route example */}
  <Route element={<AuthRoute auth={tokenFromState} />}>
    <Route
      path="/authenticated-route"
      element={<p>Authenticated Content</p>}
    />
  </Route>

  {/* Redirect example */}
  <Route path="/" element={<Navigate to="/ready" />} />
</Routes>
```



# Monitoring

Monitoring is handled with *Sentry* and is set up in *index.js*.  You will need your DSN, provided by Sentry.
Your DSN should be stored in REACT_APP_SENTRY_DSN in *.env.development.local* &mdash; emphasis on ".local", this file is ignored at build time and not added to your repo.
Do **not** add this, or any other sensitive secret/key, to the normal *.env*, *.env.production* or *.env.development* files! Those are either added to repo's for teams or used at build time.

It is recommended to directly add sensitive environment variables directly in Netlify for production or via a carefully managed *netlify.toml* environments configuration.
See Deployment section for more info regarding production environment variables.

If you do not wish to use *Sentry*, remove the package along with the import and environment conditional in *index.js*.



# About Font Awesome
By default, **@fortawesome/fontawesome-free** is used. If this is all you need, then there is nothing further for you to do.

If you have a pro license, you'll need to do the following:
1. `yarn remove @fortawesome/fontawesome-free`.
2. Set a persistent system environment variable called *FONT_AWESOME_AUTH_TOKEN*. You can do this on linux by doing the folowing:

```
cd /etc/profile.d
sudo touch font_awesome_auth_token.sh
sudo gedit font_awesome_auth_token.sh

# Add the following in the editor:
# export FONT_AWESOME_AUTH_TOKEN=[Your-license-token]
# Save and exit the editor
# Restart
```

3. `yarn add @fortawesome/fontawesome-pro`
4. Change the import in *index.js* to `import '@fortawesome/fontawesome-pro/css/all.css';`

As a quick mention, the `.yarnrc.yml` file is already configured for pro licenses and responsible for pointing to the registry server so you don't get a package not found error:
```yml
nodeLinker: node-modules
npmScopes:
  fortawesome:
    npmRegistryServer: "https://npm.fontawesome.com/"
    npmAlwaysAuth: true
    npmAuthToken: ${FONT_AWESOME_AUTH_TOKEN}
```

**Note**: NPM users can add a `.npmrc` file with the following:
```
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=[Your-license-token]
```



# Default theme

Default styles for common elements, such as forms, links, headers etc. can be found in *theme/common.scss* and *theme/forms.scss*.
*theme/common.scss* also contains class names for quick styling, such as *center*, *inline*, or common colors used in feedback and notifications, like *red*, *green*,
*yellow* or *blue*. Additional colors can be added and exported in *theme/colors.scss*.

## Accessing SCSS variables in .js files
This is acheived with `yarn install sass` in *package.json* and **sass-loader: 7.2.0** or higher in *yarn.lock* (*package-lock.json* for npm).
From there, *.scss* files can be used freely throughout the project.  With that set, please take a look at *theme/colors.scss*.
A set of sass variables are defined in this style-sheet and exported using `:export {}`.  *colors.scss* is then called in *index.scss*
using `@import 'theme/colors.scss`, making the scss variables available in *index.scss*.  More importantly, *theme/colors.scss* can now be
imported in any JavaScript file with: `import colors from "theme/colors.scss"`, making color variables accessible with `colors.yourColor`.

In this example, colors are being used, but any style-sheet with any sass variable can be used in this way.



# State Management

State is handled with React's `useContext()` and `useReducer()` hooks.  A custom `useStore()` hook is used to read from *Context* as well.
This has been set up in an identical way to *Redux*, since Redux, under the hood, uses these as well.

## About the Reducer
The Reducer takes an initial state object and action.  You can find the `actionCreator()` function, along with
other state helpers and custom hooks (like `useDispatch()` or `useSelector()`) in *helpers/stateHelpers.js*.
The action creator passes an object with `{ type, payload }` to the reducer, where the reducer's *switch* statement
reads the `action.type` and updates state accordingly.

**About StateManager()**<br />
I have made a custom class that handles state updates in an immutable manner, see `StateManager()` in *helpers/stateHelpers.js* &mdash;
If you would rather use a library such as *immutableJS* you can swap the state manager out for that. The custom
`StateManager()`, however, may be more friendly and should provide everything you need. It is aware of the payload and sets it automatically &mdash; no need to
specifically set `action.payload` with each case.  It is also intelligent enough to know if the state key in question is a basic type,
such as a string or number, or more complex, like an Array or Object.  Meaning, you **won't** have to call several methods such as
`state.getIn()`, `state.setIn()`, `state.merge()`, `state.set()` etc. to update something like an array in your state.

**Updating basic or complex key values in state**<br />
Use `state.update(STATE_KEY_TO_UPDATE)`.  It will replace the entire state key value with the payload.

**Updating arrays**<br />
Use `state.update(STATE_KEY_TO_UPDATE, index)`.  Passing an index, as a number, will replace that array item with the payload.

**Updating objects**<br />
Use `state.update(STATE_KEY_TO_UPDATE, "keyName")`.  Passing an object key name, as a string, will replace that object's key value with the payload.

**Additional Methods**<br />
Similar to the `state.update()` method, there is also `state.remove()`, `state.get()` and `state.add()`.  All of these methods work the
exact same way as `state.update()` when it comes to targeting specific array items, object keys or adding/removing the entire state key altogether.

The following can be found in *modules/appReducer.js*:
```jsx
import StateManager from 'helpers/stateHelpers';
import constants from './appConstants';

const initial = {
  [constants.STATE_KEY_NOTIFICATIONS]: [],
};

const reducer = (initialState = initial, action = {}) => {
  const state = new StateManager(initialState, action);

  switch(action.type) {
    case constants.SAMPLE_ACTION:
      return state.update(constants.STATE_KEY_SAMPLE_SELECTOR);
    case constants.UPDATE_NOTIFICATIONS:
      return state.update(constants.STATE_KEY_NOTIFICATIONS);
    case constants.SAMPLE_API_CALL:
      return state.update(constants.STATE_KEY_SAMPLE_API_RESPONSE);

    default:
      return initialState;
  }
};

export default reducer;
```

**Note**: It's recommended to create a new folder in *modules* for any other reducers, actions, selectors etc. you wish to have.
Don't forget to add any new reducers in *store.js* &mdash; they should be added to `const reducers = {}`.

## About Middleware and Afterware
A middleware function is used to execute something prior to the reducer's state update.  Afterware is much the same, but runs after the state update has occured.
Middleware and afterware can be added to the arrays of the same name in *store.js*, example: `const middlewares = [ apiMiddleware ];`

An example of middleware that this app uses can be found when any API action is called. Please see *middleware/api.js* for the full example, including the `apiRelay()` function:
```jsx
const apiMiddleware = (dispatch, action) => {
  const isAPIRequest = action.path || action.method;

  if (isAPIRequest) {
    apiRelay({ ...action, dispatch });
    return;
  }

  dispatch(action);
};
```

A modified version of `useReducer()` is being used to handle the injection of these wares and can be found in *helpers/stateHelpers.js*:
```jsx
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
```

Please see the **About store.js** section to see this implemented.



## About Actions and Selectors
Actions and Selectors are defined in objects for their specific module &mdash; the following can be found in *modules/appConstants.js*, *modules/appActions.js* and *modules/appSelectors.js*:
```jsx
// appConstants.js
const constants = {
  SAMPLE_ACTION: "modules/app/SAMPLE_ACTION",
  UPDATE_NOTIFICATIONS: "modules/app/UPDATE_NOTIFICATIONS",
  SAMPLE_API_CALL: "modules/app/SAMPLE_API_CALL",

  STATE_KEY_SAMPLE_SELECTOR: "sampleSelector",
  STATE_KEY_NOTIFICATIONS: "notifications",
  STATE_KEY_SAMPLE_API_RESPONSE: "sampleAPIResponse"
};

// appActions.js
const appActions = {
  // Simple actions, directly updates the reducer.
  sampleAction: payload => actionCreator(constants.SAMPLE_ACTION, payload),
  updateNotifications: payload => actionCreator(constants.UPDATE_NOTIFICATIONS, payload),

  // API actions go through middleware, then passes the server res.json() back to the reducer, as payload.
  sampleAPICall: (payload, callback) => {
    const args = { type: constants.SAMPLE_API_CALL, payload,  callback };
    return api.sampleAPICall(args);
  },
};

// appSelectors.js
const appSelectors = {
  // state.app with "app" being the reducer's imported name in store.js
  // This will need to be changed according to the reducer you are working with/targeting.
  sampleSelector: state => state.app[constants.STATE_KEY_SAMPLE_SELECTOR],
  notifications: state => state.app[constants.STATE_KEY_NOTIFICATIONS],
  sampleAPIResponse: state => state.app[constants.STATE_KEY_SAMPLE_API_RESPONSE],
}
```

**Calling a simple action or reading a state selector from a component**<br />
The process of using an action/selector to update or read from a targeted reducer is identical to *Redux*.
A more complete example can be found in *components/DeleteMe/CheckState.js*:
```jsx
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';

const YourComponent = props => {
  // Sample actions/selectors from global state...
  const dispatch = useDispatch();
  const sampleAction = useCallback(payload => dispatch(appActions?.sampleAction(payload)), [dispatch]);
  const sampleSelector = useSelector(state => appSelectors?.sampleSelector(state));

  useEffect(() => {
    if (!sampleSelector) {
      sampleAction("New value from global state!");
    }
  }, [sampleSelector, sampleAction]);

  return (
    <div>
      {sampleSelector || "Store empty."}
    </div>
  );
};

export default YourComponent;
```

**Calling an API action**
API actions are called in the same way as above, but can be passed a callback function as the second argument.  This callback function
will be executed after the server responds.

Below is an example of how an API action is called, note the use of the secondary *callback* argument.
A more complete exmple of this can be found in *components/DeleteMe/CheckAPI.js*:
```jsx
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';

const YourComponent = props => {
  const dispatch = useDispatch();

  // Actions/Selectors
  const sampleAPIResponse = useSelector(state => appSelectors.sampleAPIResponse(state));
  const sampleAPICall = useCallback((payload, callback) => (
    dispatch(appActions.sampleAPICall(payload, callback))
  ), [dispatch]);

  useEffect(() => {
    if (!sampleAPIResponse) {
      const payload = { myKey: "I'm sending this to the server." };
      const callback = res => console.log("I'm running this on 200, OK!", res);

      sampleAPICall(payload, callback);
    }
  }, [sampleAPIResponse]);

  return null;
};

export default YourComponent;
```

The difference between a simple action call is that there is an additional *modules/app/appApi.js* file, imported as *api* in *modules/app/appActions.js*,
that describes everything the middleware needs to make the call.  Anything you would normally write to make an API call is valid in this object: `headers: {}`,
`body: JSON.stringify(payload)` etc.

There are extra keys the middleware will use that you should be aware of:
  * **type**, this is the `action.type` dispatch will need.
  * **onSuccess**, executes your callback only after 200 response.
  * **onFail**, executes your callback for anything **not** a 200 response.
  * **onComplete**, executes your callback after call is complete, regardless of response code.
  * **meta**, passes additional data for use in the reducer &mdash; accessible in the reducer with `action.meta`.

```jsx
export const sampleAPICall = args => {
  const { type, payload, callback } = args;

 return {
    type,
    path: "/test",
    method: "GET",
    onSuccess: res => callback(res),
  };
};
```


## About store.js
Now that you are very familiar with how the reducer works, how to define constants/actions/selectors, and how to dispatch
actions and read state selector values from components, let's take a look at the heart of it &mdash; the store.

In a nutshell:
* Create state by creating *Context* for our app.
* Set up the ability to use that context with a *useStore* variable.
* Create `useSelector()` and `useDispatch()` hooks found in *helpers/stateHelpers.js* with *useStore*.
* Import all reducers from the *modules* folder and store in the `reducers = {}` object &mdash; think of this as an object containing all our modules.
* Loop through all reducers asking for their initial state object.
* Loop through all reducers and combine them, as functions, letting each manage their own "slice" of state.
* Add any middelware/afterware to appropriate arrays.
* Call modified `useReducerWithWares()` to get the complete state object, execute wares as well as get the dispatch function.
* Memoize the array to prevent every subscribed component from updating if it's "slice" hasn't been updated.
* Pass the final `{ state, dispatch }` object to the `<AppContext.Provider />`.
* Wrap `<App />` in *index.js* with `<AppProvider />`

And that completes the Redux-like global state management flow!

The following can be found in *store.js*:
```jsx
import React, { createContext, useContext, useMemo } from 'react';
import { makeInitialState, combineReducers, useReducerWithWares } from 'helpers/stateHelpers';
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
  const [ state, dispatch ] = useReducerWithWares(reducerArgs);
  const memoized = useMemo(() => [ state, dispatch ], [state, dispatch]);
  const store = { state: memoized[0], dispatch: memoized[1] };

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};
```



# Deployment

Continuous Integration/Deployment is handled with Netlify.  The script for this can be found in *package.json*
and the command is `yarn deploy`.  You will need to have *netlify-cli* installed:
`yarn add global netlify-cli` or `npm install netlify-cli -g`

**Note for NPM users**: Make sure you've updated your *package.json* scripts to use `npm run ...` instead of `yarn ...`

Once installed, make sure you are logged in with `netlify login` and perform a link to the netlify site with `netlify link`.
Follow the instructions to link to your site ID.  You can set up web-hooks on Netlify/GitHub for auto deployment
if changes to main have been pushed etc.

**Reminder**: Don't forget to change the publish directory in Netlify's deployment settings to match the *netlify.toml* file ("build").
Also, add your environment variables in Netlify's *Site settings > Build  and deploy > Environment* section:
* REACT_APP_SENTRY_DSN
* REACT_APP_MONGO_URI
* REACT_APP_JWT_SECRET

No need to include *REACT_APP_API_BASE_URL* for production.
