import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadPub, loadTripsForPub } from '../actions';
import Table from '../components/Table';
import moment from 'moment-timezone';

function loadData(props) {
	
	const { pubId  } = props;
	props.loadPub(pubId);
	props.loadTripsForPub(pubId);
	
}

const TripNameColumn = 'TripNameColumn';
const WhenColumn = 'WhenColumn';

class PubPage extends Component {

	componentWillMount() {
		loadData(this.props);
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.pubId !== this.props.pubId) {
			loadData(nextProps);
		}
	}
	
	renderHeader(column) {
		switch(column) {
			case TripNameColumn:
				return "Trip Name";
			case WhenColumn:
				return 'When?';
			default:
				return ''
		}
	}
	
	renderRow(item, column) {
		switch(column) {
			case TripNameColumn:
				return item.name;
			case WhenColumn:
				return moment(item.date).calendar();
			default:
				return ''
		}
	}
	
	render() {
	
		const { pub, tripsPagination, trips } = this.props;
		
		if (!pub) {
			return <h1><i>Loading Pub details...</i></h1>;
		}
		
		return (
			<div>
				<h1>{pub.name}</h1>
				<Table isFetching={tripsPagination.isFetching}
						loadingLabel="Loading Trips..."
						items={trips}
						itemToKey={item => item.id}
						emptyLabel="No Trips Yet.."
						columns={[TripNameColumn, WhenColumn]}
						renderHeader={this.renderHeader}
						renderRow={this.renderRow} />
			</div>
		);
	
	}

}

PubPage.propTypes = {
	pubId: PropTypes.string.isRequired,
	pub: PropTypes.object,
	trips: PropTypes.arrayOf(PropTypes.object).isRequired,
	tripsPagination: PropTypes.object.isRequired,
	loadPub: PropTypes.func.isRequired,
	loadTripsForPub: PropTypes.func.isRequired	
}

function mapStateToProps(state) {
	const { pubId } = state.router.params;
	const { 
		pagination: { tripsByPub },
		entities: { pubs, trips }
	} = state;
	
	const tripsPagination = tripsByPub[pubId] || { ids: [], isFetching: false };
	const resolvedTrips = tripsPagination.ids.map(t => trips[t]);
	
	return {
		pubId,
		pub: pubs[pubId],
		tripsPagination,
		trips: resolvedTrips
	};
}

export default connect(mapStateToProps, { loadPub, loadTripsForPub })(PubPage); 