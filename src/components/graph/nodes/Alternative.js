import { Component } from 'react'
import ReactDOM from 'react-dom'
import Connector from '../connector/Connector'
import measure from '../measure5'
import nodeByType from '../node-by-type'
import getUniqueNodeId from '../get-unique-node-id'
import pointsToConnectors from '../points-to-connectors'
import equal from 'deep-equal'
import * as actions from '../../../actions'
import './Alternative.sass'

class Alternative extends Component {
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
		if (!this.el || !this.props.dimensions) {
			return
		}

		const containerRect = this.el.getBoundingClientRect()
		const dimensions = []

		this.props.data.body.filter(node => node.raw !== '').forEach(node => {
			const nodeDimensions = this.props.dimensions[getUniqueNodeId(node)]

			if (!nodeDimensions) {
				return
			}

			// const rect = el.getBoundingClientRect()
            //
			// const nodeDimensions = {
			// 	startX: rect.left,
			// 	endX: rect.right,
			// 	y: containerRect.top + containerRect.height / 2
			// }

			nodeDimensions.push(nodeDimensions)
		})

		return pointsToConnectors(dimensions).map(connector => (
			<Connector
				key={ `${connector.start.x}:${connector.start.y}:${connector.end.x}:${connector.end.y}` }
				fromX={ connector.start.x - containerRect.left }
				fromY={ connector.start.y - containerRect.top }
				toX={ connector.end.x - containerRect.left }
				toY={ connector.end.y - containerRect.top }
			/>
		))
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
		return (
			<div className="node alternative" style={ this.props.style } ref={ el => this.el = el }>
				<div className="alternative__children" ref={ el => this.childrenBody = el }>
					{/*{ this.renderConnectors() }*/}
					{ this.renderChildren() }
				</div>
				{ this.renderBaseline() }
			</div>
		)
	}
}

export default Alternative
