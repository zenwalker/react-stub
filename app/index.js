import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import HelloWorld from './components/HelloWorld';

class App extends Component {
  render() {
    return <HelloWorld />;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
