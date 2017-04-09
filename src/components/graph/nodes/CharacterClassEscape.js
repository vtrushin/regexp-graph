import React from 'react';
import AbstractValue from './AbstractValue';
import './CharacterClassEscape.sass';

const types = {
	'd': 'digit',
	'D': 'non-digit',
	's': 'space',
	'S': 'non-space',
	'w': 'alphanumeric',
	'W': 'non-alphanumeric'
};

export default class CharacterClassEscape extends React.Component {
	render() {
		return (
			<AbstractValue>
				<span className="character-class-escape__symbol">
					{ types[this.props.data.value] }
				</span>
			</AbstractValue>
		);
	}
}
