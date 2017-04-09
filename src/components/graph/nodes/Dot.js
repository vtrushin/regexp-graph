import React from 'react';
import AbstractValue from './AbstractValue';
import './Dot.sass';

export default class Dot extends React.Component {
	render() {
		return (
			<AbstractValue>
				<span className="dot">any</span>
			</AbstractValue>
		);
	}
}
