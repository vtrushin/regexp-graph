import React from 'react'
import propTypes from 'prop-types'
import { path, moveTo, lineTo } from '../../../utils/svg-path'
import roundPathCorners from './round'
import './connector.css'

const { number } = propTypes

const strokeWidth = 2
const roundRadius = 8

const Connector = props => {
	const { fromX, fromY, toX, toY, turn = (fromX + toX) / 2 } = props

	const width = Math.abs(fromX - toX)
	const height = Math.abs(fromY - toY) + strokeWidth
	const minX = Math.min(fromX, toX)
	const minY = Math.min(fromY, toY)

	const d = /*roundPathCorners(*/
		path(
			moveTo(fromX - minX, fromY - minY + strokeWidth / 2),
			lineTo(turn - minX, fromY - minY + strokeWidth / 2),
			lineTo(turn - minX, toY - minY + strokeWidth / 2),
			lineTo(toX - minX, toY - minY + strokeWidth / 2)
		)/*,
		roundRadius
	)*/

	const style = {
		left: minX,
		top: minY - strokeWidth / 2
	}

	return (
		<svg width={width} height={height} style={style} className='connector'>
			<path d={d} strokeWidth={strokeWidth} fill='none' />
		</svg>
	)
}

Connector.propTypes = {
	fromX: number,
	fromY: number,
	toX: number,
	toY: number,
	turn: number
}

export default Connector
