export default points => {
	return points.reduce((prev, curr, i) => {
		let newArr

		if (i !== 0) {
			prev[i - 1].end = {
				x: curr.left,
				y: curr.baseline
			}
			newArr = prev
		}

		if (i !== points.length - 1) {
			newArr = prev.concat({
				start: {
					x: curr.right,
					y: curr.baseline
				}
			})
		}

		return newArr
	}, [])
}
