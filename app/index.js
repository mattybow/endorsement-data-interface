import React, { Component } from 'react';
import FastClick from 'fastclick';
import { render } from 'react-dom';
import Root from './components/root.js';
window.addEventListener('load', () => {
  FastClick.attach(document.body);
});
render(<Root />, document.getElementById('root'));
