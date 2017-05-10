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

		this.onRef = this.onRef.bind(this)
		this.updateDimensions = this.updateDimensions.bind(this)
	}

	updateDimensions(rect) {
		const points = {
			input: {
				x: rect.left,
				y: rect.top + rect.height / 2
			},
			output: {
				x: rect.right,
				y: rect.top + rect.height / 2
			}
		}

		const action = actions.dimensionsChanged(
			getNodeValues(this.props.data), points
		)

		this.rect = rect

		this.props.dispatch(action)
	}

	componentDidMount() {
		const rect = this.el.getBoundingClientRect()
		this.updateDimensions(rect)
	}

	componentDidUpdate() {
		const rect = this.el.getBoundingClientRect()
		if (!compareRects(this.rect, rect)) {
			this.updateDimensions(rect)
		}
	}

	onRef(el) {
		this.el = el
	}

	render() {
		const props = {
			...this.props,
			onRef: this.onRef
		}

		return (
			<Node {...props} />
		)
	}
}
