import React from 'react'
import equal from 'deep-equal'
import getClientRect from '../../../utils/get-client-rect'
import './value.css'

const specials = new Map([
	[8, 'boundary'],
	[9, 'tab'],
	[10, 'new line'],
	[11, 'vertical tab'],
	[13, 'caret return'],
	[32, 'space']
])

export default class Value extends React.Component {
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
		const rect = getClientRect(this.el)
		this.updateDimensions(rect)
	}

	componentDidUpdate() {
		const rect = getClientRect(this.el)
		if (!equal(rect, this.state.dimensions.rect)) {
			this.updateDimensions(rect)
		}
	}

	renderSymbol() {
		const code = this.props.data.codePoint

		return specials.has(code)
			? <span className="value__special">{ specials.get(code) }</span>
			: this.props.data.raw
	}

	renderBaseline() {
		if (this.state.dimensions) {
			return <div className="baseline" style={{ top: this.state.dimensions.baseline }} />
		}
	}

	render() {
		return (
			<div className="node value" style={ this.props.style } ref={ el => this.el = el }>
				<div className="value__body">
					{ this.renderSymbol() }
				</div>
				{/*{ this.renderBaseline() }*/}
			</div>
		)
	}
}
