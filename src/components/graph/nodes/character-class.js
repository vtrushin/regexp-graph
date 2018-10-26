import React, { Fragment } from 'react'
import equal from 'deep-equal'
import getClientRect from '../../../utils/get-client-rect'
import nodeByType from '../node-by-type'
import './character-class.css'

export default class CharacterClass extends React.Component {
	constructor(props) {
		super(props)
		this.childrenDimensions = {}
		this.state = {
			dimensions: null,
			childrenDimensions: null
		}
	}

	updateDimensions() {
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
		const { data } = this.props
		const { childrenDimensions } = this.state

		let maxBaseline

		if (childrenDimensions) {
			const baselines = Object.keys(childrenDimensions).map(key => childrenDimensions[key].baseline)
			maxBaseline = Math.max(...baselines)
		}

		return data.body.map((node, i) => {
			const Node = nodeByType[node.type]
			const nodeDimensions = childrenDimensions && childrenDimensions[i]

			return (
				<Fragment key={i}>
					<div style={{ paddingTop: maxBaseline && nodeDimensions ? maxBaseline - nodeDimensions.baseline : 0 }}>
						<Node
							{...this.props}
							data={node}
							style={null}
							onDimensionsChanged={dimensions => this.childrenDimensions[i] = dimensions}
						/>
					</div>
					{i < data.body.length - 1 ? (
						<div className='character-class__delimiter' />
					) : null}
				</Fragment>
			)
		})
	}

	renderBaseline() {
		const { dimensions } = this.state

		if (dimensions) {
			return <div className='baseline' style={{ top: dimensions.baseline }} />
		}
	}

	render() {
		const { data, style } = this.props

		const classNames = ['node', 'character-class']
		let title

		if (data.negative) {
			classNames.push('_negative')
			title = 'None of'
		} else {
			title = 'One of'
		}

		return (
			<div className={classNames.join(' ')} style={style} ref={el => this.el = el}>
				<div className='character-class__title'>{ title }</div>
				<div className='character-class__children'>
					{ this.renderChildren() }
				</div>
				{/*{ this.renderBaseline() }*/}
			</div>
		)
	}
}
