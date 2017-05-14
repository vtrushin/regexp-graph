import { Component } from 'react'
import nodeByType from '../node-by-type'
import equal from 'deep-equal'
import './Quantifier.sass'

export default class Quantifier extends Component {
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

	renderDescription() {
		let text

		const { min, max } = this.props.data

		if (min && max && min !== max) {
			text = `${min}…${max} times`
		} else if (min) {
			text = `${min}+ times`
		} else if (max) {
			text = `max ${max} times`
		}

		return (
			<div className="quantifier__description">{ text }</div>
		)
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

	render() {
		return (
			<div className={ `node quantifier _${this.props.data.behavior}` } style={ this.props.style } ref={ el => this.el = el }>
				<div className="quantifier__children">
					<div className="quantifier__children-body" ref={ el => this.childrenBody = el }>
						{ this.renderChildren() }
					</div>
				</div>
				{ this.renderDescription() }
			</div>
		)
	}
}
