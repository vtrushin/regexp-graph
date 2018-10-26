import React from 'react'
import propTypes from 'prop-types'
import equal from 'deep-equal'
import getClientRect from '../../utils/get-client-rect'
import Connector from './connector/connector'
import nodeByType from './node-by-type'
import './graph.css'

const { object, func } = propTypes

const pointRadius = 8
const pointStrokeWidth = 2

export default class Graph extends React.Component {
	static propTypes = {
		data: object,
		onDimensionsChanged: func
	}

	constructor(props) {
		super(props)

		this.childDimensions = null

		this.state = {
			dimensions: null,
			childDimensions: null
		}
	}

	componentDidUpdate() {
		if (!equal(this.childDimensions, this.state.childDimensions)) {
			this.updateDimensions()
		}
	}

	componentDidMount() {
		this.updateDimensions()
	}

	render() {
		const { data } = this.props

		const Node = nodeByType[data.type]

		return (
			<div className='graph' ref={el => this.el = el}>
				<div className='graph__body'>
					{ this.renderPoint() }
					{ this.renderLeftConnector() }
					<Node
						{...this.props}
						data={data}
						onDimensionsChanged={dimensions => this.childDimensions = dimensions}
					/>
					{ this.renderRightConnector() }
					{ this.renderPoint() }
				</div>
			</div>
		)
	}

	renderPoint() {
		const { childDimensions } = this.state

		const baseline = childDimensions ? childDimensions.baseline : 0
		const size = pointRadius * 2 + pointStrokeWidth

		return (
			<svg width={size} height={size} className='graph__point' style={{ marginTop: baseline - (pointRadius + pointStrokeWidth / 2) }}>
				<circle
					cx={pointRadius + pointStrokeWidth / 2}
					cy={pointRadius + pointStrokeWidth / 2}
					r={pointRadius}
					strokeWidth={pointStrokeWidth}
				/>
			</svg>
		)
	}

	renderLeftConnector() {
		const { dimensions, childDimensions } = this.state

		if (!dimensions || !childDimensions) {
			return null;
		}

		return (
			<Connector
				fromX={pointRadius * 2 + pointStrokeWidth}
				fromY={childDimensions.baseline}
				toX={childDimensions.rect.left - dimensions.rect.left}
				toY={childDimensions.baseline}
			/>
		)
	}

	renderRightConnector() {
		const { dimensions, childDimensions } = this.state

		if (!dimensions || !childDimensions) {
			return null;
		}

		return (
			<Connector
				fromX={childDimensions.rect.right - dimensions.rect.left}
				fromY={childDimensions.baseline}
				toX={dimensions.rect.width - (pointRadius * 2 + pointStrokeWidth)}
				toY={childDimensions.baseline}
			/>
		)
	}

	updateDimensions() {
		const { onDimensionsChanged } = this.props

		const rootRect = getClientRect(this.el)
		const baseline = this.childDimensions.baseline + this.childDimensions.rect.top - rootRect.top
		const dimensions = {
			rect: { ...rootRect },
			baseline
		}

		this.setState({
			dimensions,
			childDimensions: { ...this.childDimensions }
		})

		if (onDimensionsChanged) {
			onDimensionsChanged(dimensions)
		}
	}
}
