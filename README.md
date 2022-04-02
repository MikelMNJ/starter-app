# About

**View app**: https://starterapp.netlify.app

This project is created with create-react-app and heavily modified with
features that enable you to quickly get up and running with a highly scalable, production-ready, web app.
It is also made specifically for MongoDB and Netlify, with Netlify lambda functions and built on Node 16.x

The app contains the following features to get you started:

**Front-end**:<br />
* Routing.
* Global state management (equal to Redux).
* Front-end middleware/afterware support for global state updates.
* Notification system &mdash; dispatch from front-end to send UI feedback or send from back-end to convey server feedback (see the **Back-end** section for details).
* Style-sheet variable compatibility in JavaScript files.

**Back-end Features**:<br />
* MongoDB connect.
* Express server with payload validation.
* DB interaction with Mongoose.
* Sample userModel schema.
* Sample routes for getting started and testing.
* Auth. middleware for accessing private routes.
* Cors middleware.
* API caching middleware.
* API rate limiting middleware. Defaults to IP address but can be configured for user ID (or both) with the custom keyGenerator() in the limiter.

Feel free to clone, modify and start your own projects with this template.



# Getting up and running

> **NPM users**: You will need to remove *yarn.lock* and *.yarnrc.yml* and change the deploy script in *package.json* from:<br />
> `"deploy": "yarn build && yarn build:server && netlify deploy --prod",`<br />
> to:<br />
> `"deploy": "npm run build && npm run build:server && netlify deploy --prod",`


1. Clone the repo.
2. Add *.env* to the project root with the following variables:
    ```
    REACT_APP_API_V1="/.netlify/functions/server/v1/"
    REACT_APP_MONGO_URI=""
    REACT_APP_JWT_SECRET=""
    REACT_APP_SENTRY_DSN=""
    REACT_APP_EMAIL_API_KEY=""
    REACT_APP_VERIFIED_SENDER_EMAIL=""
    ```

    **Important**: Make sure you have the slash included at the end of the path in *REACT_APP_API_V1*!

3. In terminal, run `cd /path/to/project` then `yarn set version berry` (if not on a modern version of yarn already), followed by `yarn`.
For NPM users, run `npm i` in the project directory.
4. Finally, run `yarn start` and `yarn start:server` or `npm run start` and `npm run start:server`.

> You will need a valid SendGrid API Key and your SendGrid sender address must be verified with them.

See deployment section for additional steps to take before deployment to Netlify.


**Note about deployment services**: This has not been tested with other deployment services, like Heroku etc.  Any changes are likely to be in the
use of a *[service].toml* file, modification of the *start:server*, *build:server* and *deploy* scripts in *package.json*. `REACT_APP_API_V1="/.netlify/functions/server/v1/"`
will need to be updated in *.env*.  Finally, you will likely need to make modifications to how the *functions*
folder is handled by your service.



# Organization

The structure of this template is as follows:
* **functions**: Anything back-end.
* **components**: Reusable components.
* **controllers**: Front-end controllers, i.e. front-end routing.
* **errors**: Errors and debugging.
* **helpers**: Utility related functions.
* **modules**: Anything state related.
* **scenes**: Main route components.
* **theme**: Anything theme related.
* **wares**: Front-end middleware/afterware.
* **static**: Custom SVG, fonts or image files.

**Note**: Absolute pathing for JavaScript module imports has been added in *jsconfig.json*.



# Testing

Tests were set up as part of *create-react-app*.  The script command for testing, and others, can be found
in *package.json*.  It uses *Jest* and only requires the name *[componentName].test.js* &mdash; see *scenes/DeleteMe/DeleteMe.test.js*.



# Routing

Routing is handled with *react-router-dom*.  The *App* is wrapped in `<BrowserRouter />` tags in *index.js* and
*App.js* makes use of the `<Routes />` tag to receive all rendered route components from the `buildRoutes()` function in the routes controller.


