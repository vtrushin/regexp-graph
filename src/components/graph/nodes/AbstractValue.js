import React from 'react';
import './AbstractValue.sass';

export default class AbstractValue extends React.Component {
	constructor() {
		super();
		this.el = null;
		this.width = 0;
		this.height = 0;
	}

	componentDidMount() {
		if (this.props.onDimensionsChanged) {
			console.log(1);
			const { width, height } = this.el.getBoundingClientRect();

			if (this.width !== width || this.height !== height) {
				this.props.onDimensionsChanged(width, height);
				this.width = width;
				this.height = height;
			}
		}
	}

	render() {
		return (
			<span className="value" ref={ el => this.el = el }>
				{ this.props.children }
			</span>
		);
	}
}
