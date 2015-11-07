import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TripBuilder from '../components/TripBuilder';
import { loadPubs, createTrip } from '../actions';

function loadData(props) {
	props.loadPubs();
}

class CreateTrip extends Component {

	componentWillMount() {
		loadData(this.props);
	}

	render() {
		const { pubs, pubsPage, savingTrip } = this.props;
	
		return (
			<div>
				<p>Hello from the Create Trip Container!</p>
				<TripBuilder pubs={ pubsPage.map(p => pubs[p]) }
							 onCreate={this.props.createTrip}
							 savePending={savingTrip} />
				{ this.props.children }
			</div>
		);
	}

}

CreateTrip.propTypes = {
	pubsPage: PropTypes.array.isRequired,
	pubs: PropTypes.object.isRequired,
	savingTrip: PropTypes.bool.isRequired,
	children: PropTypes.node,
	loadPubs: PropTypes.func.isRequired,
	createTrip: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { entities: { pubs } } = state;
	const { pages: { pubsPage } } = state;
	const savingTrip = state.saving.trip;

	return {
		pubsPage,
		pubs,
		savingTrip
	}
}

export default connect(mapStateToProps, { loadPubs, createTrip } )(CreateTrip);