import styles from './IngredientesComponent.module.css'
import { useEffect, useRef, useState } from 'react'
import { obtenerIngredientes } from '../../helpers/obtenerIngredientes'
import { useIntersectionObserverElement } from '../../hooks/useIntersectionObserverElement'
import IngredinteLoader from './IngredinteLoader'

const IngredientesComponent = ({ buscarRecetaPorIngrediente }) => {
	const [ingredientes, setIngredientes] = useState([])
	const [numElementosMostrados, setNumElementosMostrados] = useState(0)
	const liRef = useRef(null)
	const ulRef = useRef(null)

	const visible = useIntersectionObserverElement(liRef, ulRef)

	useEffect(() => {
		const ingred = obtenerIngredientes()
		const ingredientesOrdenados = ingred?.meals.sort((a, b) =>
			a.nombreEspañol.localeCompare(b.nombreEspañol)
		)
		setIngredientes(ingredientesOrdenados)
	}, [])

	useEffect(() => {
		if (visible) {
			setNumElementosMostrados(
				(prevNumElementosMostrados) =>
					prevNumElementosMostrados + elementosPorIteracion
			)
		}
	}, [visible])

	const elementosMostrados = ingredientes
		.slice(0, numElementosMostrados)
		.sort((a, b) => a.nombreEspañol.localeCompare(b.nombreEspañol))
	const elementosPorIteracion = 20

	return (
		<ul className={styles.ulingrediente} ref={ulRef}>
			{elementosMostrados.map((ingrediente, i) => (
				<IngredinteLoader
					buscarRecetaPorIngrediente={buscarRecetaPorIngrediente}
					ingrediente={ingrediente}
					key={ingrediente.foto + i}
				/>
			))}
			<li ref={liRef}></li>
		</ul>
	)
}

export default IngredientesComponent
