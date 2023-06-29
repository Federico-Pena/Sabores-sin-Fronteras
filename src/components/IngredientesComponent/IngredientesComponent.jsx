import './IngredientesComponent.css'
import { useEffect, useRef, useState } from 'react'
import { fetchIngredientes } from '../../helpers/fetchingIngredientes'
import { IntersectionObserverElement } from '../../hooks/IntersectionObserverElement'
import ImageLoader from '../ImageLoader/ImageLoader'
// Uso de la función con paginación por scroll
const IngredientesComponent = ({ buscarRecetaPorIngrediente }) => {
	const [ingredientes, setIngredientes] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [numElementosMostrados, setNumElementosMostrados] = useState(0)
	const liRef = useRef(null)
	const ulRef = useRef(null)

	const visible = IntersectionObserverElement(liRef, ulRef)
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
	const elementosPorIteracion = 20 // Número de elementos a mostrar en cada iteración

	return (
		<div className='divIngredientesComponent'>
			<h3
				className={`h3IngredientesLength ${
					elementosMostrados.length === 246
						? 'length246'
						: elementosMostrados.length === 328
						? 'length328'
						: elementosMostrados.length === 410
						? 'length410'
						: elementosMostrados.length === 492
						? 'length492'
						: elementosMostrados.length === 574
						? 'length574'
						: ''
				}`}>
				{ingredientes
					? `${elementosMostrados.length} / ${ingredientes.length} Ingredientes`
					: null}
			</h3>
			<div className='divIComponent'>
				<ul className='ulIComponent' ref={ulRef}>
					{elementosMostrados.map((ingrediente, i) => (
						<li
							className='ulLiIComponent'
							key={ingrediente.idIngredient + i}
							onClick={() =>
								buscarRecetaPorIngrediente(ingrediente.strIngredient)
							}>
							<ImageLoader
								src={`${
									ingrediente.foto ||
									'https://placehold.co/600x400/000000/FFFFFF.png'
								}`}
								altAttr={ingrediente.strIngredient}
							/>
							<span className='ulLiImgInglesIComponent'>
								{ingrediente.strIngredient}
							</span>
							<span className='ulLiImgEspañolIComponent'>
								{ingrediente.nombreEspañol}
							</span>
						</li>
					))}
					<li ref={liRef}></li>
				</ul>
			</div>
		</div>
	)
}

export default IngredientesComponent
