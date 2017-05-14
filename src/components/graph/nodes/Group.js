import { Component } from 'react'
import equal from 'deep-equal'
import rectToObject from '../../../utils/rect-to-object'
import nodeByType from '../node-by-type'
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

		return (
			<div
				className={ `node group _${index} _${this.props.data.behavior}` } style={ this.props.style } ref={ el => this.el = el }>
				<div className="group__title">#{ index }</div>
				<div className="group__children">
					{ this.renderChildren() }
				</div>
				{ this.renderBaseline() }
			</div>
		)
	}
}
