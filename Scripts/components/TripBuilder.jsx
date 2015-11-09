import React, { Component, PropTypes } from 'react'
import moment from 'moment-timezone';

const DateTimeFormat = 'YYYY-MM-DD HH:mm';

class TripBuilder extends Component {

	constructor(props) {
		super(props);
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	getTripDetails() {
		// Convert the date and time fields
		const dateString = this.refs.tripDate.value.trim();
		const timeString = this.refs.tripTime.value.trim();
		const dateTimeString = `${dateString} ${timeString}`;
		
		const datetime = moment(dateTimeString, DateTimeFormat);
		
		return {
			name: this.refs.tripName.value,
			// Make sure to coerce to a number
			pub: +this.refs.pubSelector.value,
			// Format to ISO 8601
			date: datetime.format()
		};
	}
	
	handleSubmit() {
		this.props.onCreate(this.getTripDetails());
	}

	renderPubsDropdown() {
		const { pubs } = this.props;
		
		const pubOptions = pubs.map(p => <option key={p.id} value={p.id}>{p.name}</option>);
		
		return (
			<select id="pubSelector" className="form-control" ref="pubSelector">
				{pubOptions}
			</select>
		);
	}

	render() {
		const { savePending } = this.props;
	
		var renderedPubOptions = this.renderPubsDropdown();
	
		return (
			<div className="form-horizontal">
				<div className="form-group">
					<label htmlFor="tripName" className="col-sm-2 control-label">Name</label>
					<div className="col-sm-10">
						<input type="text" className="form-control" id="tripName" ref="tripName" placeholder="Name" />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="pubSelector" className="col-sm-2 control-label">Pub</label>
					<div className="col-sm-10">
						{renderedPubOptions}
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="tripDate" className="col-sm-2 control-label">Date</label>
					<div className="col-sm-10">
						<input type="date" className="form-control" id="tripDate" ref="tripDate" placeholder="yyyy-mm-dd" />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="tripTime" className="col-sm-2 control-label">Time</label>
					<div className="col-sm-10">
						<input type="time" className="form-control" id="tripTime" ref="tripTime" placeholder="hh:mm" />
					</div>
				</div>
				
				<button className="btn btn-primary" 
						onClick={this.handleSubmit}
						disabled={savePending}>Create Trip</button>
			</div>
		);
	}

}

TripBuilder.propTypes = {
	pubs: PropTypes.array.isRequired,
	savePending: PropTypes.bool.isRequired,
	onCreate: PropTypes.func.isRequired
}

export default TripBuilder;