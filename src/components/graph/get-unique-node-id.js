const valuesByNodeType = {
	alternative: node => [node.raw],
	anchor: node => [node.kind, node.raw],
	disjunction: node => [node.raw],
	group: node => [node.behavior, node.raw],
	value: node => [node.kind, node.raw],
}

export default node => {
	let stack = [node]
	let current
	let path = []

	while (current = stack.pop()) {
		const values = [
			current.type,
			...valuesByNodeType[current.type](current)
		]

		if (current._parent) {
			values.push(current._parent.body.indexOf(current))
			stack.push(current._parent)
		}

		path.push(values.join(':'))
	}

	return path.join('-')
}
