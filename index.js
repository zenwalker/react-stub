import React from 'react';

var App = React.createClass({
  render() {
    return <h1>It works!</h1>;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  React.render(<App />, document.body);
});
