import React from 'react';
import ReactDOM from 'react-dom';
import measure from '../measure';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';
import './CharacterClass.sass';

class CharacterClass extends React.Component {
	renderChildren() {
		return this.props.data.body.map(node => {
			const Node = nodeByType[node.type];
			return (
				<Node
					data={ node }
					ref={ el => this.props.onRef(ReactDOM.findDOMNode(el), node) }
					key={ getUniqueNodeKey(node) }
				/>
			);
		});
	}

	render() {
		const classNames = ['character-class'];
		let title;

		if (this.props.data.negative) {
			classNames.push('_negative');
			title = 'None of';
		} else {
			title = 'One of';
		}

		return (
			<div className={ classNames.join(' ') }>
				<div className="character-class__title">{ title }</div>
				<div className="character-class__children">
					{ this.renderChildren() }
				</div>
			</div>
		);
	}
}

export default measure(CharacterClass);
