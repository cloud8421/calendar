import React from 'react';
import Router from 'react-router';

import Routes from "./routes.js";

Router.run(Routes, (Handler) => {
  React.render(<Handler />, document.getElementById('main'));
});
