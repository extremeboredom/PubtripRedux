import React, { Component } from 'react'
import { Link } from 'react-router'

class Hero extends Component {

	render() {
	
	return (
		<div className="jumbotron">
          <h1>Hello!</h1>
          <p>
            Welcome to Pubtrip. Take a look around, join in on a trip or organise your own!
          </p>
          <p>
		  	<Link to="/trip/create" className="btn btn-primary btn-large">
				Organise a Pubtrip
			</Link>
          </p>
        </div>
	);
	
	}

}

export default Hero;