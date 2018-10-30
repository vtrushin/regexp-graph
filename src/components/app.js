import React from 'react'
// import { combineReducers } from 'redux'
import * as actions from '../actions'
import Graph from './graph/graph'
import './app.css'

export default class App extends React.Component {
	static propTypes = {

	}

	render() {
		return (
			<div className='editor'>
				<div className='editor__scene'>
					{ this.renderGraph() }
				</div>
				{ this.renderForm() }
			</div>
		)
	}

	renderGraph() {
		const { ast } = this.props

		console.log('ast', ast);

		if (ast) {
			return <Graph {...this.props} data={ast} />
		}
	}

	renderForm() {
		const { value, ignoreCase, dispatch } = this.props

		return (
			<div className='editor__form'>
				<input
					type='text'
					defaultValue={value}
					onChange={e => dispatch(actions.changeValue(e.target.value))}
				/>
				<div className='editor__checkboxes'>
					<label className='checkbox'>
						<input type='checkbox' />
						<span>Global</span>
					</label>

					<label className='checkbox'>
						<input type='checkbox' />
						<span>Multiline</span>
					</label>

					<label className='checkbox'>
						<input
							type='checkbox'
							checked={ignoreCase}
							onChange={() => this.setState({ ignoreCase: !ignoreCase }) }
						/>
						<span>Ignore case</span>
					</label>
				</div>
			</div>
		)
	}
}
