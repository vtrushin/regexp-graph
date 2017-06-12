import { Component } from 'react'
import equal from 'deep-equal'
import rectToObject from '../../utils/rect-to-object'
import Connector from './connector/Connector'
import nodeByType from './node-by-type'
import './Graph.sass'

function renderPoint(marginTop = 0) {
	const radius = 8
	const strokeWidth = 2
	const size = radius * 2 + strokeWidth

	return (
		<svg width={ size } height={ size } className="graph__point" style={{ marginTop: marginTop - radius - strokeWidth / 2 }}>
			<circle
				cx={ radius + strokeWidth / 2 }
				cy={ radius + strokeWidth / 2 }
				r={ radius }
				strokeWidth={ strokeWidth }
			/>
		</svg>
	)
}

export default class Graph extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dimensions: null,
			childDimensions: null
		}
	}

	updateDimensions() {
		const parentRect = rectToObject(this.el.getBoundingClientRect())
		const baseline = this.childDimensions.baseline + this.childDimensions.rect.top - parentRect.top
		const dimensions = {
			rect: { ...parentRect },
			baseline
		}

		this.setState({
			dimensions,
			childDimensions: { ...this.childDimensions }
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

	render() {
		const { data } = this.props
		const Node = nodeByType[data.type]

		return (
			<div className="graph" ref={ el => this.el = el }>
				<div className="graph__body">
					{ renderPoint(this.state.childDimensions && this.state.childDimensions.baseline) }
					{ this.state.dimensions && this.state.childDimensions && (
						<Connector
							fromX={ 18 }
							fromY={ this.state.childDimensions.baseline }
							toX={ this.state.childDimensions.rect.left - this.state.dimensions.rect.left }
							toY={ this.state.childDimensions.baseline }
						/>
					) }
					<Node
						{ ...this.props }
						data={ data }
						onDimensionsChanged={ dimensions => this.childDimensions = dimensions }
					/>
					{ this.state.dimensions && this.state.childDimensions && (
						<Connector
							fromX={ this.state.childDimensions.rect.right - this.state.dimensions.rect.left }
							fromY={ this.state.childDimensions.baseline }
							toX={ this.state.dimensions.rect.width - 18 }
							toY={ this.state.childDimensions.baseline }
						/>
					) }
					{ renderPoint(this.state.childDimensions && this.state.childDimensions.baseline) }
				</div>
			</div>
		)
	}
}
