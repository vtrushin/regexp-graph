import React from 'react';
// import AbstractValue from './AbstractValue';
import AbstractGraphNode from './AbstractGraphNode';
import './Anchor.sass';

export default class Anchor extends AbstractGraphNode {
	render() {
		return (
			<span className="value" ref={ el => this.el = el }>
				{ this.props.data.kind }
			</span>
		);
	}
}
