import { Component } from 'react'
import measure from './../measure2'
import './Anchor.sass'

function compareDimensions(rect1, rect2) {
	return (
		rect1.width !== rect2.width
		|| rect1.height !== rect2.height
		|| rect1.left !== rect2.left
		|| rect1.right !== rect2.right
		|| rect1.top !== rect2.top
	)
}

class Anchor extends Component {
	constructor(props) {
		super(props)

		this.state = {
			dimensions: null
		}
	}

	updateDimensions(rect) {
		const dimensions = {
			left: rect.left,
			right: rect.right,
			top: rect.top,
			width: rect.width,
			height: rect.height,
			baseline: rect.height / 2
		}

		this.setState({
			dimensions
		})

		if (this.props.onDimensionsChanged) {
			this.props.onDimensionsChanged(dimensions)
		}
	}

	componentDidMount() {
		const rect = this.el.getBoundingClientRect()
		this.updateDimensions(rect)
	}

	componentDidUpdate() {
		const rect = this.el.getBoundingClientRect()
		if (compareDimensions(rect, this.state.dimensions)) {
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

export default Anchor