### Adding or editing a route
*controllers/routesController.js* defines all routes to be rendered along with
the appropriate component, and whether that route requires authentication.

Routes are public by default.  If a route requires authentication for access, add **authenticate** to the route object: `{ path, element, authenticate: true }`.

```jsx
// controllers/routesController.js
const routes = [
  {
    // Private route example
    path: "/authenticated-route",
    element: <p>Authenticated Content</p>,
    authenticate: true,
  },
];
```

When you pass **authenticate**, the `buildRoutes()` function will require the JSON Web Token as the first argument or access to the route will be denied.
In the event that denial &mdash; due to a missing authToken, or invalid authToken &mdash; occurs, the user will be redirect to "/login" by default.  If your authentication page is not "/login" a second path string can be passed to override the default redirect path: `buildRoutes(authToken, "/your-login-route")`.

See the the full route controller and build function in *controllers/routesController.js*.

> *public/_redirects* forces the server to always return 200, OK so that *react-router-dom* can handle catching any 404 routes.

The relevant routing code has been included in this example and full implementation can be found in *scenes/App/App.js*:
```jsx
// scenes/App/App.js
import makeRoutes from 'controllers/routesController';

const App = props => {
  const renderApp = () => {
    const authToken = null; // Your JWT from state...

    return (
      <Routes>
        {makeRoutes(authToken)}
      </Routes>
    );
  };

  return (
    <div id="app">
      {renderApp()}
    </div>
  );
};
```



# Monitoring

Monitoring is handled with *Sentry* and is set up in *index.js*.  You will need your DSN, provided by Sentry.
Your DSN should be stored as REACT_APP_SENTRY_DSN in *.env*

If you do not wish to use *Sentry*, remove the package along with the import and environment conditional in *index.js*.



# Heartbeat

Should the internet connection fail while the user is using your app, the application will alert the user that the internet connection has failed.
Once the connection is restored, the app will continue rendering normally.  This is handled with a custom `<Heartbeat />` component that wraps the main
app in *index.js*.  It is disabled in development and also takes a `time={}` prop (in seconds) to control the interval it checks the connection in production.



# About Font Awesome
By default, **@fortawesome/fontawesome-free** is used. If this is all you need, then there is nothing further for you to do.

If you have a pro license, you'll need to do the following:
1. `yarn remove @fortawesome/fontawesome-free`.
2. Set a persistent system environment variable called *FONT_AWESOME_AUTH_TOKEN*. You can do this in Terminal by doing the folowing:

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

> **NPM users**: Add `.npmrc` with the following:
> ```
> @fortawesome:registry=https://npm.fontawesome.com/
> //npm.fontawesome.com/:_authToken=[Your-license-token]
> ```



# Default theme

Default styles for common elements, such as forms, links, headers etc. can be found in *theme/common.scss* and *theme/forms.scss*.
*theme/common.scss* also contains class names for quick styling, such as *center*, *inline*, or common colors used in feedback and notifications, like *red*, *green*,
*yellow* or *blue*. Additional colors can be added and exported in *theme/colors.scss*.

## Accessing SASS variables in .js files
This is acheived with `yarn install sass` in *package.json* and **sass-loader: 7.2.0** or higher in *yarn.lock* (*package-lock.json* for npm).
From there, *.scss* files can be used freely throughout the project.  With that set, please take a look at *theme/colors.scss*.
A set of sass variables are defined in this style-sheet and exported using `:export {}`.  *colors.scss* is then called in *index.scss*
using `@import 'theme/colors.scss`, making the scss variables available in *index.scss*.  More importantly, *theme/colors.scss* can now be
imported in any JavaScript file with: `import colors from "theme/colors.scss"`, making color variables accessible with `colors.yourColor`.

In this example, colors are being used, but any style-sheet with any sass variable can be used in this way.



# State Management

State is handled with React's `useContext()` and `useReducer()` hooks.  A custom `useStore()` hook is used to read from *Context* as well.
This has been set up in an similar way to *Redux*.

