import React from 'react'
import equal from 'deep-equal'
import getClientRect from '../../../utils/get-client-rect'
import styles from './value.css'

const specials = new Map([
	[8, 'boundary'],
	[9, 'tab'],
	[10, 'new line'],
	[11, 'vertical tab'],
	[13, 'caret return'],
	[32, 'space']
])

export default class Value extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dimensions: null
		}
	}

	updateDimensions(rect) {
		const { onDimensionsChanged } = this.props

		const dimensions = {
			rect: { ...rect },
			baseline: rect.height / 2
		}

		this.setState({ dimensions })

		if (onDimensionsChanged) {
			onDimensionsChanged(dimensions)
		}
	}

	componentDidMount() {
		const rect = getClientRect(this.el)
		this.updateDimensions(rect)
	}

	componentDidUpdate() {
		const rect = getClientRect(this.el)
		if (!equal(rect, this.state.dimensions.rect)) {
			this.updateDimensions(rect)
		}
	}

	renderSymbol() {
		const { data } = this.props

		return specials.has(data.codePoint)
			? (
				<span className={styles.value__special}>
					{ specials.get(data.codePoint) }
				</span>
			)
			: data.raw
	}

	renderBaseline() {
		const { dimensions } = this.state

		if (dimensions) {
			return <div className='value__baseline' style={{ top: dimensions.baseline }} />
		}
	}

	render() {
		return (
			<div className='node value' style={this.props.style} ref={el => this.el = el}>
				<div className='value__body'>
					{ this.renderSymbol() }
				</div>
				{ this.renderBaseline() }
			</div>
		)
	}
}
