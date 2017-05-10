import { Component } from 'react'
import getNodeValues from './get-node-values'
import getUniqueNodeId from './get-unique-node-id'
import * as actions from '../../actions'
// import equal from 'deep-equal'
// import rectToObject from './client-rect-to-object'

function compareRects(rect1, rect2) {
	const props = [/*'left', 'top', 'bottom', 'right', */'width', 'height']
	return props.every(prop => rect1[prop] === rect2[prop])
}

export default Node => class Measure extends Component {
	constructor(props) {
		super(props)

		this.state = {}

		this.onRef = this.onRef.bind(this)
		// this.updateDimensions = this.updateDimensions.bind(this)
	}

	updateDimensions() {
		// const points = {
		// 	input: {
		// 		x: rect.left,
		// 		y: rect.top + rect.height / 2
		// 	},
		// 	output: {
		// 		x: rect.right,
		// 		y: rect.top + rect.height / 2
		// 	}
		// }

		// const points = {
		// 	startX: this.rect.left,
		// 	endX: this.rect.right,
		// 	y: this.rect.top + this.rect.height / 2
		// }
        //
		// this.setState({
		// 	...this.state,
		// 	points
		// })

		const points = {
			startX: this.rect.left,
			endX: this.rect.right,
			y: this.rect.top + this.rect.height / 2
		}

		const action = actions.dimensionsChanged(
			getUniqueNodeId(this.props.data),
			points
		)

		this.props.dispatch(action)
	}

	componentDidMount() {
		this.rect = this.el.getBoundingClientRect()
		this.updateDimensions()
	}

	reCalc() {
		// this.rect = this.el.getBoundingClientRect()
		// this.updateDimensions()
	}

	componentDidUpdate() {
		const rect = this.el.getBoundingClientRect()
		if (!compareRects(this.rect, rect)) {
			this.rect = rect
			this.updateDimensions()
		}
	}

	onRef(el) {
		console.log('onRef', el)
		this.el = el
	}

	render() {
		// const props = {
		// 	...this.props,
		// 	points: this.state.points,
		// 	onRef: this.onRef,
		// 	reCalc: this.reCalc
		// }

		return (
			<Node
				{ ...this.props }
				points={ this.state.points }
				onRef={ this.onRef }
			/>
		)
	}
}
