import parser from 'regjsparser'
import React from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import addNodeParents from './components/graph/add-node-parents'
import reducer from './reducers'
import App from './containers'

// const initValue = '^\b([abcd]+b|\d+|[^\da-f]+h)\b(?=s)$'
// const initValue = '((a(a(a)))|(b(b))|(c(c)))'
// const initValue = 'ab(c|d)e'
// const initValue = 'a|b'
// const initValue = 'd|s(?=s)'
// const initValue = '(a(b(c(de))))'
// const initValue = '(abcdef)'
const initValue = '(a(bv)(av(cef)))'
// const initValue = 'a|b|c'

let ast = null

try {
	ast = addNodeParents(parser.parse(initValue))
	console.log(ast)
} catch (e) {
	console.error('parse error')
}

const initialState = {
	ast,
	value: initValue
}

const store = createStore(
	reducer,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()/*,
	applyMiddleware(thunk)*/
)

// store.subscribe((...args) => {
// 	console.log(args)
// })

render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('app')
)
