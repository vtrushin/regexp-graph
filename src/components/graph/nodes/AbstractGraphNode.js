import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import clone from 'clone';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';

export default class AbstractValue extends React.Component {
	constructor() {
		super();
		this.el = null;
		this.childrenDimensions = new Map();
		this.childrenMeasured = false;
	}

	dimensionsHandler(node, dimensions) {
		this.childrenDimensions.set(node, dimensions);
	}

	/*dimensionsHandler(node, dimensions) {
		if (this.childrenMeasured) {
			const childrenDimensions = new Map(this.state.childrenDimensions);
			childrenDimensions.set(node, dimensions);
			this.setState({
				...this.state,
				childrenDimensions
			});
		} else {
			this.childrenDimensions.set(node, dimensions);
			if (this.childrenDimensions.size === this.childrenLength) {
				console.log('changed');
				this.setState({
					...this.state,
					childrenDimensions: this.childrenDimensions
				});
				this.childrenMeasured = true;
			}
		}
	}*/

	componentDidMount() {
		this.resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				const elDimensions = entry.target.getBoundingClientRect(); // entry.contentRect;

				this.setState({
					...this.state,
					elDimensions
				});

				if (this.props.onDimensionsChanged) {
					this.props.onDimensionsChanged(elDimensions);
				}

			}
		});

		this.resizeObserver.observe(this.el);
	}

	componentWillUnmount() {
		this.resizeObserver.disconnect();
	}

}
