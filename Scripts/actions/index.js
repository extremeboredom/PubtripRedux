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
			endpoint: '/api/pubs/${pubId}',
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