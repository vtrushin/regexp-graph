import React from 'react';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';
import './Quantifier.sass';

export default class Quantifier extends React.Component {
	render() {
		return (
			<div className={ `quantifier _${this.props.data.behavior}` }>
				<div className="quantifier__children">
					{ this.props.data.body.map(node => {
						const Node = nodeByType[node.type];
						return <Node data={ node } key={ getUniqueNodeKey(node) } />;
					}) }
				</div>
				<span>min: { this.props.data.min }, max: { this.props.data.max }</span>
			</div>
		);
	}
}
