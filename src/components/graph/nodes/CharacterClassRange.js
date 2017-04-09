import React from 'react';
import AbstractValue from './AbstractValue';
import './CharacterClassRange.sass';

export default class CharacterClassRange extends React.Component {
	render() {
		return (
			<AbstractValue>
				{ this.props.data.min.raw }
				<span className="character-class-range__delimiter">…</span>
				{ this.props.data.max.raw }
			</AbstractValue>
		);
	}
}
