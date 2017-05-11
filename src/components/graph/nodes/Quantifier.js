import { Component } from 'react'
import ReactDOM from 'react-dom'
import measure from '../measure2'
import nodeByType from '../node-by-type'
import getNodeValues from '../get-node-values'
import './Quantifier.sass'

class Quantifier extends Component {
	constructor(props) {
		super(props)

		this.onRef = this.onRef.bind(this)
	}

	onRef(el) {
		this.el = el
		this.props.onRef(el)
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
		return this.props.data.body.map(node => {
			const Node = nodeByType[node.type]
			return (
				<Node
					{ ...this.props }
					data={ node }
					key={ getNodeValues(node) }
				/>
			)
		})
	}

	render() {
		return (
			<div className={ `node quantifier _${this.props.data.behavior}` }>
				<div className="quantifier__children">
					<div className="quantifier__children-body" ref={ this.onRef }>
						{ this.renderChildren() }
					</div>
				</div>
				{ this.renderDescription() }
			</div>
		)
	}
}

export default Quantifier
