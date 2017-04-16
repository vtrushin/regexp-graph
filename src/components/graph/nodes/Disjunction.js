import React from 'react';
import AbstractGraphNode from './AbstractGraphNode';
import Connector from '../connector/Connector';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';
import './Disjunction.sass';

const PADDING = 100;

export default class Disjunction extends AbstractGraphNode {
	constructor() {
		super(...arguments);
		this.state = {};
	}

	renderConnectors() {
		const {elDimensions} = this.state;

		if (!elDimensions) {
			return null;
		}

		/*if (!elDimensions || !this.state.childrenDimensions) {
			return null;
		}*/

		const list = [];

		// this.state.childrenDimensions.forEach(dimensions => {
		this.props.data.body.forEach(node => {

			console.log(1);

			const dimensions = this.childrenDimensions.get(node.raw + node.type + node.kind);

			console.log(this.childrenDimensions);

			if (!dimensions) {
				return;
			}

			list.push(
				<Connector
					key={ 'left' + dimensions.left + dimensions.top }
					fromX={ 0 }
					fromY={ elDimensions.height / 2 }
					toX={ PADDING }
					toY={ dimensions.top - elDimensions.top + dimensions.height / 2 }
				/>,
				<Connector
					key={ 'right' + dimensions.left + dimensions.top }
					fromX={ PADDING + dimensions.width }
					fromY={ dimensions.top - elDimensions.top + dimensions.height / 2 }
					toX={ elDimensions.width }
					toY={ elDimensions.height / 2 }
				/>
			)
		});

		return list;
	}

	// componentWillReceiveProps(nextProps) {
	// 	console.log(nextProps);
	// }

	renderChildren() {
		const that = this;
		const list = [];

		this.props.data.body.forEach(node => {
			const Node = nodeByType[node.type];
			const NodeEl = (
				<div className="disjunction__child-wrapper" key={ getUniqueNodeKey(node) }>
					<Node
						data={ node }
						onDimensionsChanged={ dimensions => {
							that.dimensionsHandler(node.raw + node.type + node.kind, dimensions);
						}}
					/>
				</div>
			);

			list.push(NodeEl);
		});

		// if (this.state.childDimensions) {
		// 	this.state.childDimensions.forEach((dimensions, node) => {
		// 		if (!list.includes(node)) {
		// 			this.state.childDimensions.delete(node);
		// 		}
        //
		// 		// console.log(dimensions);
		// 		// console.log(list.includes(node));
		// 	})
		// }

		return list;
	}

	render() {
		this.childrenLength = this.props.data.body.length;

		return (
			<div className="disjunction" ref={ el => this.el = el }>
				{ this.renderConnectors() }
				{ this.renderChildren() }
			</div>
		);
	}
}