## About the Reducer
The Reducer takes an initial state object and action.  You can find the `actionCreator()` function, along with
other state helpers and custom hooks (like `useDispatch()` or `useSelector()`) in *helpers/stateHelpers.js*.
The action creator passes an object with `{ type, payload }` to the reducer, where the reducer's *switch* statement
reads the `action.type` and updates state accordingly.

### About StateManager()
I have made a custom class that handles state updates in an immutable manner, see `StateManager()` in *helpers/stateManager/stateManager.js* &mdash;
If you would rather use a library such as *immutableJS* you can swap the state manager out for that. The custom
`StateManager()`, however, may be more friendly. It is intelligent enough to know if the state key being modified is a basic type,
such as a string or number, or more complex, like an Array or Object.  Meaning you **won't** have to call methods such as Immutable's `state.getIn()`, `state.setIn()` etc. to update something like an array.

### Modifying state: basic or complex key values in state
`state.get(STATE_KEY_TO_GET)`: Returns the value from the target key in state.<br />
`state.add(STATE_KEY_TO_ADD, payload)`: Adds a completely new key to state with payload.<br />
`state.update(STATE_KEY_TO_UPDATE, payload)`: Replaces existing state key with payload.<br />
`state.remove(STATE_KEY_TO_REMOVE)`: Removes state key, completely.<br />

### Modifying state: arrays
`state.get(STATE_KEY_TO_GET, index)`: Returns the value of the index from the targeted state key array.<br />
`state.add(STATE_KEY_TO_ADD, payload, index)`: Adds new item to state key array with payload.<br />
`state.update(STATE_KEY_TO_UPDATE, payload, index)`: Updates specific index of state key array with payload.<br />
`state.remove(STATE_KEY_TO_REMOVE, index)`: Removes specific index from state key array.<br />

### Modifying state: objects
`state.get(STATE_KEY_TO_GET, "keyName")`: Returns the value of the key from the targeted state key object.<br />
`state.add(STATE_KEY_TO_ADD, payload, "keyName")`: Adds new key to state key object with payload as value.<br />
`state.update(STATE_KEY_TO_UPDATE, payload, "keyName")`: Updates specific key of state key object with payload as value.<br />
`state.remove(STATE_KEY_TO_REMOVE, "keyName")`: Removes specific key from state key object.<br />

### Modifying multiple state values
There are times where you may need to alter multiple state values at once, this can be done with `state.merge()`, using an array as the only argument that contains any of the above methods.

```jsx
state.merge([
  state.update(STATE_KEY_TO_UPDATE, payload),
  state.remove(STATE_KEY_TO_REMOVE),
  state.add(STATE_KEY_TO_ADD, payload),
]);
```


The following can be found in *modules/appReducer.js*:
```jsx
import StateManager from 'helpers/stateManager/stateManager';
import constants from './appConstants';

const initial = {
  [constants.STATE_KEY_NOTIFICATIONS]: [],
};

const reducer = (initialState = initial, action = {}) => {
  /* eslint-disable-next-line */
  const { meta, payload } = action;
  const state = new StateManager(initialState);

  switch(action.type) {
    case constants.SAMPLE_ACTION:
      return state.update(constants.STATE_KEY_SAMPLE_SELECTOR, payload);
    case constants.ADD_NOTIFICATION:
      return state.add(constants.STATE_KEY_NOTIFICATIONS, payload);
    case constants.REMOVE_NOTIFICATION:
      const index = payload;
      return state.remove(constants.STATE_KEY_NOTIFICATIONS, index);
    case constants.SET_GLOBAL_BANNER_CONTENT:
      return state.add(constants.STATE_KEY_GLOBAL_BANNER_CONTENT, payload);
    case constants.SEND_EMAIL:
      return state.update(constants.STATE_KEY_EMAIL_RESPONSE, payload);
    case constants.SAMPLE_API_CALL:
      return state.update(constants.STATE_KEY_SAMPLE_API_RESPONSE, payload);

    default:
      return initialState;
  }
};

export default reducer;
```

