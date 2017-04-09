import React from 'react';
import ReactDOM from 'react-dom';
import parser from 'regjsparser';
import nodeByType from './components/graph/node-by-type';
import './App.sass';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '^\\b([abcd]+b|\\d+|[^\\da-f]+h)\\b(?=s)$',
			ignoreCase: true
		};

		this.renderGraph = this.renderGraph.bind(this);
	}

	renderGraph() {
		let tree;
		try {
			tree = parser.parse(this.state.value);
			const Node = nodeByType[tree.type];
			return <Node data={ tree }/>;
		} catch (e) {
			console.error('parse error');
			return null;
		}
	}

	render() {
		return (
			<div className="editor">
				<div className="editor__scene">
					<div className="graph">
						{ this.renderGraph() }
					</div>
				</div>
				<div className="editor__input">
					<input
						type="text"
						value={ this.state.value }
						onChange={ (event) => {
							console.log(event.target.value);
							this.setState({
								value: event.target.value
							});
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
								checked={ this.state.ignoreCase }
								onChange={ () => {
									this.setState({ ignoreCase: !this.state.ignoreCase

									})
								}}
							/>
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
