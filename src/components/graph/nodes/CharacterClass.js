import { Component } from 'react'
import nodeByType from '../node-by-type'
import equal from 'deep-equal'
import './CharacterClass.sass'

class CharacterClass extends Component {
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
				<div
					className="character-class__child-wrapper"
					style={{ marginTop: maxBaseline && nodeDimensions ? maxBaseline - nodeDimensions.baseline : 0 }}
					key={ i }
				>
					<Node
						{ ...this.props }
						data={ node }
						onDimensionsChanged={ dimensions => this.childrenDimensions[i] = dimensions }
					/>
				</div>
			)
		})
	}

	render() {
		const classNames = ['node', 'character-class']
		let title

		if (this.props.data.negative) {
			classNames.push('_negative')
			title = 'None of'
		} else {
			title = 'One of'
		}

		return (
			<div className={ classNames.join(' ') } style={ this.props.style } ref={ el => this.el = el }>
				<div className="character-class__title">{ title }</div>
				<div className="character-class__children" ref={ el => this.childrenBody = el }>
					{ this.renderChildren() }
				</div>
			</div>
		)
	}
}

export default CharacterClass
