import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/HelloWorld';

const App = React.createClass({
  render() {
    return <HelloWorld />;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
