export default function unique(node) {
	return [
		node.type,
		node.raw,
		node.behavior,
		node.kind,
		// node.body && node.body.map(unique).join(':')
	].join('-')
}
