import React from 'react'
import PropTypes from 'prop-types';
import { path, moveTo, lineTo } from '../../../utils/svg-path'
import roundPathCorners from './round';
import './Connector.sass'

const strokeWidth = 2;
const roundRadius = 12;

export default class Connector extends React.Component {

	static propTypes = {
		fromX: PropTypes.number,
		fromY: PropTypes.number,
		toX: PropTypes.number,
		toY: PropTypes.number,
		turnOffset: PropTypes.number
	};

	render() {
		const {fromX, fromY, toX, toY, turnOffset} = this.props;

		const width = Math.abs(fromX - toX);
		const height = Math.abs(fromY - toY) + strokeWidth;
		const turn = fromX + turnOffset;
		const minX = Math.min(fromX, toX);
		const minY = Math.min(fromY, toY);
		const d = roundPathCorners(path(
			moveTo(fromX - minX, fromY - minY + strokeWidth / 2),
			lineTo(turn - minX, fromY - minY + strokeWidth / 2),
			lineTo(turn - minX, toY - minY + strokeWidth / 2),
			lineTo(toX - minX, toY - minY + strokeWidth / 2)
		), roundRadius);

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
