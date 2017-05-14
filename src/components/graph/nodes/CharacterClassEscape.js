import { Component } from 'react'
import './CharacterClassEscape.sass'

const types = {
	'd': 'digit',
	'D': 'non-digit',
	's': 'space',
	'S': 'non-space',
	'w': 'alphanumeric',
	'W': 'non-alphanumeric'
}

export default class CharacterClassEscape extends Component {
	render() {
		return (
			<span className="node character-class-escape">
				<span className="character-class-escape__symbol">
					{ types[this.props.data.value] }
				</span>
			</span>
		)
	}
}
