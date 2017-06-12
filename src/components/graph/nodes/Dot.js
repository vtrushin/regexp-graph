import { Component } from 'react'
import equal from 'deep-equal'
import rectToObject from '../../../utils/rect-to-object'
import './Dot.sass'

export default class Dot extends Component {
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
			<span className="node value" style={ this.props.style } ref={ el => this.el = el }>
				<span className="dot">any</span>
			</span>
		)
	}
}
