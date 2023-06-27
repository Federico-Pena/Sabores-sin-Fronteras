import { useEffect, useRef, useState } from 'react'
import { fetchIngredinetes } from '../helpers/fetchRecetas'
import './IngredientesComponent.css'
// Uso de la función con paginación por scroll
const IngredientesComponent = ({
	ingredientesPorPagina,
	buscarRecetaPorIngrediente,
}) => {
	const [ingredientes, setIngredientes] = useState([])
	const [pagina, setPagina] = useState(1)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const fetchMoreIngredientes = async () => {
		setLoading(true)
		try {
			const nuevosIngredientes = await fetchIngredinetes(
				setPagina(pagina + 1),
				ingredientesPorPagina
			)
			if (nuevosIngredientes.en.length === 0) {
				fetchInitialIngredientes()
				setPagina(1)
				return
			}
			setIngredientes(nuevosIngredientes)

			setPagina((prevPagina) => prevPagina + 1)
		} catch (error) {
			setError(error)
		}
		setLoading(false)
	}

	const handleScroll = (event) => {
		const target = event.target
		if (target.scrollHeight - target.scrollTop === target.clientHeight) {
			fetchMoreIngredientes()
			target.scrollTop = 0
		}
	}
	const fetchInitialIngredientes = async () => {
		setLoading(true)

		const initialIngredientes = await fetchIngredinetes(
			pagina,
			ingredientesPorPagina
		)

		setIngredientes(initialIngredientes)
		setLoading(false)
	}

	useEffect(() => {
		fetchInitialIngredientes()
	}, [])

	return (
		<div className='ingredientes'>
			<ul onScroll={handleScroll}>
				{ingredientes
					? ingredientes.en?.map((ingrediente, i) =>
							loading ? (
								<li key={i}>
									<span className='loader'></span>
								</li>
							) : (
								<li
									key={ingrediente.strIngredient}
									onClick={() =>
										buscarRecetaPorIngrediente(ingrediente.strIngredient)
									}>
									<img
										src={`${ingrediente.foto}`}
										alt={ingrediente.nombreEspañol}
									/>
									<span className='spanNombreEspañol'>
										{ingrediente.nombreEspañol}
									</span>
								</li>
							)
					  )
					: null}
			</ul>
		</div>
	)
}

export default IngredientesComponent
