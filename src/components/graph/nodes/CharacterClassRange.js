import React from 'react';
import AbstractGraphNode from './AbstractGraphNode';
// import AbstractValue from './AbstractValue';
import './CharacterClassRange.sass';

export default class CharacterClassRange extends AbstractGraphNode {
	render() {
		return (
			<span className="value" ref={ el => this.el = el }>
				{ this.props.data.min.raw }
				<span className="character-class-range__delimiter">…</span>
				{ this.props.data.max.raw }
			</span>
		);
	}
}
