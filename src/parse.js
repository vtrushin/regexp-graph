import parser from 'regjsparser'
import walkTree from './utils/walk-tree'

export default value => {
	let tree = null

	try {
		tree = parser.parse(value)
		// console.log('tree', tree)
	} catch (e) {
		// console.error('parse error')
	}

	let groupIndex = 1

	walkTree(tree, 'body', node => {
		if (node.type === 'group') {
			node.groupIndex = groupIndex
			groupIndex ++
		}
	})

	return tree
}
