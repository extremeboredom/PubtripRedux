import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadTrip } from '../actions';
import Table from '../components/Table';
import moment from 'moment-timezone';

function loadData(props) {
	const { tripId } = props;
	
	props.loadTrip(tripId);
}

class TripPage extends Component {
	
	componentWillMount() {
		loadData(this.props);
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.tripId !== this.props.tripId) {
			loadData(nextProps);
		}
	}

	render() {
		const { trip, pub } = this.props;
		
		if (!trip || !pub) {
			return (<h1><i>Loading Trip details...</i></h1>);
		}
		
		const date = moment(trip.date);
	
		return (
			<div>
				<h1>{trip.name}</h1>
				<h3>{`${date.calendar()} at ${pub.name}`}</h3>
			</div>
		);
	}

}

TripPage.propTypes = {
	tripId: PropTypes.string.isRequired,
	trip: PropTypes.object,
	loadTrip: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { tripId } = state.router.params;
	
	const { trips, pubs } = state.entities;
	
	const trip = trips[tripId];
	const pub = trip ? pubs[trip.pub] : null;
	
	return {
		tripId,
		trip,
		pub: pub
	}
}

export default connect(mapStateToProps, { loadTrip })(TripPage);