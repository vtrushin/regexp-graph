import React from 'react'
import {path, moveTo, lineTo} from '../../utils/svg-path'
import './Connector.sass'

const strokeWidth = 5;

export default class Connector extends React.Component {

	static propTypes = {
		fromX: React.PropTypes.number,
		fromY: React.PropTypes.number,
		toX: React.PropTypes.number,
		toY: React.PropTypes.number
	};

	render() {
		const {fromX, fromY, toX, toY} = this.props;
		const width = Math.abs(fromX - toX);
		const height = Math.abs(fromY - toY) + strokeWidth;
		const centerX = fromX + (toX - fromX) / 2;
		const minX = Math.min(fromX, toX);
		const minY = Math.min(fromY, toY);
		const d = path(
			moveTo(fromX - minX, fromY - minY + strokeWidth / 2),
			lineTo(centerX - minX, fromY - minY + strokeWidth / 2),
			lineTo(centerX - minX, toY - minY + strokeWidth / 2),
			lineTo(toX - minX, toY - minY + strokeWidth / 2)
		);
		const style = {
			left: minX + 'px',
			top: minY - strokeWidth / 2 + 'px'
		};

		return (
			<svg width={ width } height={ height } style={ style } className="connector">
				<path
					d={ d }
					strokeWidth={ strokeWidth }
					fill="none"
				/>
			</svg>
		)
	}

}
