# About

This project is the basis of all of my apps.  It is created with create-react-app and outfitted with
critical features such as: global state management, routing, SCSS and theme exports for dynamic use in JavaScript files etc.

Feel free to clone, modify and start your own projects with this template.

**Note**: This uses a version of yarn greater than v1 -- if you do not have at least yarn 2 installed, you will need to install the latest,
cd to the project directory and run `yarn set version berry` &mdash; then run `yarn`.

See **Default theme styles** section for notes on Font Awesome.



# Organization

The structure of this template is as followed:
* Main route components > *scenes*.
* Anything state and API related > *modules*.
* Utility related functions > *helpers*.
* Errors and debugging > *errors*.
* Anything theme related > *themes*.
* Custom SVG, fonts or image files > *static*.
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
  <Route path="/ready" element={<ReplaceMe testPath="/test" />} />

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

**Note**: Absolute pathing for JavaScript module imports has been added in *jsconfig.json*.



# Monitoring

Monitoring is handled with *Sentry* and is set up in *index.js*.  You will need your DSN, provided by Sentry.
Similar to the Font Awesome section in **Default theme styles**, your DSN should be stored in an environment variable.
If you do not wish to use *Sentry*, remove the package along with the import and environment conditional in *index.js*.



# Default theme styles

Default styles for forms and other common elements such as links, headers etc. can be found in *theme/common.scss* and *theme/forms.scss*.
*theme/common.scss* also contains class names for quick styling, such as *center*, *inline*, or common feedback colors like *red*, *green*,
*yellow* or *blue*. Additional colors can be added in *theme/colors.scss*.

**About Font Awesome**<br />
By default, **@fortawesome/fontawesome-pro** is installed as I use it in every project and have a licence for their pro icon library.  If you also have a pro license,
You will need to set a persistent system environment variable called *FONT_AWESOME_AUTH_TOKEN* before being able to add this via yarn. You can do this on linux by doing the folowing:

```
cd /etc/profile.d
sudo touch font_awesome_auth_token.sh
sudo gedit font_awesome_auth_token.sh

# Add the following in the editor:
# export FONT_AWESOME_AUTH_TOKEN=[Your-license-token]
# Save and exit the editor
# Restart
```

or, if using npm, you can add a `.npmrc` file with the following:
```
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=[Your-license-token]
```

You will also need to update the `.yarnrc.yml` file with the following:

```yml
nodeLinker: node-modules
npmScopes:
  fortawesome:
    npmRegistryServer: "https://npm.fontawesome.com/"
    npmAlwaysAuth: true
    npmAuthToken: ${FONT_AWESOME_AUTH_TOKEN}
```

If you don't have a license, you can ignore the .yml update above and remove the pro package in *package.json*. Instead, install the free version with `yarn add @fortawesome/fontawesome-free`.



# Accessing SCSS variables in .js files

This is acheived with `yarn install sass` in *package.json* and **sass-loader: 7.2.0** or higher in *package-lock.json*.
From there, *.scss* files can be used freely throughout the project.  With that set, please take a look at *theme/colors.scss*.
A set of sass variables are defined in this style-sheet and exported using `:export {}`.  *colors.scss* is then called in *index.scss*
using `@import 'theme/colors.scss`, making the scss variables available in any style-sheet.  More importantly, *theme/colors.scss* can now be
imported in any JavaScript file with: `import colors from "theme/colors.scss"`, making color variables accessible with `colors.yourColor`.

In this example, colors are being used, but any style-sheet with any sass variable can be used in this way.



# State Management

State is handled with React's `useContext()` and `useReducer()` hooks.  A custom `useStore()` hook is used to read from *Context* as well.
This has been set up in an identical way to *Redux*, since Redux, under the hood, uses these as well.

**About the Reducer**<br />
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
Use `state.update(STATE_KEY_TO_UPDATE, "keyName")`.  Passing an object key name, as a string, will replaced that object's key value with the payload.

**Additional Methods**<br />
Similar to the `state.update()` method, there is also `state.remove()`, `state.get()` and `state.add()`.  All of these methods work the
exact same way as `state.update()` when it comes to targeting specific array items, object keys or adding/removing the entire state key altogether.

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
A more complete example can be found in *components/ReplaceMe/CheckState.js*:
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
* Memoize the array to prevent every subscribed component from updating if it's "slice" hasn't been updated.
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



# Deployment

Continuous Integration/Deployment is handled with Netlify.  The script for this can be found in *package.json*
and the command is `yarn deploy`.  You will need to have netlify-cli installed:
`yarn add global netlify-cli` or `npm install netlify-cli -g`

Once installed, make sure you are logged in with `netlify login` and perform a link to the netlify site with `netlify link`.
Follow the instructions to link to your site ID.  You can set up web-hooks on Netlify/GitHub for auto deployment
if changes to main have been pushed etc.

**Reminder**: Don't forget to change the publish directory in Netlify's deployment settings to match the *netlify.toml* file ("build").
Also, add your environment variables from *.env.development.local* and system in Netlify's Environment section in site settings:
* FONT_AWESOME_AUTH_TOKEN
* REACT_APP_SENTRY_DSN
* REACT_APP_MONGO_URI
* REACT_APP_JWT_SECRET
