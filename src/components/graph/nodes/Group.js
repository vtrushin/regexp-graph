import React from 'react';
import AbstractGraphNode from './AbstractGraphNode';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';
import './Group.sass';

export default class Group extends AbstractGraphNode {

	renderChildren() {
		const that = this;
		const children = [];

		this.props.data.body.forEach(node => {
			const Node = nodeByType[node.type];
			children.push(
				<Node
					data={ node }
					key={ getUniqueNodeKey(node) }
					onDimensionsChanged={ dimensions => {
						that.dimensionsHandler(node, dimensions);
					}}
				/>
			);
		});

		this.childrenLength = children.length;
		return children;
	}

	render() {
		let dimensions = null;

		if (this.state && this.state.childrenDimensions) {
			dimensions = [...(this.state.childrenDimensions.values())];
		}

		console.log(1, dimensions, this.state.parentDimensions);

		return (
			<div className={ `group _${this.props.data.behavior}` } ref={ el => this.el = el }>

				<div className="group__children">
					{ this.renderChildren() }
				</div>
			</div>
		);
	}
}
