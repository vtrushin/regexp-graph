import React from 'react'
import getNodeValues from './get-node-values'
import * as actions from '../../actions'
import equal from 'deep-equal'

function compareRects(rect1, rect2) {
	const props = ['left', 'top', 'bottom', 'right', 'width', 'height']
	return props.every(prop => rect1[prop] === rect2[prop])
}

export default Node => class Measure extends React.Component {
	constructor(props) {
		super(props)

		this.onPoints = this.onPoints.bind(this)
		this.updateDimensions = this.updateDimensions.bind(this)
	}

	updateDimensions(inputRect, outputRect) {
		const points = {
			input: {
				x: inputRect.left,
				y: inputRect.top + inputRect.height / 2
			},
			output: {
				x: outputRect.right,
				y: outputRect.top + outputRect.height / 2
			}
		}

		const action = actions.dimensionsChanged(
			getNodeValues(this.props.data), points
		)

		this.points = points

		this.props.dispatch(action)
	}

	componentDidMount() {
		const inputRect = this.els.input.getBoundingClientRect()
		const outputRect = this.els.output.getBoundingClientRect()
		this.updateDimensions(inputRect, outputRect)
	}

	componentDidUpdate() {
		const inputRect = this.els.input.getBoundingClientRect()
		const outputRect = this.els.output.getBoundingClientRect()

		if (!compareRects(this.points.input, inputRect) && !compareRects(this.points.output, outputRect)) {
			this.updateDimensions(inputRect, outputRect)
		}
	}

	onPoints(input, output) {
		this.els = {
			input,
			output
		}
	}

	render() {
		const props = {
			...this.props,
			onPoints: this.onPoints
		}

		return (
			<Node { ...props } />
		)
	}
}
