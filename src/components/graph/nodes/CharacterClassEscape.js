import React from 'react';
import AbstractGraphNode from './AbstractGraphNode';
// import AbstractValue from './AbstractValue';
import './CharacterClassEscape.sass';

const types = {
	'd': 'digit',
	'D': 'non-digit',
	's': 'space',
	'S': 'non-space',
	'w': 'alphanumeric',
	'W': 'non-alphanumeric'
};

export default class CharacterClassEscape extends AbstractGraphNode {
	render() {
		return (
			<span className="value" ref={ el => this.el = el }>
				<span className="character-class-escape__symbol">
					{ types[this.props.data.value] }
				</span>
			</span>
		);
	}
}
