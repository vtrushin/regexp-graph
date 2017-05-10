const valuesByNodeType = {
	alternative: node => [node.raw],
	anchor: node => [node.kind, node.raw],
	disjunction: node => [node.raw],
	group: node => [node.behavior, node.raw],
	value: node => [node.kind, node.raw],
}

export default node => [
	node.type,
	node.range[0], node.range[1],
	...valuesByNodeType[node.type](node)
].join(':')
