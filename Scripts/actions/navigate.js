import { pushState } from 'redux-router';

export function viewPub(pubId) {
	return pushState(null, `/pubs/${pubId}`);
}