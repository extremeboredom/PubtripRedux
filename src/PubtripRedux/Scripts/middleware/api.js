/* global fetch */
import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import 'isomorphic-fetch';
import defaults from 'lodash/object/defaults';

const API_ROOT = '/api';

function callApi(endpoint, schema, options) {
	const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

	return fetch(fullUrl, options)
		.then(response =>
			response.json().then(json => ({ json, response }))
			).then(({ json, response }) => {
				if (!response.ok) {
					return Promise.reject(json);
				}

				const camelizedJson = camelizeKeys(json);
				const nextPageUrl = /*getNextPageUrl(response) ||*/ undefined;

				return Object.assign({},
					normalize(camelizedJson, schema),
					{ nextPageUrl }
					);
			});
}

function deleteFromApi(endpoint, options) {
	const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
	
	return fetch(fullUrl, options).then(response => {
		if (!response.ok) {
			return Promise.reject(response);
		}
		
		return Promise.resolve();
	});
}

const userSchema = new Schema('users', {
	idAttribute: 'userName'
});

const pubSchema = new Schema('pubs', {
	idAttribute: 'id'
});

const tripSchema = new Schema('trips', {
	idAttribute: 'id'
});

tripSchema.define({
	pub: pubSchema,
	organiser: userSchema
});

const attendeeSchema = new Schema('attendees', {
	idAttribute: 'id'
});

export const Schemas = {
	Attendee: attendeeSchema,
	Attendees: arrayOf(attendeeSchema),
	Pub: pubSchema,
	Pubs: arrayOf(pubSchema),
	Trip: tripSchema,
	Trips: arrayOf(tripSchema),
	User: userSchema,
};

export const CALL_API = Symbol('Call API');

export default store => next => action => {
	const callAPI = action[CALL_API];
	if (typeof callAPI === 'undefined') {
		return next(action);
	}
	
	let defaultOptions = { credentials: 'include' };
	let { endpoint, options } = callAPI;
	const { schema, types } = callAPI;

	if (typeof endpoint === 'function') {
		endpoint = endpoint(store.getState());
	}

	if (typeof endpoint !== 'string') {
		throw new Error('Specify a string endpoint URL.');
	}
	if (!schema) {
		throw new Error('Specify one of the exported Schemas.');
	}
	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected an array of three action types.');
	}
	if (!types.every(type => typeof type === 'string')) {
		throw new Error('Expected action types to be strings.');
	}
	if (options && typeof options !== 'object') {
		throw new Error('Expected options to be an object');
	}
	
	options = defaults(options || {}, defaultOptions);

	function actionWith(data) {
		const finalAction = Object.assign({}, action, data);
		delete finalAction[CALL_API];
		return finalAction;
	}

	const [requestType, successType, failureType] = types;
	next(actionWith({ type: requestType }));

	if (options.method === 'delete') {
		return deleteFromApi(endpoint, options)
			.then(
				() => next(actionWith({type: successType})),
				error => next(actionWith({type: failureType, error: error.message || 'Something bad happened'}))
			);
	}
	
	return callApi(endpoint, schema, options).then(
		response => next(actionWith({
			response,
			type: successType
		})),
		error => next(actionWith({
			type: failureType,
			error: error.message || 'Something bad happened'
		}))
		);
}