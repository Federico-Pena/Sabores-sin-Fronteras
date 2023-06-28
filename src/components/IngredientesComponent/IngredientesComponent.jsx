import './IngredientesComponent.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchIngredinetes } from '../../helpers/fetchRecetas'
import IntersectionObserverElement from '../../hooks/IntersectionObserverElement'
// Uso de la función con paginación por scroll
const IngredientesComponent = ({
	ingredientesPorPagina,
	buscarRecetaPorIngrediente,
}) => {
	const [ingredientes, setIngredientes] = useState([])
	const [pagina, setPagina] = useState(1)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const ulIngredRef = useRef()
	const { visible, visorRef } = IntersectionObserverElement(
		ulIngredRef,
		ulIngredRef,
		'300px',
		0
	)

	useEffect(() => {
		const fetchInitialIngredientes = async () => {
			setLoading(true)
			const initialIngredientes = await fetchIngredinetes(
				pagina,
				ingredientesPorPagina
			)
			setIngredientes(
				initialIngredientes.sort((a, b) =>
					a.nombreEspañol > b.nombreEspañol ? 1 : -1
				)
			)
			setLoading(false)
		}
		fetchInitialIngredientes()
	}, [ingredientesPorPagina, pagina])

	const cambiarPagina = useCallback(
		() => setPagina((estadoAnterior) => estadoAnterior + 1),
		[]
	)

	useEffect(() => {
		cambiarPagina()
	}, [cambiarPagina])

	useEffect(() => {
		const masIngredientes = async () => {
			const result = await fetchIngredinetes(pagina, ingredientesPorPagina)
			setIngredientes((prev) => prev.concat(result))
			//visorRef.current.firstChild.scrollIntoView()
		}

		if (visible && ingredientes.length > 62) {
			masIngredientes()
		}
	}, [pagina, visible])

	return (
		<div className='divIngredientesComponent'>
			<h3
				className={`h3IngredientesLength ${
					ingredientes.length === 246
						? 'length246'
						: ingredientes.length === 328
						? 'length328'
						: ingredientes.length === 410
						? 'length410'
						: ingredientes.length === 492
						? 'length492'
						: ingredientes.length === 574
						? 'length574'
						: ''
				}`}>
				{ingredientes ? `${ingredientes.length} Ingredientes` : null}
			</h3>
			<div className='divIComponent'>
				<ul className='ulIComponent' ref={ulIngredRef}>
					{ingredientes
						? ingredientes?.map((ingrediente, i) => (
								<li
									className='ulLiIComponent'
									key={ingrediente.idIngredient + i}
									onClick={() =>
										buscarRecetaPorIngrediente(ingrediente.strIngredient)
									}>
									<img
										className='ulLiImgIComponent'
										src={`${ingrediente.foto}`}
										alt={ingrediente.strIngredient}
									/>
									<span className='ulLiImgInglesIComponent'>
										{ingrediente.strIngredient}
									</span>
									<span className='ulLiImgEspañolIComponent'>
										{ingrediente.nombreEspañol}
									</span>
								</li>
						  ))
						: null}
					<li></li>
				</ul>
			</div>
		</div>
	)
}

export default IngredientesComponent
