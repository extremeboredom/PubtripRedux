import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Hero from '../components/hero';
import Counter from '../components/counter';
import * as CounterActions from '../actions/counter';

class App extends Component {
  
  
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
  
}

App.propTypes = {
    children: PropTypes.node
}

export default connect()(App);

