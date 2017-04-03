import React from 'react';
import ReactDOM from 'react-dom';
import parser from 'regjsparser';
import './App.sass';
import Node from './components/node/Node';
import Graph from "./components/graph/Graph";
// import NodeGroup from './components/node-group/NodeGroup';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			tree: null,
			ignoreCase: true
		};
	}

	handleChange(event) {
		try {
			const tree = parser.parse(event.target.value);
			this.setState({
				tree
			});
		} catch (e) {
			console.error('error');
		}
	}

	render() {
		return (
			<div className="editor">
				<div className="editor__scene">
					<div className="graph">
						<Graph tree={ this.state.tree } />
					</div>
				</div>
				<div className="editor__input">
					<input type="text" value={ this.state.value } onChange={ this.handleChange } />
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
							<input type="checkbox" checked={ this.state.ignoreCase } onChange={ () => { this.setState({ ignoreCase: !this.state.ignoreCase

							}) } } />
							<span>Ignore case</span>
						</label>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);
