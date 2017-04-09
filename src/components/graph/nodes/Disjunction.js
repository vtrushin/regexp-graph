import React from 'react';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';
import './Disjunction.sass';

export default class Disjunction extends React.Component {
	render() {
		return (
			<div className="disjunction">
				{ this.props.data.body.map(node => {
					const Node = nodeByType[node.type];
					return (
						<div className="disjunction__child-wrapper" key={ getUniqueNodeKey(node) }>
							<Node data={ node }/>
						</div>
					);
				}) }
			</div>
		);
	}
}
