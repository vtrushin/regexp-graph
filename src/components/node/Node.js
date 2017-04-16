import React from 'react';

function classNames(...values) {
	return values.join(' ');
}

export default class Node extends React.Component {

	static propTypes = {
		// text: React.PropTypes.string.isRequired,
		style: React.PropTypes.object,
		onDimensionsChanged: React.PropTypes.func
	};

	constructor() {
		super();
		this.el = null;
		this.width = 0;
		this.height = 0;
	}

	componentDidMount() {
		if (this.props.onDimensionsChanged) {
			const { width, height } = this.el.getBoundingClientRect();

			if (this.width !== width || this.height !== height) {
				this.props.onDimensionsChanged(width, height);
				this.width = width;
				this.height = height;
			}
		}
	}

	/*renderBody() {
		const {
			type,
			value,
			loc: {
				start: { line: startLine, column: startColumn, offset: startOffset },
				end: { line: endLine, column: endColumn, offset: endOffset }
			}
		} = this.props.astNode;

		return (
			<div>
				<div className="node-type">
					{ type }
				</div>
				<div className="node-title">
					{ value ? <span className="node-value">{ value }</span> : '' }
				</div>
				<div className="node-loc">
					{ startLine }:{ startColumn }&thinsp;—&thinsp;{ endLine }:{ endColumn }
				</div>
			</div>
		);
	}*/

	render() {
		return (
			<span
				title={ this.props.width }
				ref={ el => this.el = el }
				style={ this.props.style }
			>
				{ this.props.text }
			</span>
		);

		/*const classList = ['node'];

		if (this.props.astNode) {
			classList.push('_' + this.props.astNode.type);
		}

		return (
			<div className={ classNames(...classList) } ref={ el => { this.coverEl = el; } }>
				{ this.props.astNode && this.renderBody() }
			</div>
		)*/
	}
}