**Note**: It's recommended to create a new folder in *modules* for other sections of your site. These other reducers, actions, selectors etc. will keep things scalable and manageable.
Don't forget to add any new reducers in *store.js* &mdash; they should be added to `const reducers = {}`.



## About Actions and Selectors
Actions and Selectors are defined in objects for their specific module &mdash; the following can be found in *modules/appConstants.js*, *modules/appActions.js* and *modules/appSelectors.js*:
```jsx
// appConstants.js
const constants = {
  // Actions
  SAMPLE_ACTION: "modules/app/SAMPLE_ACTION",
  ADD_NOTIFICATION: "modules/app/ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "modules/app/REMOVE_NOTIFICATION",
  SET_GLOBAL_BANNER: "modules/app/SET_GLOBAL_BANNER",
  SEND_EMAIL: "modules/app/SEND_EMAIL",
  SAMPLE_API_CALL: "modules/app/SAMPLE_API_CALL",

  // Selectors
  STATE_KEY_SAMPLE_SELECTOR: "sampleSelector",
  STATE_KEY_NOTIFICATIONS: "notifications",
  STATE_KEY_GLOBAL_BANNER_CONTENT: "globalBannerContent",
  STATE_KEY_EMAIL_RESPONSE: "emailResponse",
  STATE_KEY_SAMPLE_API_RESPONSE: "sampleAPIResponse",
};

// appActions.js
const appActions = {
  // Simple actions, directly updates the reducer.
  sampleAction: payload => actionCreator(constants.SAMPLE_ACTION, payload),
  addNotification: payload => actionCreator(constants.ADD_NOTIFICATION, payload),
  removeNotification: payload => actionCreator(constants.REMOVE_NOTIFICATION, payload),
  setGlobalBannerContent: payload => actionCreator(constants.SET_GLOBAL_BANNER_CONTENT, payload),

  // API actions go through middleware, then passes the server res.json() back to the reducer, as payload.
  sendEmail: (payload, callback) => {
    const args = { type: constants.SEND_EMAIL, payload,  callback };
    return api.sendEmail(args);
  },
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
  emailResponse: state => state.app[constants.STATE_KEY_EMAIL_RESPONSE],
  sampleAPIResponse: state => state.app[constants.STATE_KEY_SAMPLE_API_RESPONSE],
  globalBannerContent: state => state.app[constants.STATE_KEY_GLOBAL_BANNER_CONTENT],
}
```

**Calling a simple action or reading a state selector from a component**<br />
The process of using an action/selector to update or read from a targeted reducer is identical to *Redux*.
A more complete example can be found in *scenes/DeleteMe/CheckState.js*:
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
      {sampleSelector || "No state key value."}
    </div>
  );
};

export default YourComponent;
```

**Calling an API action**
API actions are called in the same way as above, but can be passed a callback function as the second argument.  This callback function
will be executed after the server responds.

Below is an example of how an API action is called, note the use of the secondary *callback* argument.
A more complete example of this can be found in *scenes/DeleteMe/CheckAPI.js*:
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
  * **onFail**, executes your callback for anything >= 400 response.
  * **onComplete**, executes your callback after call is complete, regardless of response code.
  * **meta**, passes additional data for use in the reducer &mdash; accessible in the reducer with `action.meta`.

```jsx
// modules/app/appApi.js
export const sampleAPICall = args => {
  const { type, callback } = args;

 return {
    type,
    path: "/test",
    method: "GET",
    onSuccess: res => callback(res),
    onFail: res => callback(res),
    onComplete: () => console.log("Call complete."),
    meta: null,
  };
};
```



## About Middleware and Afterware
A middleware function is used to execute something prior to the reducer's state update.  Afterware is much the same, but runs after the state update has occured.
Middleware and afterware can be added to the arrays of the same name in *store.js*, example: `const middlewares = [ apiMiddleware ];`

An example of middleware that this app uses can be found when any API action is called. Please see *wares/apiMiddleware.js* for the full example, including the `apiRelay()` function:
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


## About store.js
Now that the reducer has been explored with constants/actions/selectors defined and used in components, let's take a look at the heart of it all &mdash; the store.

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
import apiMiddleware from 'wares/apiMiddleware';

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



# Adding a Site-Wide Banner Message

A banner alert system is included by default in *scenes/App.js*.  There is nothing you need to do in this file, but here is the relevant setup, for reference:

```jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import appSelectors from 'modules/app/appSelectors';
import Banner from 'components/Banner/Banner';

