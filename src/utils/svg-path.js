export function moveTo(x, y, isAbsolute = true) {
	return (isAbsolute ? 'M' : 'm') + x + ',' + y;
}

export function lineTo(x, y, isAbsolute = true) {
	return (isAbsolute ? 'L': 'l') + x + ',' + y;
}

export function horizontalTo(x, isAbsolute = true) {
	return (isAbsolute ? 'H' : 'h') + x;
}

export function verticalTo(x, isAbsolute = true) {
	return (isAbsolute ? 'V' : 'v') + x;
}

export function cubicBezierCurveTo(x1, y1, x2, y2, x, y, isAbsolute = true) {
	return (isAbsolute ? 'C' : 'c') + x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + x + ',' + y;
}

export function smoothCubicBezierCurveTo(x2, y2, x, y, isAbsolute = true) {
	return (isAbsolute ? 'S' : 's') + x2 + ',' + y2 + ' ' + x + ',' + y;
}

export function quadraticBezierCurveTo(x1, y1, x, y, isAbsolute = true) {
	return (isAbsolute ? 'Q' : 'q') + x1 + ',' + y1 + ' ' + x + ',' + y;
}

export function smoothQuadraticBezier(x, y, isAbsolute = true) {
	return (isAbsolute ? 'T' : 't') + x + ',' + y;
}

export function close() {
	return 'Z'; // or z
}

export function path(...commands) {
	return commands.join(', ');
}
