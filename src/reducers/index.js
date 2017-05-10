import parser from 'regjsparser'
import addNodeParents from '../components/graph/add-node-parents'

export default function (state = {}, action) {

	switch (action.type) {
		case 'CHANGE_VALUE': {
			let ast

			try {
				ast = addNodeParents(parser.parse(action.text))
				console.log(ast)
			} catch (e) {
				console.error('parse error')
				return null
			}

			// console.log(ast)

			return {
				...state,
				ast
			}
		}

		case 'ADD_DIMENSIONS': {
			return {
				...state,
				dimensions: {
					...state.dimensions,
					[action.id]: action.data
				}
			}
		}

		case 'REMOVE_DIMENSIONS': {
			const dimensions = { ...state.dimensions }
			delete dimensions[action.id]

			return {
				...state,
				dimensions
			}
		}

		// case 'DIMENSIONS_CHANGED': {
		// 	// console.log('DIMENSIONS_CHANGED state', state)
		// 	// console.log(action.value)
        //
		// 	const newVar = {
		// 		...state,
		// 		dimensions: {
		// 			...state.dimensions,
		// 			[action.id]: action.dimensions
		// 		}
		// 	}
        //
		// 	// console.log('DIMENSIONS_CHANGED new state', newVar)
        //
		// 	return newVar
		// }
        //
		// case 'DIMENSIONS_REMOVED': {
		// 	// console.log('DIMENSIONS_REMOVED state', state)
        //
		// 	const dimensions = {...state.dimensions}
		// 	delete dimensions[action.id]
        //
		// 	const newVar = {
		// 		...state,
		// 		dimensions
		// 	}
        //
		// 	// console.log('DIMENSIONS_REMOVED new state', newVar)
        //
		// 	return newVar
		// }

		default: {
			return state
		}
	}

}
