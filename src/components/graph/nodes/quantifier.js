import React from 'react'
import equal from 'deep-equal'
import getClientRect from '../../../utils/get-client-rect'
import Connector from '../connector/connector'
import nodeByType from '../node-by-type'
import './quantifier.css'

export default class Quantifier extends React.Component {
	constructor(props) {
		super(props)
		this.childDimensions = null
		this.state = {
			dimensions: null,
			childDimensions: null
		}
	}

	updateDimensions() {
		const parentRect = getClientRect(this.el)
		const baseline = this.childDimensions
			? this.childDimensions.baseline + this.childDimensions.rect.top - parentRect.top
			: parentRect.top

		const dimensions = {
			rect: { ...parentRect },
			baseline
		}

		this.setState({
			dimensions,
			childDimensions: this.childDimensions
		})

		if (this.props.onDimensionsChanged) {
			this.props.onDimensionsChanged(dimensions)
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

	renderConnector() {
		if (!this.state.dimensions || !this.state.childDimensions) {
			return
		}

		return (
			<Connector
				key={ 0 }
				fromX={ this.state.childDimensions.rect.right - this.state.dimensions.rect.left }
				fromY={ this.state.dimensions.baseline }
				toX={ this.state.dimensions.rect.width }
				toY={ this.state.dimensions.baseline }
			/>
		)
	}

	renderChild() {
		const node = this.props.data.body[0]
		const Node = nodeByType[node.type]

		return (
			<Node
				{ ...this.props }
				style={ null }
				data={ node }
				onDimensionsChanged={ dimensions => this.childDimensions = dimensions }
			/>
		)
	}

	renderDescription() {
		let text

		const { /*greedy, */min, max } = this.props.data

		if (!isNaN(min) && !isNaN(max) && min !== max) {
			text = `${min}…${max} times`
		} else if (!isNaN(min)) {
			text = `${min}+ times`
		} else if (!isNaN(max)) {
			text = `max ${max} times`
		}

		return (
			<div className="quantifier__description">{ text }</div>
		)
	}

	render() {
		if (!this.props.data.body) {
			return null
		}

		return (
			<div className={ `node quantifier _${this.props.data.behavior}` } style={ this.props.style } ref={ el => this.el = el }>
				{ this.renderConnector() }
				{ this.renderChild() }
				{ this.renderDescription() }
			</div>
		)
	}
}
