import React from 'react';

class Counter extends React.Component {

  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter, user } = this.props;
    return (
      <div>
        <p>Hello, {user}</p>
      <p>
        Clicked: {counter} times
        {' '}
        <button onClick={increment}>+</button>
        {' '}
        <button onClick={decrement}>-</button>
        {' '}
        <button onClick={incrementIfOdd}>Increment if odd</button>
        {' '}
        <button onClick={() => incrementAsync() }>Increment async</button>
        </p>
        </div>
    );
  }
}

Counter.propTypes = {
   increment: React.PropTypes.func.isRequired,
   incrementIfOdd: React.PropTypes.func.isRequired,
   incrementAsync: React.PropTypes.func.isRequired,
   decrement: React.PropTypes.func.isRequired,
   counter: React.PropTypes.number.isRequired,
   user: React.PropTypes.string
 };

export default Counter;