export default (tree, childrenProp, callback, initialValue) => {
	let stack = [tree]
	let current
	let value = initialValue

	while (current = stack.pop()) {
		if (current[childrenProp]) {
			const childInverted = [...current[childrenProp]].reverse()
			stack.push(...childInverted)
		}

		const valueWrapper = callback(value, current)

		value = valueWrapper.value

		if (valueWrapper.stop) {
			break
		}
	}

	return value
}
