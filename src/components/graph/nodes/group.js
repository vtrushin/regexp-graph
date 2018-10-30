import React from 'react'
import equal from 'deep-equal'
import getClientRect from '../../../utils/get-client-rect'
import Connector from '../connector/connector'
import nodeByType from '../node-by-type'
import pointsToConnectors from '../points-to-connectors'
import './group.css'

export default class Group extends React.Component {
	constructor(props) {
		super(props)

		this.childrenDimensions = {}

		this.state = {
			dimensions: null,
			childrenDimensions: null
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

	render() {
		const { data, style } = this.props

		const index = data.groupIndex

		if (!data.body.length) {
			return null
		}

		return (
			<div className={`node group _${index <= 6 ? `index${index}` : 'next'} _${data.behavior}`} style={style} ref={el => this.el = el}>
				{ this.renderConnectors() }
				<div className='group__body'>
					{ data.behavior === 'normal' && (
						<div className='group__title'>
							<div className='group__title__body'>Group #{index}</div>
						</div>
					) }
					<div className='group__children'>
						{ this.renderChildren() }
					</div>
				</div>
				{/*{ this.renderBaseline() }*/}
			</div>
		)
	}

	renderConnectors() {
		const { data } = this.props
		const { dimensions: stateDimensions, childrenDimensions } = this.state

		if (!childrenDimensions || !data.body.length) {
			return null
		}

		const dimensions = []

		data.body.filter(node => node.raw !== '').forEach((node, i) => {
			const nodeDimensions = childrenDimensions[i]
			if (nodeDimensions) {
				dimensions.push({
					left: nodeDimensions.rect.left - stateDimensions.rect.left,
					right: nodeDimensions.rect.right - stateDimensions.rect.left,
					baseline: nodeDimensions.baseline + nodeDimensions.rect.top - stateDimensions.rect.top
				})
			}
		})

		let connectors = []

		if (childrenDimensions[0]) {
			connectors.push(
				<Connector
					key={0}
					fromX={0}
					fromY={stateDimensions.baseline}
					toX={childrenDimensions[0].rect.left - stateDimensions.rect.left}
					toY={childrenDimensions[0].baseline + childrenDimensions[0].rect.top - stateDimensions.rect.top}
				/>
			)
		}

		const points = pointsToConnectors(dimensions)

		if (points) {
			connectors.push(
				points.map(connector => (
					<Connector
						key={`${connector.start.x}:${connector.start.y}:${connector.end.x}:${connector.end.y}`}
						fromX={connector.start.x}
						fromY={connector.start.y}
						toX={connector.end.x}
						toY={connector.end.y}
					/>
				)
			))
		}

		if (childrenDimensions[data.body.length - 1]) {
			connectors.push(
				<Connector
					key={1}
					fromX={childrenDimensions[data.body.length - 1].rect.right - stateDimensions.rect.left }
					fromY={childrenDimensions[data.body.length - 1].baseline + childrenDimensions[data.body.length - 1].rect.top - stateDimensions.rect.top }
					toX={stateDimensions.rect.width}
					toY={stateDimensions.baseline}
				/>
			)
		}

		return connectors
	}

	renderChildren() {
		const { data } = this.props
		const { childrenDimensions } = this.state

		// console.log('childrenDimensions', childrenDimensions)

		let maxBaseline

		if (childrenDimensions) {
			const childrenBaselines = Object.entries(childrenDimensions).map(([key, value]) => value.baseline)
			maxBaseline = Math.max(...childrenBaselines)
		}

		return data.body.map((node, i) => {
			const Node = nodeByType[node.type]
			const nodeDimensions = childrenDimensions && childrenDimensions[i]

			return (
				<Node
					{...this.props}
					style={{ marginTop: maxBaseline && nodeDimensions ? maxBaseline - nodeDimensions.baseline: 0 }}
					data={node}
					onDimensionsChanged={dimensions => this.childrenDimensions[i] = dimensions}
					key={i}
				/>
			)
		})
	}

	renderBaseline() {
		const { dimensions } = this.state

		if (dimensions) {
			return <div className='baseline' style={{ top: dimensions.baseline }} />
		}

		return null
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
}
