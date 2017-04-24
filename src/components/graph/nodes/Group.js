import React from 'react';
import ReactDOM from 'react-dom';
import measure from '../measure';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';
import './Group.sass';

class Group extends React.Component {
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
		return (
			<div className={ `group _${this.props.data.behavior}` }>
				<div className="group__children">
					{ this.renderChildren() }
				</div>
			</div>
		);
	}
}

export default measure(Group);
