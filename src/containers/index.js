import { connect } from 'react-redux'
import App from '../components/App'

function mapStateToProps(state) {
	return state
}

function mapDispatchToProps(dispatch) {
	return {
		// onTodoClick: (id) => {
		// 	dispatch(toggleTodo(id))
		// }
	}
}

export default connect(
	mapStateToProps,
	// mapDispatchToProps
)(App)
