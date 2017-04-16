import React from 'react';
// import Measure from 'react-measure';
// import clone from 'clone';
import AbstractGraphNode from './AbstractGraphNode';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';
import './Alternative.sass';

export default class Alternative extends AbstractGraphNode {
	constructor() {
		super();
		this.state = {
			width: 0,
			height: 0
		};
	}

	render() {
		return (
			<div className="alternative" ref={ el => this.el = el }>
				<div className="alternative__children">
					{ this.props.data.body.map(node => {
						const Node = nodeByType[node.type];
						return <Node data={ node } key={ getUniqueNodeKey(node) } />;
					}) }
				</div>
			</div>
		);
	}
}
