import styles from './IngredientesComponent.module.css'
import { useEffect, useRef, useState } from 'react'
import { fetchIngredientes } from '../../helpers/fetchingIngredientes'
import { useIntersectionObserverElement } from '../../hooks/useIntersectionObserverElement'
import IngredinteLoader from './IngredinteLoader'
// Uso de la función con paginación por scroll
const IngredientesComponent = ({ buscarRecetaPorIngrediente }) => {
	const [ingredientes, setIngredientes] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [numElementosMostrados, setNumElementosMostrados] = useState(0)
	const liRef = useRef(null)
	const ulRef = useRef(null)

	const visible = useIntersectionObserverElement(liRef, ulRef)

	useEffect(() => {
		const fetchInitialIngredientes = async () => {
			setLoading(true)
			const initialIngredientes = await fetchIngredientes()
			const ingredientesOrdenados = initialIngredientes.meals.sort((a, b) =>
				a.nombreEspañol.localeCompare(b.nombreEspañol)
			)
			setIngredientes(ingredientesOrdenados)
			setLoading(false)
		}
		fetchInitialIngredientes()
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
		<ul className={styles.ulIComponent} ref={ulRef}>
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
