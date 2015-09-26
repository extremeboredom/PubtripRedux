
declare module "react-redux" {
    import * as React from 'react';
    import * as redux from 'redux';

    interface ProviderProps {
        store: redux.Store;
        children?: Function;
    }

    interface ProviderState {
        store: redux.Store;
    }

    export class Provider extends React.Component<ProviderProps, ProviderState> {}

    interface ConnectorProps {
        children: Function;
        select: Function;
    }

    class Connector extends React.Component<ConnectorProps, any> {}
    
    export function connect(mapStateToProps?: Function, mapDispatchToProps?: Function)
}