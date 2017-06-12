export default (tree, childrenNodeName, callback) => {
	let stack = [tree]
	let current

	while (current = stack.pop()) {
		if (current[childrenNodeName]) {
			const childInverted = [...current[childrenNodeName]].reverse()
			stack.push(...childInverted)
		}

		if (callback) {
			callback(current)
		}
	}
}
