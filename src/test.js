import React from 'react'
import ReactDOM from 'react-dom'

function compareMaps(map1, map2) {
	var testVal
	if (map1.size !== map2.size) {
		return false
	}
	for (var [key, val] of map1) {
		testVal = map2.get(key)
		// in cases of an undefined value, make sure the key
		// actually exists on the object so there are no false positives
		if (testVal !== val || (testVal === undefined && !map2.has(key))) {
			return false
		}
	}
	return true
}

class Block extends React.Component {
	constructor(props) {
		super(props)

		this.rects = new Map()

		this.state = {
			rects: new Map(this.rects)
		}

		this.onRef = this.onRef.bind(this)
	}

	onRef(el, item) {
		if (!el && !this.rects.has(item)) {
			return
		}

		if (el) {
			this.rects.set(item, el.getBoundingClientRect())
		} else {
			this.rects.delete(item)
		}
	}

	updateDimensions() {
		this.setState({
			rects: this.rects
		}, () => {
			this.rects = new Map(this.state.rects)
		})
	}

	componentDidMount() {
		this.updateDimensions()
	}

	componentDidUpdate() {

		if (!compareMaps(this.rects, this.state.rects)) {
			this.updateDimensions()
		}
	}

	render() {
		const list = []

		for (let item of this.state.rects) {
			list.push(item[1])
		}

		// console.log(list)

		return (
			<div>
				<div>
					{ list.map(rect => {
						const style = {
							position: 'absolute',
							// display: 'inline-block',
							left: rect.left + 'px',
							top: rect.top + 'px',
							width: rect.width + 'px',
							height: rect.height + 'px',
							backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, .5)`
						}

						return <div key={ rect.left + ':' + rect.width } style={ style }>&nbsp</div>
					}) }
				</div>

				<div style={{ position: 'relative' }}>
					{ this.props.items.map(item => (
						<div style={{ display: 'inline-block' }} key={ item } ref={ el => this.onRef(el, item) }>
							{ item }
						</div>
					)) }
				</div>
			</div>
		)
	}
}

const items = 'Геометрическая прогрессия нейтрализует коллинеарный ротор векторного поля, откуда следует доказываемое равенство. Используя таблицу интегралов элементарных функций, получим: функциональный анализ транслирует косвенный график функции. Поле направлений, следовательно, раскручивает нормальный скачок функции. Функциональный анализ, очевидно, доказан. В соответствии с законом больших чисел, функция B(x,y) вырождена. Наибольший Общий Делитель (НОД), не вдаваясь в подробности, является следствием. Определитель системы линейных уравнений, общеизвестно, развивает максимум. Иррациональное число специфицирует действительный предел последовательности. Замкнутое множество изящно ускоряет изоморфный расходящийся ряд. Эпсилон окрестность по-прежнему востребована. Доказательство, исключая очевидный случай, обуславливает анормальный определитель системы линейных уравнений. Векторное поле небезынтересно масштабирует абстрактный полином. Скалярное поле, в первом приближении, восстанавливает ряд Тейлора, дальнейшие выкладки оставим студентам в качестве несложной домашней работы. Арифметическая прогрессия стремительно изменяет линейно зависимый Наибольший Общий Делитель (НОД), в итоге приходим к логическому противоречию.'.split(' ')

const min = 3
const max = items.length

class App extends React.Component {
	generate() {
		const length = Math.ceil(Math.random() * max + min) - min
		const itemsCopy = items.slice()
		const list = []

		for (let i = 0; i < length; i ++) {
			let index = Math.floor(Math.random() * itemsCopy.length)
			list.push(itemsCopy.splice(index, 1)[0])
		}

		return list
	}

	constructor(props) {
		super(props)

		this.state = {
			list: this.generate()
		}

		setInterval(() => {
			this.setState({
				list: this.generate()
			})
		}, 1000)

		/*setTimeout(() => {
			console.log('———————— NEW STATE ————————')
			this.setState({
				list: [
					'A_', '__B_', '_C__', '_D___'
				]
			})
		}, 200)

		setTimeout(() => {
			console.log('———————— NEW STATE ————————')
			this.setState({
				list: [
					'__A__', '_B_', '_B__'
				]
			})
		}, 500)*/
	}

	render() {
		return (
			<Block items={ this.state.list } />
		)
	}
}


ReactDOM.render(
	<App/>,
	document.getElementById('app')
)
