import attachFastClick from 'fastclick';
import React from 'react';
import Router from 'react-router';

import Routes from './routes.js';
import Actions from './actions';
import {schedule} from './cron.js';

attachFastClick(document.body);

Router.run(Routes, (Handler) => {
  React.render(<Handler />, document.body);
});

schedule(Actions.getWeather, 1000 * 60 * 5); //refresh every 5 mins;
