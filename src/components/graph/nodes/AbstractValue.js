import React from 'react';
import './AbstractValue.sass';

export default class AbstractValue extends React.Component {
	render() {
		return (
			<span className="value">
				{ this.props.children }
			</span>
		);
	}
}
