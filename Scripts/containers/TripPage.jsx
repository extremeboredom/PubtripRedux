import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadTrip, loadAttendeesForTrip, attendTrip } from '../actions';
import Table from '../components/Table';
import moment from 'moment-timezone';
import some from 'lodash/collection/some';

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
	
	renderAttendButton() {
		const { tripId, user, attendeesPagination, attendees } = this.props;
		
		if (attendeesPagination.isFetching) {
			return null;
		}
		
		const userIsAttending = some(attendees, a => a.user === user.userName);
		
		const startAttending = () => {
			this.props.attendTrip(tripId).then(() => {
				this.props.loadAttendeesForTrip(tripId, true)
			});
		}
		return userIsAttending 
			? (<h5>Currently Attending</h5>)
			: (<button onClick={startAttending}>Attend</button>); 
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
				{ this.renderAttendButton() }
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
	attendTrip: PropTypes.func.isRequired
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
	loadTrip, loadAttendeesForTrip, attendTrip 
})(TripPage);