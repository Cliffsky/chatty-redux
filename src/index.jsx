// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
require("../styles/home.scss");

// Render the top-level React component
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

import rootReducer from './reducers/root_reducer.jsx';
import App from './components/App.jsx';

ReactDOM.render(
  <Provider store={createStore(rootReducer, applyMiddleware(socketIoMiddleware))}>
    <App />
  </Provider>,
  document.getElementById('react-root')
);