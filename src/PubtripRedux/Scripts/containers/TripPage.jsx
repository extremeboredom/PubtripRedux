import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadTrip, loadAttendeesForTrip, attendTrip, removeAttendee } from '../actions';
import Table from '../components/Table';
import moment from 'moment-timezone';
import find from 'lodash/collection/find';
import AttendButton from '../components/AttendButton';

function loadData(props) {
	const { tripId } = props;
	
	props.loadTrip(tripId);
	props.loadAttendeesForTrip(tripId);
}

const AttendeeColumn = 'AttendeeColumn';

class TripPage extends Component {

	constructor(props) {
		super(props);
		
		this.startAttending = this.startAttending.bind(this);
	}
	
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

	startAttending(tripId) {
		this.props.attendTrip(tripId).then(() => {
			this.props.loadAttendeesForTrip(tripId, true)
		});
	}

	render() {
		const { trip, pub, attendeesPagination, attendees, user } = this.props;
		
		if (!trip || !pub) {
			return (<h1><i>Loading Trip details...</i></h1>);
		}
		
		const date = moment(trip.date);
	
		return (
			<div>
				<h1>{trip.name}</h1>
				<h3>{`${date.calendar()} at ${pub.name}`}</h3>
				<AttendButton user={user}
							  trip={trip}
							  attendees={attendees}
							  startAttending={this.startAttending}
							  stopAttending={this.props.removeAttendee}	/>
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
	user: PropTypes.object.isRequired,
	attendees: PropTypes.arrayOf(PropTypes.object).isRequired,
	attendeesPagination: PropTypes.object.isRequired,
	loadTrip: PropTypes.func.isRequired,
	loadAttendeesForTrip: PropTypes.func.isRequired,
	attendTrip: PropTypes.func.isRequired,
	removeAttendee: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { tripId } = state.router.params;
	const { attendeesByTrip } = state.pagination;
	const { attendees, trips, pubs, users } = state.entities;
	
	const user = users[state.user];
	const trip = trips[tripId];
	const pub = trip ? pubs[trip.pub] : null;
	const attendeesPagination = attendeesByTrip[tripId] || { ids: [], isFetching: false };
	const mappedAttendees = attendeesPagination.ids.map(a => attendees[a]);
	
	return {
		tripId,
		trip,
		pub,
		user,
		attendees: mappedAttendees,
		attendeesPagination
	}
}

export default connect(mapStateToProps, { 
	loadTrip, loadAttendeesForTrip, attendTrip, removeAttendee
})(TripPage);