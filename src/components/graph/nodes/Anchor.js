import React from 'react';
import './Anchor.sass';

export default class Anchor extends React.Component {
	render() {
		return (
			<span className="value">
				{ this.props.data.kind }
			</span>
		);
	}
}
