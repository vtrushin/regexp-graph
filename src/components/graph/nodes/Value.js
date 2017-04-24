import React from 'react';
import './Value.sass';

const specials = new Map([
	[9, 'tab'],
	[10, 'new line'],
	[11, 'vertical tab'],
	[13, 'caret return'],
	[32, 'space']
]);

export default class Value extends React.Component {
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
			<span className="value" style={ this.props.style }>
				{ this.renderSymbol() }
			</span>
		);
	}
}
