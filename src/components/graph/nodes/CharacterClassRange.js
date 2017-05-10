import { Component } from 'react'
import './CharacterClassRange.sass'

export default class CharacterClassRange extends Component {
	render() {
		return (
			<span className="node value">
				{ this.props.data.min.raw }
				<span className="character-class-range__delimiter">…</span>
				{ this.props.data.max.raw }
			</span>
		)
	}
}
