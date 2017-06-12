import React from 'react'
import propTypes from 'prop-types'
import { path, moveTo, lineTo } from '../../../utils/svg-path'
import roundPathCorners from './round'
import './Connector.sass'

const strokeWidth = 2
const roundRadius = 8

export default class Connector extends React.Component {

	static get propTypes() {
		return {
			fromX: propTypes.number,
			fromY: propTypes.number,
			toX: propTypes.number,
			toY: propTypes.number,
			turn: propTypes.number
		}
	}

	render() {
		const { fromX, fromY, toX, toY } = this.props
		const turn = this.props.turn || (fromX + toX) / 2
		const width = Math.abs(fromX - toX)
		const height = Math.abs(fromY - toY) + strokeWidth
		const minX = Math.min(fromX, toX)
		const minY = Math.min(fromY, toY)
		const d = roundPathCorners(path(
			moveTo(fromX - minX, fromY - minY + strokeWidth / 2),
			lineTo(turn - minX, fromY - minY + strokeWidth / 2),
			lineTo(turn - minX, toY - minY + strokeWidth / 2),
			lineTo(toX - minX, toY - minY + strokeWidth / 2)
		), roundRadius)

		const style = {
			left: minX + 'px',
			top: minY - strokeWidth / 2 + 'px'
		}

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
