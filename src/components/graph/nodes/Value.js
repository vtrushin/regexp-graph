import { Component } from 'react'
// import shallowCompare from 'react-addons-shallow-compare'
import measure from './../measure5'
import equals from 'is-equal-shallow'
import getUniqueNodeId from '../get-unique-node-id'
import * as actions from '../../../actions'
import './Value.sass'

const specials = new Map([
	[8, 'boundary'],
	[9, 'tab'],
	[10, 'new line'],
	[11, 'vertical tab'],
	[13, 'caret return'],
	[32, 'space']
])

function compareDimensions(rect1, rect2) {
	return (
		rect1.width !== rect2.width
		|| rect1.height !== rect2.height
		|| rect1.left !== rect2.left
		|| rect1.right !== rect2.right
		|| rect1.top !== rect2.top
	)
}

class Value extends Component {
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

	// componentWillReceiveProps(nextProps) {
	// 	// this.baseline = nextProps.dimensions[getUniqueNodeId(nextProps.data)].baseline
	// }

	renderSymbol() {
		const code = this.props.data.codePoint

		return specials.has(code)
			? <span className="value__special">{ specials.get(code) }</span>
			: this.props.data.raw
	}

	renderBaseline() {
		if (this.state.dimensions) {
			return <div className="baseline" style={{ top: this.state.dimensions.baseline }}></div>
		}
	}

	render() {
		return (
			<div className="node value" style={ this.props.style } ref={ el => this.el = el }>
				<div className="value__body">
					{ this.renderSymbol() }
				</div>
				{ this.renderBaseline() }
			</div>
		)
	}
}

export default Value
