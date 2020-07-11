import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/App.js';
// import { Session } from 'meteor/session';
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});