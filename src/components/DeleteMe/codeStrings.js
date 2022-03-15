import React, { Fragment } from 'react';

export const removeFromApp = `import DeleteMe from 'components/DeleteMe/DeleteMe';
<Route path="/ready" element={<DeleteMe />} />`;

export const authAndRedirects = `{/* Authenticated route example */}
<Route element={<AuthRoute auth={tokenFromState} />}>
  <Route
    path="/authenticated-route"
    element={<p>Authenticated Content</p>}
  />
</Route>

{/* Redirect example */}
<Route path="/" element={<Navigate to="/ready" />} />`;

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
      href="https://github.com/MikelMNJ/app-template"
    >
      Documentation
    </a>
  </Fragment>
);