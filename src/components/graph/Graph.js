import { Component } from 'react'
import nodeByType from './node-by-type'
import './Graph.sass'

export default function Graph(props) {
	const { data } = props
	const Node = nodeByType[data.type]

	return (
		<div className="graph">
			<div className="point start-point">Start</div>
			<Node
				data={ data }
			/>
			<div className="point end-point">End</div>
		</div>
	)
}
