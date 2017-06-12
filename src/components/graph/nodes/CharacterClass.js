import { Component } from 'react'
import equal from 'deep-equal'
import rectToObject from '../../../utils/rect-to-object'
import nodeByType from '../node-by-type'
import './CharacterClass.sass'

export default class CharacterClass extends Component {
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
				<div
					className="character-class__child-wrapper"
					style={{ paddingTop: maxBaseline && nodeDimensions ? maxBaseline - nodeDimensions.baseline : 0 }}
					key={ i }
				>
					<Node
						{ ...this.props }
						style={ null }
						data={ node }
						onDimensionsChanged={ dimensions => this.childrenDimensions[i] = dimensions }
					/>
				</div>
			)
		})
	}

	renderBaseline() {
		if (this.state.dimensions) {
			return <div className="baseline" style={{ top: this.state.dimensions.baseline }}></div>
		}
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
				<div className="character-class__children">
					{ this.renderChildren() }
				</div>
				{/*{ this.renderBaseline() }*/}
			</div>
		)
	}
}
