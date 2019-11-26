import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Sentry from '@sentry/browser';

Sentry.init({ dsn: 'https://83a54c30379246bdb2e9c79a290392a8@sentry.io/1835291' });


ReactDOM.render(<App />, document.getElementById('root'));

