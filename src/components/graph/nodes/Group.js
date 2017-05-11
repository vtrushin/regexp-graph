import { Component } from 'react'
import nodeByType from '../node-by-type'
import reduceTree from '../reduce-tree'
import getUniqueNodeId from '../get-unique-node-id-2'
import equal from 'deep-equal'
import * as actions from '../../../actions'
import './Group.sass'

class Group extends Component {
	constructor(props) {
		super(props)

		this.childrenDimensions = {}

		this.state = {
			dimensions: null,
			childrenDimensions: null
		}
	}

	updateDimensions() {
		const parentRect = this.el.getBoundingClientRect()
		const childrenBodyRect = this.childrenBody.getBoundingClientRect()
		const childrenBodyTop = childrenBodyRect.top - parentRect.top
		const baselines = Object.keys(this.childrenDimensions).map(key => childrenBodyTop + this.childrenDimensions[key].baseline)
		const dimensions = {
			left: parentRect.left,
			right: parentRect.right,
			top: parentRect.top,
			width: parentRect.width,
			height: parentRect.height,
			baseline: Math.max(...baselines)
		}

		this.setState({
			dimensions,
			childrenDimensions: { ...this.childrenDimensions }
		})

		if (this.props.onDimensionsChanged) {
			this.props.onDimensionsChanged(dimensions)
		}
	}

	componentDidUpdate() {
		if (!equal(this.childrenDimensions, this.state.childrenDimensions)) {
			this.updateDimensions()
		}
	}

	componentDidMount() {
		this.updateDimensions()
	}

	getGroupIndex() {
		return reduceTree(this.props.ast, 'body', (prev, current) => ({
			value: current.type === 'group' ? prev + 1 : prev,
			stop: current === this.props.data
		}), 0)
	}

	renderChildren() {
		let maxBaseline

		if (this.state.childrenDimensions) {
			const baselines = Object.keys(this.state.childrenDimensions).map(key => this.state.childrenDimensions[key].baseline)
			maxBaseline = Math.max(...baselines)
		}

		return this.props.data.body.map((node, i) => {
			const Node = nodeByType[node.type]
			const nodeDimensions = this.state.childrenDimensions && this.state.childrenDimensions[i]

			return (
				<Node
					{ ...this.props }
					style={{ marginTop: maxBaseline && nodeDimensions ? maxBaseline - nodeDimensions.baseline : 0 }}
					data={ node }
					onDimensionsChanged={ dimensions => this.childrenDimensions[i] = dimensions }
					key={ i }
				/>
			)
		})
	}

	renderBaseline() {
		if (this.state.dimensions) {
			return <div className="baseline" style={{ top: this.state.dimensions.baseline }}></div>
		}
	}

	render() {
		const index = this.getGroupIndex()

		console.log('childrenDimensions', this.state.childrenDimensions)

		return (
			<div className={ `node group group_${index} _${this.props.data.behavior}` } style={ this.props.style } ref={ el => this.el = el }>
				<div className="group__title">#{ index }</div>
				<div className="group__children">
					<div className="group__children-body" ref={ el => this.childrenBody = el }>
						{ this.renderChildren() }
					</div>
				</div>
				{ this.renderBaseline() }
			</div>
		)
	}
}

export default Group