const App = props => {
  const [ showBanner, setShowBanner ] = useState(true);
  const dispatch = useDispatch();

  // Actions and Selectors
  const globalBannerContent = useSelector(state => appSelectors.globalBannerContent(state));

  return (
    <div id="app">
      {globalBannerContent && showBanner && (
        <Banner center text={globalBannerContent} callback={() => setShowBanner(false)} />
      )}
    </div>
  );
};
```

To have the banner show, you will need to invoke the action from state in your component as follows:
```jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';

const YourComponent = props => {
  const dispatch = useDispatch();

  // Actions/Selectors
  const globalBannerContent = useSelector(state => appSelectors.globalBannerContent(state));
  const setGlobalBannerContent = payload => dispatch(appActions.setGlobalBannerContent(payload));

  useEffect(() => {
    if (!globalBannerContent) {
      setGlobalBannerContent("New site-wide banner alert message!");
    }
  }, [globalBannerContent]);

  return (
    <div>
      Other component content...
    </div>
  );
};
```



# Back-end

The back-end is completely contained within the *functions* folder.  This is the folder Netlify uses to compile it's lambda functions for deployment.

The structure of this folder is as follows:
* **connectDB**: Houses main module for MongoDB initialization.
* **controllers**: All logic for API operations.
* **middleware**: Custom middleware functions.
* **models**: Mongoose schema's for DB collection items.
* **routes**: All route modules that call route controllers.

> **Note**: The main *server.js* file is responsible for initiating the MongoDB connection, establishing global back-end middleware and defining main API routes.
> *connect.DB/db.js* is where your *REACT_APP_MONGO_URI* is used.

If you need to add a new main route, add a new route in the `// Define routes` section, following the same format as the existing base routes.
The following is in *server.js*.
```javascript
const connectDB = require('./connectDB/db');
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();

const { REACT_APP_API_V1: v1 } = process.env;

app.set('trust proxy', 1);

// Connect database
connectDB();

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Define routes
app.use(`${v1}sample`, require('./routes/sampleRoutes'));
app.use(`${v1}email`, require('./routes/emailRoutes'));
app.use(`${v1}auth`, require('./routes/authRoutes'));

app.keepAliveTimeout = 121 * 1000;
app.headersTimeout = 125 * 1000;

module.exports.handler = serverless(app);
```

## About API Versioning
Since the version number is attached to the base path *REACT_APP_API_V1* variable, you have modular control over API versioning, so you don't
break existing API versions still in production.  For new versions, add a new env variable with the new API version in the name and value:
```javascript
REACT_APP_API_V2="/.netlify/functions/server/v2/"
REACT_APP_API_V1="/.netlify/functions/server/v1/"
```

Then import it for use in *server.js*.
```javascript
const {
  REACT_APP_API_V2: v2,
  REACT_APP_API_V1: v1,
} = process.env;

// v2 routes
app.use(`${v2}sample`, require('./routes-v2/sampleRoutes'));
app.use(`${v2}auth`, require('./routes-v2/authRoutes'));

// v1 routes
app.use(`${v1}sample`, require('./routes/sampleRoutes'));
app.use(`${v1}auth`, require('./routes/authRoutes'));
```

