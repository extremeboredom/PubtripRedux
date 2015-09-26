/// <reference path="../redux/redux.d.ts" />

declare module 'redux-thunk' {
	
	import {Middleware} from 'redux';
	
	var thunk: Middleware;
	
	export default thunk;
	
}