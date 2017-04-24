import React from 'react';
import ReactDOM from 'react-dom';
import getUniqueNodeKey from './get-unique-node-key';

function compareMaps(map1, map2) {
	var testVal;
	if (map1.size !== map2.size) {
		return false;
	}
	for (var [key, val] of map1) {
		testVal = map2.get(key);
		// in cases of an undefined value, make sure the key
		// actually exists on the object so there are no false positives
		if (testVal !== val || (testVal === undefined && !map2.has(key))) {
			return false;
		}
	}
	return true;
}

export default Node => class Measure extends React.Component {
	constructor() {
		super();

		this.rects = new Map();

		this.state = {
			containerRect: null,
			rects: new Map(this.rects)
		};

		this.onRef = this.onRef.bind(this);
	}

	onRef(el, item) {
		if (!el && !this.rects.has(item)) {
			return;
		}

		if (el) {
			this.rects.set(item, el.getBoundingClientRect());
		} else {
			this.rects.delete(item);
		}
	}

	updateDimensions() {
		this.setState({
			containerRect: this.containerEl.getBoundingClientRect(),
			rects: this.rects
		}, () => {
			this.rects = new Map(this.state.rects)
		});
	}

	componentDidMount() {
		this.containerEl = ReactDOM.findDOMNode(this);
		this.updateDimensions();
	}

	componentDidUpdate() {
		if (!compareMaps(this.rects, this.state.rects)) {
			this.updateDimensions();
		}
	}

	render() {
		const props = {
			...this.props,
			containerRect: this.state.containerRect,
			rects: this.state.rects,
			onRef: this.onRef
		};

		return (
			<Node {...props} />
		);
	}


	// constructor() {
	// 	super(...arguments);
    //
	// 	this.el = null;
	// 	this.containerRect = null;
	// 	this.rects = [];
    //
	// 	this.contextName = getUniqueNodeKey(this.props.data);
    //
	// 	this.updateDimensions = this.updateDimensions.bind(this);
	// }
    //
	// updateDimensions() {
	// 	if (this.rects.length > 0) {
	// 		return;
	// 	}
    //
	// 	const el = ReactDOM.findDOMNode(this);
	// 	this.containerRect = el.getBoundingClientRect();
	// 	const rectEls = Array.from(el.querySelectorAll(`.${this.contextName}.${rectsSelector}`));
	// 	this.rects = rectEls.map(el => el.getBoundingClientRect());
    //
	// 	this.forceUpdate(() => {
	// 		this.containerRect = null;
	// 		this.rects = [];
	// 	});
	// }
    //
	// componentWillReceiveProps(nextProps) {
	// 	this.contextName = getUniqueNodeKey(nextProps.data);
	// }
    //
	// componentDidUpdate() {
	// 	this.updateDimensions();
	// }
    //
	// componentDidMount() {
	// 	this.updateDimensions();
	// }
    //
	// render() {
	// 	const props = {
	// 		...this.props,
	// 		containerRect: this.containerRect,
	// 		rects: this.rects,
	// 		contextName: this.contextName
	// 	};
    //
	// 	return (
	// 		<Node {...props} />
	// 	);
	// }
}
