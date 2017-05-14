import { Component } from 'react'
import equal from 'deep-equal'
import rectToObject from '../../../utils/rect-to-object'
import './Anchor.sass'

export default class Anchor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dimensions: null
		}
	}

	updateDimensions(rect) {
		const dimensions = {
			...rect,
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
		if (!equal(rect, this.state.dimensions)) {
			this.updateDimensions(rect)
		}
	}

	renderBaseline() {
		if (this.state.dimensions) {
			return <div className="baseline" style={{ top: this.state.dimensions.baseline }}></div>
		}
	}

	render() {
		return (
			<span className="node anchor" style={ this.props.style } ref={ el => this.el = el }>
				<div className="anchor__body">
					{ this.props.data.kind }
				</div>
				{ this.renderBaseline() }
			</span>
		)
	}
}
