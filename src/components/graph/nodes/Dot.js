import React from 'react';
import AbstractGraphNode from './AbstractGraphNode';
// import AbstractValue from './AbstractValue';
import './Dot.sass';

export default class Dot extends AbstractGraphNode {
	render() {
		return (
			<span className="value" ref={ el => this.el = el }>
				<span className="dot">any</span>
			</span>
		);
	}
}
