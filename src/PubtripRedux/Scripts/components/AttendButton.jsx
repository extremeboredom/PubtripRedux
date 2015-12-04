import React, { Component, PropTypes } from 'react';
import find from 'lodash/collection/find';

class AttendButton extends Component {

	constructor(props) {
		super(props);
		
		this.startAttending = this.startAttending.bind(this);
		this.stopAttending = this.stopAttending.bind(this);
	}
	
	startAttending() {
		const { startAttending, trip } = this.props;
		
		startAttending(trip.id);
	}
	
	stopAttending(attendee) {
		const { stopAttending, trip } = this.props;
		
		stopAttending(trip.id, attendee.id);
	}
	
	render() {
		const { trip, user, attendees } = this.props;
		
		if (user.userName === trip.organiser) {
			return null;
		}
		
		const currentUserAttendee = find(attendees, a => a.user === user.userName);
		
		return currentUserAttendee
			? (<button onClick={() => this.stopAttending(currentUserAttendee)}>Stop Attending</button>)
			: (<button onClick={this.startAttending}>Attend</button>);  
	}

}

AttendButton.propTypes = {
	user: PropTypes.object.isRequired,
	trip: PropTypes.object.isRequired,
	attendees: PropTypes.arrayOf(PropTypes.object).isRequired,
	
	startAttending: PropTypes.func.isRequired,
	stopAttending: PropTypes.func.isRequired
}

export default AttendButton;