export default el => {
	const { left, top, right, bottom, width, height } = el.getBoundingClientRect()
	return { left, top, right, bottom, width, height }
}