## About Routes
> Routes are imported and used on the base endpoints established in *server.js*

Although the main endpoint is defined in *server.js*, each subsequent route path for that endpoint is defined in the routes folder.
If you need more routes, copy the *routes/sampleRoutes.js* file and work from there.  Remember to import this new route module in *server.js*.

The following can be found in *sampleRoutes.js*:
```javascript
const express = require('express');
const router = express.Router();
const limiter = require('../middleware/limitMiddleware');

const {
  getSample,
  postSample,
  putSample,
  deleteSample
} = require('../controllers/sampleController');

// Caching
const apicache = require('apicache');
let cache = apicache.middleware;
const defaultCache = '2 minutes';

// Starter routes
router.route('/')
  .get(limiter(), cache(defaultCache), getSample)
  .post(limiter(), cache(defaultCache), postSample);


router.route('/:id')
  .put(limiter(), cache(defaultCache), putSample)
  .delete(limiter(), cache(defaultCache), deleteSample);

module.exports = router;
```

Express' `router.route()` method is a clean way to consolidate identical route paths for an endpoint. It saves a few lines of code and minimizes any chance
of errors from typing the same route string over and over. As noted in their documentation, middlewares for each route type defined like this should be
placed before the controller function is called, as shown above, **not** where the route is defined.

## About Middleware
> All custom back-end middleware functions should be kept in the *functions/middleware* folder.

Consider the following in *routes/sampleRoutes.js*:
```javascript
// Starter routes
router.route('/')
  .get(limiter(), cache(defaultCache), getSample)
  .post(limiter(), cache(defaultCache), postSample);
```

Instead of defining the middleware for the entire server, as is the case with `app.use(cors())` and others (in *server.js*), we can inject them on a
per route basis for modular control. In the above example, `limiter()` and `cache()` are examples of per-route middleware.  Doing it this way allows for much
finer control over whether you want a route to be exempt from rate limiting, caching or other middleware you may have.  Furthermore, it allows you to customize
the same middlware function, differently, for each individual route &mdash; so rate limits, for example, can be different from one route to another.

### About the limiter() middleware
The default `express-rate-limit` middleware has been expanded in this implementation to be fully customizable.  `limiter()` takes four arguments:
`limiter(maxNumOfReqs, timeInMilliseconds, "Your custom message", "objKeyName")`.  Your custom message will interface with the front-end notification system when a 429 is returned.  If using an object, the front-end notification system will need either a single string (shown previously) or an object with the following keys:
```javascript
const message = {
  message: "My custom message string.",
  icon: "fa-solid fa-check" // Font Awesome icon
  type, // "success", "warning" or "error" Override for notification type on the front end
}
```

There is also a middleware handler within the `limiter()` responsible for returning the 429 status, your message (if provided) and this handler can also
be used for more advanced functionality such as charging user fees prior to cutting them off etc.

> Rate limiting is done by IP address by default, but can be changed in the `keyGenerator` to use user ID.

The following can be found in *middleware/limitMiddleware.js*:
```javascript
const { rateLimit } = require('express-rate-limit');

const limiter = (max, windowMs, message, keyName) => rateLimit({
  max: max || 2,
  windowMs: windowMs || 5000,
  keyGenerator: (req, res) => req.ip,
  handler: (req, res, next) => {
    res.status(429).json({
      [keyName || "error"]: message || "Too many requests.",
    });

    next();
  }
});

module.exports = limiter;
```

### About the auth() middleware
The `auth()` middleware is responsible for validating token data in the request header.  If the token is valid, it runs `next()`, otherwise it stops
access to the private route.  You will need to provide the `x-auth-token` header with the value set to the user's token when accessing a private route.

The following can be found in *middleware/authMiddleware.js*:
```javascript
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { REACT_APP_JWT_SECRET: jwtSecret } = process.env;

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token found.' });
  };

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch(err) {
    res.status(401).json({ error: 'Invalid token.' });
  };
};
```



