import React from 'react';
import HelloWorld from './components/HelloWorld';

const App = React.createClass({
  render() {
    return <HelloWorld />;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  React.render(<App />, document.body);
});
