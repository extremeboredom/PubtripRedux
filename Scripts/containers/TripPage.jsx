import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadTrip, loadAttendeesForTrip } from '../actions';
import Table from '../components/Table';
import moment from 'moment-timezone';

function loadData(props) {
	const { tripId } = props;
	
	props.loadTrip(tripId);
	props.loadAttendeesForTrip(tripId);
}

const AttendeeColumn = 'AttendeeColumn';

class TripPage extends Component {
	
	componentWillMount() {
		loadData(this.props);
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.tripId !== this.props.tripId) {
			loadData(nextProps);
		}
	}
	
	renderHeader(column) {
		switch(column) {
			case AttendeeColumn:
				return "Attendees";
			default:
				return ''
		}
	}
	
	renderRow(item, column) {
		switch(column) {
			case AttendeeColumn:
				return item.user;
			default:
				return ''
		}
	}

	render() {
		const { trip, pub, attendeesPagination, attendees } = this.props;
		
		if (!trip || !pub) {
			return (<h1><i>Loading Trip details...</i></h1>);
		}
		
		const date = moment(trip.date);
	
		return (
			<div>
				<h1>{trip.name}</h1>
				<h3>{`${date.calendar()} at ${pub.name}`}</h3>
				<Table isFetching={attendeesPagination.isFetching}
						loadingLabel="Loading Attendees..."
						items={attendees}
						itemToKey={item => item.id}
						emptyLabel="It's gonna be lonely..."
						columns={[AttendeeColumn]}
						renderHeader={this.renderHeader}
						renderRow={this.renderRow} />
			</div>
		);
	}

}

TripPage.propTypes = {
	tripId: PropTypes.string.isRequired,
	trip: PropTypes.object,
	pub: PropTypes.object,
	attendees: PropTypes.arrayOf(PropTypes.object).isRequired,
	attendeesPagination: PropTypes.object.isRequired,
	loadTrip: PropTypes.func.isRequired,
	loadAttendeesForTrip: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { tripId } = state.router.params;
	const { attendeesByTrip } = state.pagination;
	const { attendees, trips, pubs } = state.entities;
	
	const trip = trips[tripId];
	const pub = trip ? pubs[trip.pub] : null;
	const attendeesPagination = attendeesByTrip[tripId] || { ids: [], isFetching: false };
	const mappedAttendees = attendeesPagination.ids.map(a => attendees[a]);
	
	return {
		tripId,
		trip,
		pub: pub,
		attendees: mappedAttendees,
		attendeesPagination
	}
}

export default connect(mapStateToProps, { loadTrip, loadAttendeesForTrip })(TripPage);