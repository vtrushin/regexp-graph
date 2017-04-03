import clone from 'clone';
import React from 'react';
import Node from "../node/Node";
import Measure from 'react-measure';

const horizontalGap = 50;
const verticalGap = 50;

function assertFn(obj1, obj2) {
	return (
		obj1.type === obj2.type
		&& obj1.kind === obj2.kind
		&& obj1.raw === obj2.raw
		&& obj1.range.join('') === obj2.range.join('')
	)
}

function findNode(tree, fn) {
	function process(node) {
		if (fn(node)) {
			return node;
		}

		if ('body' in node) {
			for (let childNode of node.body) {
				const findChild = process(childNode);
				if (findChild) {
					return findChild;
				}
			}
			return null;
		}

		return null;
	}

	return process(tree);
}

/*function treeToList(node) {
	const list = [];

	function process(node) {
		if (node.body) {
			node.body.forEach(childNode => {
				process(childNode);
			});
		}

		list.push(node);

		return node;
	}

	process(node);

	return list;
}*/

export default class Graph extends React.Component {

	static propTypes = {
		tree: React.PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			tree: null
		};

		this.renderItem = this.renderItem.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			tree: nextProps.tree
		});
	}

	renderItem() {
		if (!this.state.tree) {
			return null;
		}

		var that = this;

		let tree = clone(this.state.tree);
		// const tree = this.state.tree;

		const list = [];

		const process = (node, contextPosition) => {
			// const style = contextPosition
			// 	? { left: contextPosition.left + 'px', top: contextPosition.top + 'px' }
			// 	: { left: Math.random() + 'px', top: Math.random() };

			if ('body' in node) {
				let left = 0;
				let top = 0;

				if (contextPosition) {
					left = contextPosition.left;
					top = contextPosition.top;
				}

				node.body.forEach((childNode, i) => {
					if (childNode.dimensions) {
						left += childNode.dimensions.width + horizontalGap;
					}

					process(childNode, { left, top });

					left += 100;
				});
			}

			list.push(
				<Measure
					key={ node.type + node.range.join('') + node.kind + node.codePoint }
				>
					{ dimensions => {
						return <Node
							// key={ node.type + node.range.join('') + node.kind + node.codePoint }
							text={ node.type + node.width }
							/*onDimensionsChanged={ (width, height) => {
							 const newTree = clone(that.state.tree);
							 const findTreeNode = findNode(newTree, newTreeNode => assertFn(node, newTreeNode));

							 debugger;

							 findTreeNode.dimensions = {
							 width,
							 height
							 };

							 that.setState({
							 tree: newTree
							 });
							 }}*/
							style={{
								position: 'absolute',
								left: dimensions.width + 'px'
							}}
						/>
					}}
				</Measure>
			);
		};

		process(tree, null);

		console.log(list);

		return list;

		/*if (tree) {
			return treeToList(tree, 'body').map(node =>
				node.type
					? <Node
					key={ Math.random() * 100000 }
					text={ node.type }
					style={{ margin: '0 10px' }}
				/>
					: null
			);
		}*/
	}

	render() {
		return (
			<div>
				{ this.renderItem() }
			</div>
		)
	}

}
