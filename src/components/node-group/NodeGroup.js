import React from 'react';
import './NodeGroup.sass';

const codes = {
	' ':	'Space',
	'\r':	'Crt rtrn',
	'\n':	'New line',
	'\t':	'Tab',
	'\v':	'Vert. tab'
};

function createCode(code) {
	return codes[code].split('').map(char => (
		<i>{char}</i>
	));
}

export default function () {

	return (
		<div className="group">
			<div className="group__title">
				None of
			</div>
			<div className="group__body">

				<div className="group__item">
					<button className="node">
						a<span className="delim">-</span>z
					</button>
				</div>
				<div className="group__item">
					<button className="node">
						A<span className="delim">-</span>Z
					</button>
				</div>
				<div className="group__item">
					<button className="node">.</button>
				</div>
				<div className="group__item">
					<button className="node">!</button>
				</div>
				<div className="group__item">
					<button className="node">
						0<span className="delim">-</span>9
					</button>
				</div>
				<div className="group__item">
					<button className="node">$</button>
				</div>
				<div className="group__item">
					<button className="node">%</button>
				</div>
				<div className="group__item">
					<button className="node">#</button>
				</div>
				<div className="group__item">
					<button className="node">
						<span className="special-symbol">
							{ createCode('\r') }
						</span>
					</button>
				</div>
				<div className="group__item">
					<button className="node">
						<span className="unicode-symbol">
							<i>\</i>x09
						</span>
					</button>
				</div>
				<div className="group__item">
					<button className="node">
						А<span className="delim">-</span>Я
					</button>
				</div>

			</div>
		</div>
	)
}
