import React from 'react';
import ReactDOM from 'react-dom';
import measure from '../measure';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';
import './Quantifier.sass';

class Quantifier extends React.Component {
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
			<div className={ `quantifier _${this.props.data.behavior}` }>
				<div className="quantifier__children">
					{ this.renderChildren() }
				</div>
				<span>min: { this.props.data.min }, max: { this.props.data.max }</span>
			</div>
		);
	}
}

export default measure(Quantifier);
