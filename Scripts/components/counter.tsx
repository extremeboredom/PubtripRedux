import * as React from 'react';

class CounterProps {

  increment: () => void;
  incrementIfOdd: () => void;
  incrementAsync: () => void;
  decrement: () => void;
  counter: number;

}

class Counter extends React.Component<CounterProps, any> {
  static propTypes = {
    increment: React.PropTypes.func.isRequired,
    incrementIfOdd: React.PropTypes.func.isRequired,
    incrementAsync: React.PropTypes.func.isRequired,
    decrement: React.PropTypes.func.isRequired,
    counter: React.PropTypes.number.isRequired
  };

  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
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
    );
  }
}

// Counter.propTypes = {
//   increment: React.PropTypes.func.isRequired,
//   incrementIfOdd: React.PropTypes.func.isRequired,
//   incrementAsync: React.PropTypes.func.isRequired,
//   decrement: React.PropTypes.func.isRequired,
//   counter: React.PropTypes.number.isRequired
// };

export default Counter;