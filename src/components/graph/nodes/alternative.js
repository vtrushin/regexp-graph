import React from 'react'
import equal from 'deep-equal'
import getClientRect from '../../../utils/get-client-rect'
import Connector from '../connector/connector'
import nodeByType from '../node-by-type'
import pointsToConnectors from '../points-to-connectors'
import './alternative.css'
import md5 from 'js-md5'

export default class Alternative extends React.Component {
	constructor(props) {
		super(props)
		this.childrenDimensions = {}
		this.state = {
			dimensions: null,
			childrenDimensions: null
		}
	}

	updateDimensions() {
		const { onDimensionsChanged } = this.props

		const parentRect = getClientRect(this.el)
		const baselines = Object.keys(this.childrenDimensions).map(key => {
			const { baseline, rect: { top } } = this.childrenDimensions[key]
			return baseline + top - parentRect.top
		})
		const dimensions = {
			rect: { ...parentRect },
			baseline: Math.max(...baselines)
		}

		this.setState({
			dimensions,
			childrenDimensions: { ...this.childrenDimensions }
		})

		if (onDimensionsChanged) {
			onDimensionsChanged(dimensions)
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
		const { data } = this.props
		const { dimensions, childrenDimensions } = this.state

		if (!this.state.childrenDimensions) {
			return
		}

		const collectedDimensions = []

		data.body.filter(node => node.raw !== '').forEach((node, i) => {
			const nodeDimensions = childrenDimensions[i]
			if (nodeDimensions) {
				collectedDimensions.push({
					left: nodeDimensions.rect.left - dimensions.rect.left,
					right: nodeDimensions.rect.right - dimensions.rect.left,
					baseline: nodeDimensions.baseline + nodeDimensions.rect.top - dimensions.rect.top
				})
			}
		})

		return pointsToConnectors(collectedDimensions).map(connector => (
			<Connector
				key={`${connector.start.x}:${connector.start.y}:${connector.end.x}:${connector.end.y}`}
				fromX={connector.start.x}
				fromY={connector.start.y}
				toX={connector.end.x}
				toY={connector.end.y}
			/>
		))
	}



	renderChildren() {
		const { data } = this.props
		const { childrenDimensions } = this.state

		let maxBaseline

		if (childrenDimensions) {
			const baselines = Object.keys(childrenDimensions).map(key => childrenDimensions[key].baseline)
			maxBaseline = Math.max(...baselines)
		}

		// const groups = data.body.reduce((acc, node) => {
		// 	if (node.type === 'value') {
		// 		const prevAcc = acc[acc.length - 1]
		// 		if (prevAcc && prevAcc.type === 'values') {
		// 			prevAcc.body.push(node)
		// 			return acc
		// 		} else {
		// 			return [...acc, {
		// 				type: 'values',
		// 				body: [node]
		// 			}]
		// 		}
		// 	} else {
		// 		return [...acc, node]
		// 	}
		// }, []);
		//
		// return groups.map((node, i) => (
		// 	node.type === 'values'
		// 		? this.renderValuesGroup({ node, i, childrenDimensions, maxBaseline })
		// 		: this.renderNode({ node, i, childrenDimensions, maxBaseline })
		// ))

		return data.body.map((node, i) => {
			const Node = nodeByType[node.type]
			const nodeDimensions = childrenDimensions && childrenDimensions[i]

			return (
				<Node
					key={i}
					{...this.props}
					style={{ marginTop: maxBaseline && nodeDimensions ? maxBaseline - nodeDimensions.baseline : 0 }}
					data={node}
					onDimensionsChanged={dimensions => this.childrenDimensions[i] = dimensions}
				/>
			)
		})
	}

	renderValuesGroup({ node, i, childrenDimensions, maxBaseline }) {
		const Node = nodeByType[node.type]
		const nodeDimensions = childrenDimensions && childrenDimensions[i]

		return (
			<div>
				{node.body.map((node, i) => (
					<Node
						key={i}
						{...this.props}
						style={{ marginTop: maxBaseline && nodeDimensions ? maxBaseline - nodeDimensions.baseline : 0 }}
						data={node}
						onDimensionsChanged={dimensions => this.childrenDimensions[i] = dimensions}
					/>
				))}
			</div>
		);
	}

	renderNode({ node, i, childrenDimensions, maxBaseline }) {
		const Node = nodeByType[node.type]
		const nodeDimensions = childrenDimensions && childrenDimensions[i]

		return (
			<Node
				key={i}
				{...this.props}
				style={{ marginTop: maxBaseline && nodeDimensions ? maxBaseline - nodeDimensions.baseline : 0 }}
				data={node}
				onDimensionsChanged={dimensions => this.childrenDimensions[i] = dimensions}
			/>
		)
	}

	renderBaseline() {
		const { dimensions } = this.state

		if (dimensions) {
			return <div className="baseline" style={{ top: dimensions.baseline }} />
		}
	}

	render() {
		return (
			<div className='node alternative' style={this.props.style} ref={el => this.el = el}>
				{ this.renderConnectors() }
				<div className="alternative__children">
					{ this.renderChildren() }
				</div>
				{/*{ this.renderBaseline() }*/}
			</div>
		)
	}
}
