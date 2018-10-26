import React from 'react'
import equal from 'deep-equal'
import getClientRect from '../../../utils/get-client-rect'
import './dot.css'

export default class Dot extends React.Component {
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

	render() {
		return (
			<span className="node value" style={this.props.style} ref={el => this.el = el}>
				<span className="dot">any</span>
			</span>
		)
	}
}
