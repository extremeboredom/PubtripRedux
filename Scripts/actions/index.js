import { CALL_API, Schemas } from '../middleware/api';

export const PUBS_REQUEST = 'PUBS_REQUEST';
export const PUBS_SUCCESS = 'PUBS_SUCCESS';
export const PUBS_FAILURE = 'PUBS_FAILURE';

function fetchPubs() {

	return {
		[CALL_API]: {
			types: [PUBS_REQUEST, PUBS_SUCCESS, PUBS_FAILURE],
			endpoint: '/api/pubs',
			schema: Schemas.Pubs
		}
	}

}

export function loadPubs(refresh) {
	return (dispatch, getState) => {
		let cached = getState().pages.pubsPage;

		if (cached.length > 0 && !refresh) {
			return null;
		}

		return dispatch(fetchPubs());
	}
}

export const PUB_REQUEST = 'PUB_REQUEST';
export const PUB_SUCCESS = 'PUB_SUCCESS';
export const PUB_FAILURE = 'PUB_FAILURE';

function fetchPub(pubId) {

	return {
		[CALL_API]: {
			types: [PUB_REQUEST, PUB_SUCCESS, PUB_FAILURE],
			endpoint: `/api/pubs/${pubId}`,
			schema: Schemas.Pub
		}
	}

}

export function loadPub(pubId) {
	return (dispatch, getState) => {
		const pub = getState().entities.pubs[pubId];

		if (pub) {
			return null;
		}

		return dispatch(fetchPub(pubId));
	}
}

export const PUBTRIPS_REQUEST = 'PUBTRIPS_REQUEST';
export const PUBTRIPS_SUCCESS = 'PUBTRIPS_SUCCESS';
export const PUBTRIPS_FAILURE = 'PUBTRIPS_FAILURE';

function fetchTripsForPub(pubId, nextPageUrl) {

	return {
		pubId,
		[CALL_API]: {
			types: [PUBTRIPS_REQUEST, PUBTRIPS_SUCCESS, PUBTRIPS_FAILURE],
			endpoint: nextPageUrl,
			schema: Schemas.Trips
		}
	}

}

export function loadTripsForPub(pubId, nextPage) {
	return (dispatch, getState) => {
		const {
			nextPageUrl = `/api/pubs/${pubId}/trips`,
			pageCount = 0
		} = getState().pagination.tripsByPub[pubId] || {};

		if (pageCount > 0 && !nextPage) {
			return null;
		}

		return dispatch(fetchTripsForPub(pubId, nextPageUrl));
	}
}

export const CREATE_TRIP_REQUEST = 'CREATE_TRIP_REQUEST';
export const CREATE_TRIP_SUCCESS = 'CREATE_TRIP_SUCCESS';
export const CREATE_TRIP_FAILURE = 'CREATE_TRIP_FAILURE';

function postTrip(trip) {
	return {
		[CALL_API]: {
			types: [CREATE_TRIP_REQUEST, CREATE_TRIP_SUCCESS, CREATE_TRIP_FAILURE],
			endpoint: '/api/trips',
			schema: Schemas.Trip,
			options: {
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(trip)
			}
		}
	};
}

export function createTrip(trip) {
	return (dispatch, getState) => {
		return dispatch(postTrip(trip));
	}
}

export const TRIP_REQUEST = 'TRIP_REQUEST';
export const TRIP_SUCCESS = 'TRIP_SUCCESS';
export const TRIP_FAILURE = 'TRIP_FAILURE';

function fetchTrip(tripId) {

	return {
		[CALL_API]: {
			types: [TRIP_REQUEST, TRIP_SUCCESS, TRIP_FAILURE],
			endpoint: `/api/trips/${tripId}`,
			schema: Schemas.Trip
		}
	}

}

export function loadTrip(tripId) {
	return (dispatch, getState) => {
		const trip = getState().entities.trips[tripId];

		if (trip) {
			return null;
		}

		return dispatch(fetchTrip(tripId));
	}
}

export const ATTENDEES_REQUEST = 'ATTENDEES_REQUEST';
export const ATTENDEES_SUCCESS = 'ATTENDEES_SUCCESS';
export const ATTENDEES_FAILURE = 'ATTENDEES_FAILURE';

function fetchAttendeesForTrip(tripId, nextPageUrl) {

	return {
		tripId,
		[CALL_API]: {
			types: [ATTENDEES_REQUEST, ATTENDEES_SUCCESS, ATTENDEES_FAILURE],
			endpoint: nextPageUrl,
			schema: Schemas.Attendees
		}
	}

}

export function loadAttendeesForTrip(tripId, nextPage) {
	tripId = tripId.toString();
	return (dispatch, getState) => {
		const {
			nextPageUrl = `/api/trips/${tripId}/attendees`,
			pageCount = 0
		} = getState().pagination.attendeesByTrip[tripId] || {};

		if (pageCount > 0 && !nextPage) {
			return null;
		}

		return dispatch(fetchAttendeesForTrip(tripId, nextPageUrl));
	}
}

export const CREATE_ATTENDEE_REQUEST = 'CREATE_ATTENDEE_REQUEST';
export const CREATE_ATTENDEE_SUCCESS = 'CREATE_ATTENDEE_SUCCESS';
export const CREATE_ATTENDEE_FAILURE = 'CREATE_ATTENDEE_FAILURE';

function postAttendee(tripId) {
	return {
		[CALL_API]: {
			types: [CREATE_ATTENDEE_REQUEST, CREATE_ATTENDEE_SUCCESS, CREATE_ATTENDEE_FAILURE],
			endpoint: `/api/trips/${tripId}/attendees`,
			schema: Schemas.Attendee,
			options: {
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}
		}
	};
}

export function attendTrip(tripId) {
	return (dispatch, getState) => {
		return dispatch(postAttendee(tripId.toString()));
	}
}

export const REMOVE_ATTENDEE = 'REMOVE_ATTENDEE';

function removeAttendeeFromCache(tripId, attendeeId) {
	return {
		type: REMOVE_ATTENDEE,
		tripId,
		attendeeId
	}
}

export const DELETE_ATTENDEE_REQUEST = 'DELETE_ATTENDEE_REQUEST';
export const DELETE_ATTENDEE_SUCCESS = 'DELETE_ATTENDEE_SUCCESS';
export const DELETE_ATTENDEE_FAILURE = 'DELETE_ATTENDEE_FAILURE';

function deleteAttendee(tripId, attendeeId) {
	return {
		[CALL_API]: {
			types: [DELETE_ATTENDEE_REQUEST, DELETE_ATTENDEE_SUCCESS, DELETE_ATTENDEE_FAILURE],
			endpoint: `/api/trips/${tripId}/attendees/${attendeeId}`,
			schema: Schemas.Attendee,
			options: {
				method: 'delete',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}
		}
	};
}

export function removeAttendee(tripId, attendeeId) {
	return (dispatch, getState) => {
		return dispatch(deleteAttendee(tripId, attendeeId))
			.then((action) => {
				if (action.type === DELETE_ATTENDEE_SUCCESS) {
					dispatch(removeAttendeeFromCache(tripId, attendeeId))
				}
			});
	}
}
