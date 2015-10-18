import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CreateTrip extends Component {

	render() {
		return (
			<div>
				<p>Hello from the Create Trip Container!</p>
				{ this.props.children }
			</div>
		);
	}

}

CreateTrip.propTypes = {
	children: PropTypes.node
}

function mapStateToProps(state) {
	return {
	};
}

//function mapDispatchToProps(dispatch) {
//	return bindActionCreators( dispatch);
//}

export default connect(mapStateToProps)(CreateTrip);