import { Component } from 'react'
import ReactDOM from 'react-dom'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'

import * as actions from '../actions'
import Graph from './graph/Graph'

import './App.sass'

export default class App extends Component {
	constructor(props) {
		super(props)

		this.renderGraph = this.renderGraph.bind(this)
	}

	renderGraph() {
		if (this.props.ast) {
			return <Graph { ...this.props } data={ this.props.ast } />
		}
	}

	render() {
		const { dispatch } = this.props

		return (
			<div className="editor">
				<div className="editor__scene">
					{ this.renderGraph() }
				</div>
				<div className="editor__input">
					<input
						type="text"
						defaultValue={ this.props.value }
						onChange={ event => {
							dispatch(actions.changeValue(event.target.value))
						} }
					/>

					<div style={{ marginLeft: '10px' }}>
						<label className="checkbox">
							<input type="checkbox" />
							<span>Global</span>
						</label>

						<label className="checkbox">
							<input type="checkbox"/>
							<span>Multiline</span>
						</label>

						<label className="checkbox">
							<input
								type="checkbox"
								checked={ this.props.ignoreCase }
								onChange={ () => {
									this.setState({
										ignoreCase: !this.props.ignoreCase
									})
								}}
							/>
							<span>Ignore case</span>
						</label>
					</div>
				</div>
			</div>
		)
	}
}
