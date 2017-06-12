import { Component } from 'react'
import equal from 'deep-equal'
import rectToObject from '../../../utils/rect-to-object'
import Connector from '../connector/Connector'
import nodeByType from '../node-by-type'
import pointsToConnectors from '../points-to-connectors'
import './Group.sass'

export default class Group extends Component {
	constructor(props) {
		super(props)
		this.childrenDimensions = {}
		this.state = {
			dimensions: null,
			childrenDimensions: null
		}
	}

	updateDimensions() {
		const parentRect = rectToObject(this.el.getBoundingClientRect())
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
		if (!this.state.childrenDimensions || !this.props.data.body.length) {
			return
		}

		const dimensions = []

		this.props.data.body.filter(node => node.raw !== '').forEach((node, i) => {
			const nodeDimensions = this.state.childrenDimensions[i]
			if (nodeDimensions) {
				dimensions.push({
					left: nodeDimensions.rect.left - this.state.dimensions.rect.left,
					right: nodeDimensions.rect.right - this.state.dimensions.rect.left,
					baseline: nodeDimensions.baseline + nodeDimensions.rect.top - this.state.dimensions.rect.top
				})
			}
		})

		let connectors = []

		if (this.state.childrenDimensions[0]) {
			connectors.push(
				<Connector
					key={ 0 }
					fromX={ 0 }
					fromY={ this.state.dimensions.baseline }
					toX={ this.state.childrenDimensions[0].rect.left - this.state.dimensions.rect.left }
					toY={ this.state.childrenDimensions[0].baseline + this.state.childrenDimensions[0].rect.top - this.state.dimensions.rect.top }
				/>
			)
		}

		const points = pointsToConnectors(dimensions)

		if (points) {
			connectors.push(
				points.map(connector => (
					<Connector
						key={ `${connector.start.x}:${connector.start.y}:${connector.end.x}:${connector.end.y}` }
						fromX={ connector.start.x }
						fromY={ connector.start.y }
						toX={ connector.end.x }
						toY={ connector.end.y }
					/>
				)
			))
		}

		if (this.state.childrenDimensions[this.props.data.body.length - 1]) {
			connectors.push(
				<Connector
					key={ 1 }
					fromX={ this.state.childrenDimensions[this.props.data.body.length - 1].rect.right - this.state.dimensions.rect.left }
					fromY={ this.state.childrenDimensions[this.props.data.body.length - 1].baseline + this.state.childrenDimensions[this.props.data.body.length - 1].rect.top - this.state.dimensions.rect.top }
					toX={ this.state.dimensions.rect.width }
					toY={ this.state.dimensions.baseline }
				/>
			)
		}

		return connectors
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
					style={{ marginTop: maxBaseline && nodeDimensions ? maxBaseline - nodeDimensions.baseline: 0 }}
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
		const index = this.props.data.groupIndex

		if (!this.props.data.body.length) {
			return null
		}

		return (
			<div className={ `node group _${ index <= 6 ? index : 'next' } _${this.props.data.behavior}` } style={ this.props.style } ref={ el => this.el = el }>
				{ this.renderConnectors() }
				<div className="group__body">
					{ this.props.data.behavior === 'normal' && <div className="group__title">Group #{ index }</div> }
					<div className="group__children">
						{ this.renderChildren() }
					</div>
				</div>
				{/*{ this.renderBaseline() }*/}
			</div>
		)
	}
}
