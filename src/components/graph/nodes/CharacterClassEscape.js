import { Component } from 'react'
import equal from 'deep-equal'
import rectToObject from '../../../utils/rect-to-object'
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
	constructor(props) {
		super(props)
		this.state = {
			dimensions: null
		}
	}

	updateDimensions(rect) {
		const dimensions = {
			rect: { ...rect },
			baseline: rect.height / 2
		}

		this.setState({ dimensions })

		if (this.props.onDimensionsChanged) {
			this.props.onDimensionsChanged(dimensions)
		}
	}

	componentDidMount() {
		const rect = rectToObject(this.el.getBoundingClientRect())
		this.updateDimensions(rect)
	}

	componentDidUpdate() {
		const rect = rectToObject(this.el.getBoundingClientRect())
		if (!equal(rect, this.state.dimensions.rect)) {
			this.updateDimensions(rect)
		}
	}

	render() {
		return (
			<span className="node character-class-escape" ref={ el => this.el = el }>
				<span className="character-class-escape__symbol">
					{ types[this.props.data.value] }
				</span>
			</span>
		)
	}
}
