import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import '../styles/counter.styl';

@autobind
class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: Number(localStorage.getItem('counter.value')) || 0,
    };
  }

  increment() {
    const value = this.state.value + 1;
    this.setState({ value: value  });
    localStorage.setItem('counter.value', value);
  }

  decrement() {
    const value = this.state.value - 1;
    this.setState({ value: value });
    localStorage.setItem('counter.value', value);
  }

  render() {
    const { value } = this.state;

    return (
      <div className="counter">
        <button className="counter_btn" onClick={this.decrement}>-</button>
        <span className="counter_value">{value}</span>
        <button className="counter_btn" onClick={this.increment}>+</button>
      </div>
    );
  }
}

export default HelloWorld;
