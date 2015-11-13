import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Hero from '../components/hero';
import Counter from '../components/counter';
import * as CounterActions from '../actions/counter';

class LandingPage extends Component {

	render() {
    	const { increment, incrementIfOdd, incrementAsync, decrement, counter, user } = this.props;
    	return (
			<div>
				<Hero />
				<Counter increment={increment}
						incrementIfOdd={incrementIfOdd}
						incrementAsync={incrementAsync}
						decrement={decrement}
						user={user}
						counter={counter} />
			</div>
		)
	}
	
}

LandingPage.propTypes = {
	increment: PropTypes.func.isRequired,
	incrementIfOdd: PropTypes.func.isRequired,
	incrementAsync: PropTypes.func.isRequired,
	decrement: PropTypes.func.isRequired,
   	counter: PropTypes.number.isRequired,
   	user: PropTypes.string,
    children: PropTypes.node
};

function mapStateToProps(state) {
  return {
    counter: state.counter,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

