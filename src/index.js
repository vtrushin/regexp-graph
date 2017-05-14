import React from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import parse from './parse'
import reducer from './reducers'
import App from './containers'

// const initValue = '^\b([abcd]+b|\d+|[^\da-f]+h)\b(?=s)$'
const initValue = '((a(a(a)))|(b(b))|(c(c)))'
// const initValue = 'ab(c|d)e'
// const initValue = 'a|b'
// const initValue = 'd|s(?=s)'
// const initValue = '(a(b(c(de))))'
// const initValue = '(abcdef)'
// const initValue = '(a(bv)(av(cef)))'
// const initValue = '[1-9]'
// const initValue = 'abcdef||dfsdf23f|sad'
// const initValue = '[^ssdfs1-2d](a)'
// const initValue = 'ab+'
// const initValue = '^<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)$'

const initialState = {
	ast: parse(initValue),
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
