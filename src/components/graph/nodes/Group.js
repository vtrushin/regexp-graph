import React from 'react';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';
import './Group.sass';

export default class Group extends React.Component {
	render() {
		return (
			<div className={ `group _${this.props.data.behavior}` }>
				<div className="group__children">
					{ this.props.data.body.map(node => {
						const Node = nodeByType[node.type];
						return <Node data={ node } key={ getUniqueNodeKey(node) } />;
					}) }
				</div>
			</div>
		);
	}
}
