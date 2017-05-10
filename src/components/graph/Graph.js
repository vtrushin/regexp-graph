import { Component } from 'react'
import nodeByType from './node-by-type'
import getNodeValues from './get-node-values'
import './Graph.sass'

export default function Graph(props) {
	const { data } = props
	const Node = nodeByType[data.type]

	return (
		<div className="graph">
			<div className="point start-point">Start</div>
			<Node
				{ ...props }
				data={ data }
			/>
			<div className="point end-point">End</div>
		</div>
	)
}
