import React from 'react';
import ReactDOM from 'react-dom';
import measure from '../measure';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';
import './Alternative.sass';

class Alternative extends React.Component {
	renderChildren() {
		return this.props.data.body.filter(node => node.raw !== '').map(node => {
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
			<div className="alternative">
				<div className="alternative__children">
					{ this.renderChildren() }
				</div>
			</div>
		);
	}
}

export default measure(Alternative);
