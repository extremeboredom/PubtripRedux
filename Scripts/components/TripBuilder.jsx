import React, { Component, PropTypes } from 'react'

class TripBuilder extends Component {

	constructor(props) {
		super(props);
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	getTripDetails() {
		return {
			name: this.refs.tripName.value,
			// Make sure to coerce to a number
			pub: +this.refs.pubSelector.value
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