## About Controllers
> All controllers should be kept in the *controllers* folder and are imported for use in your *routes* file.

Controllers extract all logic from your *routes* file to keep the *routes* file exclusively about routing.

Consider the following controller in *controllers/sampleController.js*:
```javascript
// @access  Public
// @route   GET server/v1/sample
// @desc    API test response endpoint.
const getSample = async (req, res) => {
  try {
    res.status(200).json({ message: message("GET") });
  } catch(error) {
    res.status(500).json({ error });
  }
};
```

A simple function that handles what happens when the *server/v1/sample* endpoint is hit.  It's a good idea to include information about each
controller as shown above.

## About Models
Mongoose is the primary library used for creating back-end models, as well as interacting with your DB.

The following can be found in *models/userModel.js*:
```javascript
const mongoose = require('mongoose');
const moment = require('moment');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

module.exports = User = mongoose.model('user', UserSchema);
```

This example shows a new user schema that includes a unique `email` entry in the database and a `password` entry that will be used to store
hashed password data. `created_at` and `updated_at` are automatically added with the `{ timestamps: true }` object.  You can see how this is called
and used in *controllers/authController.js*



## Email Sending
SendGrid is the service being used to dispatch emails.  You can find the `/email` route and controller in *routes/emailRoutes* and *controllers/emailController.js*.
The incoming payload from the front-end is validated with express-validator, shown here:
```javascript
const checkEmailPayload = [
  check('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email.'),
];
```

> Be sure to provide a valid SendGrid API key for *REACT_APP_SENDGRID_KEY* in *.env*.
> Your **from** key will be the value of *REACT_APP_VERIFIED_SENDER_EMAIL* in *.env*.
> Please make sure your SendGrid send address is verified in the SendGrid dashboard or a 403: Forbidden will be returned.

The main composition and sending continues in the *sendEmail* function.
Here is a cut down version in *controllers/emailController.js* &mdash; see file for full implementation:
```javascript
try {
  if (!apiKey) {
    return res.status(400).json({
      error: 'Email service key not provided.'
    });
  }

  const msg = {
    to: email,
    from: sendAddress,
    subject: "Test email dispatched.",
    text: 'A test email has successfully been dispatched from the Starter App project.',
    html:
      `<strong>
        A test email has successfully been dispatched from the Starter App project.
      </strong>`,
  };

  // await sgMail.send(msg);

  res.json({ result: "Email successfully sent." });
} catch(error) {
  res.status(500).json({ error });
}
```

The `await sgMail.send(msg);` call has been disabled for the live app example.  Be sure to uncomment it when you want actual delivery of the email,
or see SendGrid's documentation for configuring a sandbox environment if that suits your needs.



# Deployment

> **NPM users**: Make sure you've updated your *package.json* scripts to use `npm run ...` instead of `yarn ...`.  Also
> update the *netlify.toml* build command from `command = "yarn build"` to `command = "npm run build"`.

Continuous Integration/Deployment is handled with Netlify.  The script for this can be found in *package.json*
and the command is `yarn deploy`.  You will need to have *netlify-cli* installed:
`yarn add global netlify-cli` or `npm install netlify-cli -g`

Once installed, make sure you are logged in with `netlify login` and perform a link to the netlify site with `netlify link`.
Follow the instructions to link to your site ID.  You can set up web-hooks on Netlify/GitHub for auto deployment
if changes to main have been pushed etc.

**Reminder**: Don't forget to change the publish directory in Netlify's deployment settings to match the *netlify.toml* file ("build").
Also, add your environment variables in Netlify's *Site settings > Build  and deploy > Environment* section:
* REACT_APP_API_V1="/.netlify/functions/server/v1/"
* REACT_APP_SENTRY_DSN
* REACT_APP_MONGO_URI
* REACT_APP_JWT_SECRET
* REACT_APP_EMAIL_API_KEY
* REACT_APP_VERIFIED_SENDER_EMAIL
