import {createElement, setStyles} from '../src/utils/element';
import {path, moveTo, lineTo} from '../src/utils/svg-path';
import './index.sass';

/*const tree = {
	type: 'alternative',
	body: [
		{
			type: 'characterClass',
			body: [
				{
					type: 'characterClassRange',
					min: {
						type: 'value',
						value: '0'
					},
					max: {
						type: 'value',
						value: '9'
					}
				},
				{
					type: 'value',
					value: 'b'
				},
				{
					type: 'value',
					value: 'c'
				},
				{
					type: 'value',
					value: 'd'
				},
				{
					type: 'value',
					value: ' '
				}
			]
		},
		{
			type: 'group',
			body: [
				{ type: 'value', value: 'ABA' },
				{ type: 'value', value: 'ABB' },
				{ type: 'value', value: 'ABC' },
				/!*{
				 type: 'group',
				 body: [
				 { type: 'value', value: 'ABBA' },
				 { type: 'value', value: 'ABBB' }
				 ]
				 }*!/
			]
		},
		{ type: 'value', value: 'AC' }
	]
};*/
const tree = {
	type: 'alternative',
	body: [
		{
			type: 'value',
			value: 'b'
		},
		{
			type: 'value',
			value: 'c'
		},
		{
			type: 'value',
			value: 'Длинный текст'
		}
	]
};

function createConnector(fromX, fromY, toX, toY) {
	const strokeWidth = 20;
	const width = Math.abs(fromX - toX);
	const height = Math.abs(fromY - toY) + strokeWidth;
	const centerX = fromX + (toX - fromX) / 2;
	const minX = Math.min(fromX, toX);
	const minY = Math.min(fromY, toY);

	const svgEl = createElement('svg:svg', {
		width,
		height,
		style: {
			position: 'absolute',
			left: minX + 'px',
			top: minY - strokeWidth / 2 + 'px'
		}
	});

	const pathEl = createElement('svg:path', {
		strokeWidth,
		fill: 'none',
		stroke: 'red',
		d: path(
			moveTo(fromX - minX, fromY - minY + strokeWidth / 2),
			lineTo(centerX - minX, fromY - minY + strokeWidth / 2),
			lineTo(centerX - minX, toY - minY + strokeWidth / 2),
			lineTo(toX - minX, toY - minY + strokeWidth / 2)
		)
	});

	svgEl.appendChild(pathEl);

	return svgEl;
}

function processValue(node, parentNode) {
	let className = 'value';
	let content = node.value;

	switch (node.value) {
		case ' ': {
			className += ' _special';
			content = 'SPACE';
			break;
		}
	}

	const el = createElement('div', { className });
	el.textContent = content;

	return el;
}

function processAlternative(node, parentNode, precessNextCallback) {
	const groupEl = createElement('div', { className: 'alternative' });

	if ('body' in node) {
		let childGroupEl = createElement('div', {
			className: 'alternative-children',
			style: {
				position: 'relative'
			}
		});

		groupEl.appendChild(childGroupEl);

		let groupHeight = 0;
		let groupWidth = 0;

		node.body.forEach(child => {
			const childEl = precessNextCallback(child, node);
			setStyles(childEl, {
				position: 'absolute',
				left: 20 + 'px',
				top: 0
			});
			childGroupEl.appendChild(childEl);
			setTimeout(() => {
				const width = childEl.clientWidth;
				const height = childEl.clientHeight;

				setStyles(childEl, {
					position: 'absolute',
					top: groupHeight + 'px'
				});

				childGroupEl.appendChild(createConnector(0, groupHeight / 2, 20, groupHeight + height / 2));
				childGroupEl.appendChild(createConnector(groupWidth, groupHeight / 2, groupWidth - 20, groupHeight + height / 2));

				groupHeight += height + 10;
				groupWidth = Math.max(groupWidth, width);

				setStyles(groupEl, {
					width: groupWidth + 'px',
					height: groupHeight + 'px'
				});

				console.log(width, height);
			}, 0);
		});
	}

	return groupEl;
}

function processCharacterClassRange(node, parentNode, precessNextCallback) {
	const content = node.min.value + '—' + node.max.value;
	const el = createElement('div', { className: 'value' });
	el.textContent = content;

	return el;
}

function processCharacterClass(node, parentNode, precessNextCallback) {
	const groupEl = createElement('div', { className: 'character-class' });
	const titleEl = createElement('div', { className: 'character-class-title' });
	titleEl.textContent = 'One of';
	groupEl.appendChild(titleEl);

	if ('body' in node) {
		const childGroupEl = createElement('div', { className: 'character-class-children' });
		node.body.forEach(child => {
			let childEl = precessNextCallback(child, node);
			childGroupEl.appendChild(childEl);
		});
		groupEl.appendChild(childGroupEl);
	}

	return groupEl;
}

function processGroup(node, parentNode, precessNextCallback) {
	const groupEl = createElement('div', { className: 'group' });

	if ('body' in node) {
		const childGroupEl = createElement('div', { className: 'group-children' });
		node.body.forEach(child => {
			let childEl = precessNextCallback(child, node);
			childGroupEl.appendChild(childEl);
		});
		groupEl.appendChild(childGroupEl);
	}

	return groupEl;
}



const nodeWidth = 60;
const verticalGap = 20;
const horizontalGap = 20;

const configs = new Map();

const treeEl = document.getElementById('tree');

let renderersByType = {
	alternative: processAlternative,
	group: processGroup,
	characterClass: processCharacterClass,
	characterClassRange: processCharacterClassRange,
	value: processValue
};

function processTree(tree) {
	return (function process(node, parentNode) {
		return renderersByType[node.type](node, parentNode, process);
	})(tree, null);
}

const treeNodesEl = processTree(tree);
treeEl.appendChild(treeNodesEl);
