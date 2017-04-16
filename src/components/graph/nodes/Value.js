import React from 'react';
import AbstractGraphNode from './AbstractGraphNode';
// import AbstractValue from './AbstractValue';
import './Value.sass';

const specials = new Map([
	[9, 'tab'],
	[10, 'new line'],
	[11, 'vertical tab'],
	[13, 'caret return'],
	[32, 'space']
]);

export default class Value extends AbstractGraphNode {
	constructor() {
		super();
		this.el = null;
		this.width = 0;
		this.height = 0;
		// this.guid = 'input-ui-' + Math.random();
	}

	renderSymbol() {
		const code = this.props.data.codePoint;

		if (specials.has(code)) {
			return <span className="value__special">{ specials.get(code) }</span>;
		} else {
			return this.props.data.raw;
		}
	}

	render() {
		return (
			<span
				className="value"
				ref={ el => this.el = el }
				style={ this.props.style }
			>
				{ this.renderSymbol() }
			</span>
		);
	}
}
