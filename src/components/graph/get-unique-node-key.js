export default (node) => {
	const { type, range: [startPos, endPos] } = node;
	return [ type, startPos, endPos ].join('-');
};
