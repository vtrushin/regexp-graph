import React from 'react';
import './CharacterClassRange.sass';

export default class CharacterClassRange extends React.Component {
	render() {
		return (
			<span className="value">
				{ this.props.data.min.raw }
				<span className="character-class-range__delimiter">…</span>
				{ this.props.data.max.raw }
			</span>
		);
	}
}
