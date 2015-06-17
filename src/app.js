import attachFastClick from 'fastclick';
import React from 'react';
import Router from 'react-router';

import Routes from "./routes.js";

attachFastClick(document.body);

Router.run(Routes, (Handler) => {
  React.render(<Handler />, document.body);
});
