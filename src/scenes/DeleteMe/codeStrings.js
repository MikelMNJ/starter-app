import React, { Fragment } from 'react';

export const globalMessage = "502 Details: There is an issue with Node 16 and AWS Lambda. Fix coming soon, try refreshing the page.";

export const cleanConstants = `const appConstants = {
  TEST_RATE_LIMIT: "modules/app/TEST_RATE_LIMIT",
};`;

export const cleanActions = `const appActions = {
  testRateLimit: (payload, callback) => {
    const args = { type: constants.TEST_RATE_LIMIT, payload, callback };
    return api.testRateLimit(args);
  },
};`;

export const cleanAppAPI = `export const testRateLimit = args => {
  const { type, callback } = args;

  return {
    type,
    path: "/sample/limitTest",
    method: "GET",
    onSuccess: res => callback && callback(res),
    onFail: res => callback && callback(res),
  };
};`

export const cleanSampleRoutes = `const customMessage = message => ({ message, type: "success" });

// Remove "getLimitTest" from require module.

router.route('/limitTest')
  .get(limiter(1, 5000, customMessage("Rate limit tested!")), getLimitTest);`;

export const cleanSampleController = `// @access  Public
// @route   GET server/v1/sample/limitTest
// @desc    API test endpoint for rate limiter.
const getLimitTest = async (req, res) => {
  try {
    res.status(200).json({ result: "Rate call complete." });
  } catch(error) {
    res.status(500).send("Server error.");
  }
};`;

export const authAndRedirects = `const routes = [
  {
    path: "/",
    element: <Navigate to="/ready" />,
  },
  {
    path: "/ready",
    element: <DeleteMe />,
  },
  {
    path: "/authenticated-route",
    element: <p>Authenticated Content</p>,
    authenticate: true,
  },
];`;

export const updatePublic = `index.html (title and other relevant changes).
logo192.png
logo512.png
favicon.ico
manifest.json (as needed)`;

export const documentation = (
  <Fragment>
    <a
      target="_blank"
      rel="noreferrer"
      href="https://github.com/MikelMNJ/starter-app"
    >
      documentation
    </a>
  </Fragment>
);