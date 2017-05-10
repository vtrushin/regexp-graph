import { Component } from 'react'
import getUniqueNodeId from './get-unique-node-id'
import * as actions from '../../actions'

function compareRects(rect1, rect2) {
	const props = [/*'left', 'top', 'bottom', 'right', */'width', 'height']
	return props.every(prop => rect1[prop] === rect2[prop])
}

export default Node => class Measure extends Component {
	constructor(props) {
		super(props)

		this.onRef = this.onRef.bind(this)
	}

	updateDimensions() {
		const id = getUniqueNodeId(this.props.data)

		const action = this.el
			? actions.dimensionsChanged(id, this.el)
			: actions.dimensionsRemoved(id)

		this.props.dispatch(action)
	}

	componentDidMount() {
		this.rect = this.el.getBoundingClientRect()
		this.updateDimensions()
	}

	// componentDidUpdate() {
	// 	const rect = this.el.getBoundingClientRect()
	// 	if (!compareRects(this.rect, rect)) {
	// 		this.rect = rect
	// 		this.updateDimensions()
	// 	}
	// }

	onRef(el) {
		this.el = el
	}

	render() {
		return (
			<Node
				{ ...this.props }
				onRef={ this.onRef }
			/>
		)
	}
}
