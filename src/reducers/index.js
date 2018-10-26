import parse from '../parse'

export default (state = {}, action) => {
	switch (action.type) {
		case 'CHANGE_VALUE': {
			return {
				...state,
				ast: parse(action.text)
			}
		}

		default: {
			return state
		}
	}
}
