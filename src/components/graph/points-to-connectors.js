export default points => {
	return points.reduce((prev, curr, i) => {
		let newArr

		if (i !== 0) {
			prev[i - 1].end = {
				x: curr.startX,
				y: curr.y
			}
			newArr = prev
		}

		if (i !== points.length - 1) {
			newArr = prev.concat({ start: {
				x: curr.endX,
				y: curr.y
			} })
		}

		return newArr
	}, [])
}
