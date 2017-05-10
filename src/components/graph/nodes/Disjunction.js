import { Component } from 'react'
import clone from 'clone'
import ReactDOM from 'react-dom'
import Connector from '../connector/Connector'
import measure from '../measure5'
import nodeByType from '../node-by-type'
import getNodeValues from '../get-node-values'
import getUniqueNodeId from '../get-unique-node-id'
import equal from 'deep-equal'
import './Disjunction.sass'

class Disjunction extends Component {
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
		// const childrenBodyRect = this.childrenBody.getBoundingClientRect()
		// const childrenBodyTop = childrenBodyRect.top - parentRect.top
		const baselines = Object.keys(this.childrenDimensions).map(key => this.childrenDimensions[key].baseline)
		const dimensions = {
			left: parentRect.left,
			right: parentRect.right,
			top: parentRect.top,
			width: parentRect.width,
			height: parentRect.height,
			baseline: parentRect.height / 2
		}

		this.setState({
			dimensions,
			childrenDimensions: {
				...this.childrenDimensions
			}
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

	renderConnectors() {
		if (!this.state.dimensions) {
			return null
		}

		const list = []

		this.props.data.body.filter(node => node.raw !== '').forEach((node, i) => {
			const dimensions = this.state.childrenDimensions && this.state.childrenDimensions[i]

			if (!dimensions) {
				return
			}

			list.push(
				<Connector
					key={ `left:${dimensions.left}:${dimensions.right}:${dimensions.top}` }
					fromX={ 0 }
					fromY={ this.state.dimensions.height / 2 }
					toX={ dimensions.left - this.state.dimensions.left }
					toY={ dimensions.baseline + dimensions.top - this.state.dimensions.top }
					turn={ 25 }
				/>,
				<Connector
					key={ `right:${dimensions.left}:${dimensions.right}:${dimensions.top}` }
					fromX={ dimensions.right - this.state.dimensions.left }
					fromY={ dimensions.baseline + dimensions.top - this.state.dimensions.top }
					toX={ this.state.dimensions.width }
					toY={ this.state.dimensions.height / 2 }
					turn={ this.state.dimensions.width - 25 }
				/>
			)
		})

		return list
	}

	renderChildren() {
		return this.props.data.body.filter(node => node.raw !== '').map((node, i) => {
			const Node = nodeByType[node.type]

			return (
				<Node
					{ ...this.props }
					style={ null }
					data={ node }
					onDimensionsChanged={ dimensions => this.childrenDimensions[i] = dimensions }
					key={ i }
				/>
			)
		})
	}

	render() {
		return (
			<div className="node disjunction" style={ this.props.style } ref={ el => this.el = el }>
				{ this.renderConnectors() }
				{ this.renderChildren() }
			</div>
		)
	}
}

export default Disjunction
