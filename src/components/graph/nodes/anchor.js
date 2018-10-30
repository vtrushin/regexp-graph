import React from 'react'
import equal from 'deep-equal'
import getClientRect from '../../../utils/get-client-rect'
import './anchor.css'

export default class Anchor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rect: null,
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

	renderBaseline() {
		if (this.state.dimensions) {
			return <div className="baseline" style={{ top: this.state.dimensions.baseline }} />
		}
	}

	render() {
		return (
			<span className="node anchor" style={ this.props.style } ref={ el => this.el = el }>
				<div className="anchor__body">
					{ this.props.data.kind }
				</div>
				{/*{ this.renderBaseline() }*/}
			</span>
		)
	}
}
