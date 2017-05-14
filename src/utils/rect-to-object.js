export default rect => {
	let object = {}

	for (let prop in rect) {
		object[prop] = rect[prop]
	}

	return object
}
