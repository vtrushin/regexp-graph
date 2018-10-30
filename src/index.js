import React from 'react'
import ReactDOM from 'react-dom'
// import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import parse from './parse'
import reducer from './reducers'
import App from './containers'

const initValue = '^\b([abcd]+b|\d+|[^\da-f]+h)\b(?=s)$'
// const initValue = '((a(a(a)))|(b(b))|(c(c)))'
// const initValue = '((ab)c)|sd(?=ds)'
// const initValue = '()'
// const initValue = '(a(b(c(d(e(f))))))'
// const initValue = 'abc(a)def'
// const initValue = '(a)(b)(c)(d)(e)(f)'
// const initValue = '(a?sd[^asdasdsafdafdf])|asd(a(b(cd))a)(e)(f)|sd(?=ds)'
// const initValue = 'ab+'
// const initValue = 'sdsdsdsdsd'
// const initValue = '^<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)$'
// const initValue = '(?:>(.*)<\\/\\1>|\\s+\\/>)'

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

const component = (
	<Provider store={store}>
		<App />
	</Provider>
)

ReactDOM.render(component, document.getElementById('app'))
