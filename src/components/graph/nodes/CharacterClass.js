import { Component } from 'react'
import ReactDOM from 'react-dom'
import measure from '../measure4'
import nodeByType from '../node-by-type'
import getNodeValues from '../get-node-values'
import './CharacterClass.sass'

class CharacterClass extends Component {
	renderChildren() {
		return this.props.data.body.map(node => {
			const Node = nodeByType[node.type]
			return (
				<div className="character-class__child-wrapper" key={ getNodeValues(node) }>
					<Node
						{ ...this.props }
						data={ node }
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
			<div className={ classNames.join(' ') }>
				<div className="character-class__title">{ title }</div>
				<div className="character-class__children" ref={ this.props.onRef }>
					{ this.renderChildren() }
				</div>
			</div>
		)
	}
}

export default measure(CharacterClass)
