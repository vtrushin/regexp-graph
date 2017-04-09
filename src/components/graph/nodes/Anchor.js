import React from 'react';
import AbstractValue from './AbstractValue';
import './Anchor.sass';

export default class Anchor extends React.Component {
	render() {
		return (
			<AbstractValue>
				{ this.props.data.kind }
			</AbstractValue>
		);
	}
}
