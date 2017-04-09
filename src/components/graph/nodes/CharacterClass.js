import React from 'react';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';
import './CharacterClass.sass';

export default class CharacterClass extends React.Component {
	render() {
		const classNames = ['character-class'];
		let title;

		if (this.props.data.negative) {
			classNames.push('_negative');
			title = 'None of';
		} else {
			title = 'One of';
		}

		return (
			<div className={ classNames.join(' ') }>
				<div className="character-class__title">{ title }</div>
				<div className="character-class__children">
					{ this.props.data.body.map(node => {
						const Node = nodeByType[node.type];
						return (
							<div className="character-class__child-wrapper" key={ getUniqueNodeKey(node) }>
								<Node data={ node } />
							</div>
						);
					}) }
				</div>
			</div>
		);
	}
}
