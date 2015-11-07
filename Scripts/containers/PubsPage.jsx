import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadPubs } from '../actions';
import { Link } from 'react-router';
import Table from '../components/Table';

function loadData(props) {
	props.loadPubs();
}

const PubNameColumn = 'PubNameColumn';

class PubsPage extends Component {

	componentWillMount() {
		loadData(this.props);
	}
	
	renderHeader(column) {
		switch(column) {
			case PubNameColumn:
				return "Pub Name";
			default:
				return ''
		}
	}
	
	renderRow(item, column) {
		switch(column) {
			case PubNameColumn:
				return <Link to={`/pubs/${item.id}`}>{item.name}</Link>
			default:
				return ''
		}
	}

	render() {
		const { pubs, pubsPage, allPubs } = this.props;
		
		return (
			<Table isFetching={allPubs.isFetching}
				   loadingLabel="Loading Pubs..."
				   items={allPubs.ids.map(id => pubs[id])}
				   itemToKey={item => item.id}
				   emptyLabel="No Pubs Yet.."
				   columns={[PubNameColumn]}
				   renderHeader={this.renderHeader}
				   renderRow={this.renderRow} />
		);
	
		if (pubsPage.length === 0) {
			return (<h1>Loading...</h1>);
		}
		
		var renderedPubs = pubsPage.map(p => <li key={p}>{pubs[p].name}</li>);
	
		return (
			<div>
				<ul>{renderedPubs}</ul>
			</div>
		)
	}
	
}

PubsPage.propTypes = {
	pubsPage: PropTypes.array.isRequired,
	pubs: PropTypes.object.isRequired,
	children: PropTypes.node
};

function mapStateToProps(state) {
	const { entities: { pubs } } = state;
	const { pages: { pubsPage } } = state;
	const { pagination: { allPubs } } = state;

	return {
		pubsPage,
		pubs,
		allPubs
	}
}

export default connect(mapStateToProps, { loadPubs })(PubsPage);