// Type definitions for Redux v1.0.0
// Project: https://github.com/rackt/redux
// Definitions by: William Buchwalter <https://github.com/wbuchwalter/>, Vincent Prouillet <https://github.com/Keats/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'redux' {

    export interface ActionCreator extends Function {
        (...args: any[]): any;
    }

    export interface Reducer extends Function {
        (state: any, action: any): any;
    }

    export interface Dispatch extends Function {
        (action: any): any;
    }

    export interface StoreMethods {
        dispatch: Dispatch;
        getState(): any;
    }


    export interface MiddlewareArg {
        dispatch: Dispatch;
        getState: Function;
    }

    export interface Middleware extends Function {
        (obj: MiddlewareArg): Function;
    }

    export class Store {
        getReducer(): Reducer;
        replaceReducer(nextReducer: Reducer): void;
        dispatch(action: any): any;
        getState(): any;
        subscribe(listener: Function): Function;
    }

    export function createStore(reducer: Reducer, initialState?: any): Store;
    export function bindActionCreators<T>(actionCreators: T, dispatch: Dispatch): T;
    export function combineReducers(reducers: any): Reducer;
    export function applyMiddleware(...middleware: Middleware[]): Function;
    export function compose<T extends Function>(...functions: Function[]): T;
}