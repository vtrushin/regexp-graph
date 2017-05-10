import clone from 'clone'

export default ast => {
	const astClone = clone(ast)

	function process(node, parent) {
		node._parent = parent

		if (node.body) {
			node.body.forEach(child => process(child, node))
		}
	}

	process(astClone, null)

	return astClone
}
