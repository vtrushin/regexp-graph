import React from 'react';
import AbstractValue from './AbstractValue';
import './Value.sass';

const specials = new Map([
	[9, 'tab'],
	[10, 'new line'],
	[11, 'vertical tab'],
	[13, 'caret return'],
	[32, 'space']
]);

export default class Value extends React.Component {
	constructor() {
		super();
		this.renderSymbol = this.renderSymbol.bind(this);
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
			<AbstractValue>
				{ this.renderSymbol() }
			</AbstractValue>
		);
	}
}
