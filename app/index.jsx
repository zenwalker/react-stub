import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import Counter from './components/Counter';

class App extends Component {
  render() {
    return <Counter />;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
