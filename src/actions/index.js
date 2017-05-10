export function changeValue(text) {
	return {
		type: 'CHANGE_VALUE',
		text
	}
}

export function addDimensions(id, data) {
	return {
		type: 'ADD_DIMENSIONS',
		id,
		data
	}
}

export function removeDimensions(id) {
	return {
		type: 'REMOVE_DIMENSIONS',
		id
	}
}

export function dimensionsChanged(id, dimensions) {
	return {
		type: 'DIMENSIONS_CHANGED',
		id,
		dimensions
	}
}

export function dimensionsRemoved(id) {
	return {
		type: 'DIMENSIONS_REMOVED',
		id
	}
}
