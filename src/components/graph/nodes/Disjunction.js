import React from 'react';
import ReactDOM from 'react-dom';
import Connector from '../connector/Connector';
import measure from '../measure';
import nodeByType from '../node-by-type';
import getUniqueNodeKey from '../get-unique-node-key';
import './Disjunction.sass';

const PADDING = 50;

class Disjunction extends React.Component {
	renderConnectors() {
		const list = [];

		if (this.props.containerRect && this.props.rects.size > 0) {
			const rects = Array.from(this.props.rects.values());
			const rectsMaxWidth = Math.max(...rects.map(rect => rect.width));

			this.props.data.body.filter(node => node.raw !== '').forEach(node => {
				const rect = this.props.rects.get(node);

				if (!rect) {
					return;
				}

				list.push(
					<Connector
						key={ Math.random() }
						fromX={ 0 }
						fromY={ this.props.containerRect.height / 2 }
						toX={ PADDING }
						toY={ rect.top - this.props.containerRect.top + rect.height / 2 }
						turnOffset={ 25 }
					/>,
					<Connector
						key={ Math.random() }
						fromX={ PADDING + rect.width }
						fromY={ rect.top - this.props.containerRect.top + rect.height / 2 }
						toX={ this.props.containerRect.width }
						toY={ this.props.containerRect.height / 2 }
						turnOffset={ rectsMaxWidth - rect.width + 25 }
					/>
				)
			})
		}

		return list;
	}

	renderChildren() {
		return this.props.data.body.filter(node => node.raw !== '').map(node => {
			const Node = nodeByType[node.type];
			return (
				<Node
					data={ node }
					ref={ el => this.props.onRef(ReactDOM.findDOMNode(el), node) }
					key={ getUniqueNodeKey(node) }
				/>
			);
		});
	}

	render() {
		return (
			<div className="disjunction">
				{ this.renderConnectors() }
				{ this.renderChildren() }
			</div>
		);
	}
}

export default measure(Disjunction);
