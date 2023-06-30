import { useState, useEffect, useRef } from 'react'
import Receta from '../components/Receta/Receta'
import './PlatoRandom.css'
import { TfiReload } from 'react-icons/tfi'
import Modal from '../components/Modal/Modal'
import { fetchRecetas } from '../helpers/fetchRecetas'
import { textIngredientFormater } from '../helpers/textIngredientFormater'
import BuscadorDePalabras from '../components//BuscadorDeLetras/BuscadorDeLetras'
function PlatoRandom() {
	const [receta, setReceta] = useState('')
	const [ingredientes, setIngredientes] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()
	const [recetas, setRecetas] = useState()
	const divPlatoRandom = useRef(null)
	useEffect(() => {
		pintarRecetas()
	}, [])

	const pintarRecetas = async () => {
		setLoading(true)
		try {
			const data = await fetchRecetas()
			setReceta(...data.data[0].meals)
			setIngredientes(data.ingredientes)
		} catch (error) {
			setError(error)
		}
		setLoading(false)
	}

	function cerrarModal() {
		setError()
	}

	function buscadorRecetas(e) {
		mostrarRecetas(e)
	}

	const mostrarRecetas = (e) => {
		setLoading(true)
		setReceta()
		setIngredientes()
		setRecetas(e)
		setLoading(false)
	}

	function mostrarReceta(e) {
		setLoading(true)
		setReceta(e)
		const ingredientList = textIngredientFormater(e)
		setLoading(false)
		setIngredientes(ingredientList)
	}

	function cerrarReceta() {
		setError()
		setReceta()
		setIngredientes()
	}
	function manejoError() {
		setError(true)
	}
	return (
		<div className='divPlatoRandom' ref={divPlatoRandom}>
			{error ? (
				<Modal
					cerrarModal={cerrarModal}
					manejoError={error}
					error={error}
					titulo={'Ocurrió Un Error'}
				/>
			) : loading ? (
				<Modal loading={loading} />
			) : receta ? (
				<>
					<h1>Sorpresa Culinaria</h1>
					<button
						title='receta aleatoria'
						className='btnAleatoria'
						onClick={pintarRecetas}>
						<TfiReload />
					</button>
					<div className='divInputBuscar'>
						<BuscadorDePalabras buscadorRecetas={buscadorRecetas} />
					</div>
					<Receta
						manejoError={manejoError}
						ingredientes={ingredientes}
						receta={receta}
						cerrarReceta={recetas ? cerrarReceta : null}
					/>
				</>
			) : recetas ? (
				<>
					<button className='btnAleatoria' onClick={pintarRecetas}>
						<TfiReload />
					</button>
					{recetas?.map((receta, i) => {
						return (
							<Receta
								manejoError={manejoError}
								mostrarReceta={mostrarReceta}
								key={i}
								receta={receta}
							/>
						)
					})}
				</>
			) : (
				<>
					<h1>Ocurrió Un Error</h1>
					<h2>Intenta Recargando La Página</h2>
				</>
			)}
		</div>
	)
}

export default PlatoRandom
