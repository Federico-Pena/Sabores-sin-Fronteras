import { useState, useEffect, useRef } from 'react'
import Receta from '../components/Receta/Receta'
import './PlatoRandom.css'
import { TfiReload } from 'react-icons/tfi'
import Modal from '../components/Modal/Modal'
import { fetchRecetas } from '../helpers/fetchRecetas'
import { textIngredientFormater } from '../helpers/textIngredientFormater'
import BuscadorDePalabras from '../components//BuscadorDeLetras/BuscadorDeLetras'
import { Link } from 'react-router-dom'
function PlatoRandom() {
	const [receta, setReceta] = useState('')
	const [ingredientes, setIngredientes] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()
	const [recetas, setRecetas] = useState()
	const heroPlatoRandom = useRef(null)
	const aleatoriaPlatoRandom = useRef(null)

	useEffect(() => {
		pintarRecetas()
	}, [])

	const pintarRecetas = async (e) => {
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
	const moverseEnPagina = (ref) => {
		const releventDiv = ref.current
		releventDiv.scrollIntoView({ behavior: 'smooth' })
	}
	return (
		<div className='divPlatoRandom'>
			{ingredientes && <h1>No Sabes Que Cocinar?</h1>}
			{error ? (
				<Modal
					cerrarModal={cerrarModal}
					manejoError={error}
					error={error}
					titulo={'Ocurrió Un Error'}
				/>
			) : null}
			{loading ? <Modal loading={loading} /> : null}
			{receta ? (
				<>
					<div
						className='aleatoriaPlatoRandom'
						ref={aleatoriaPlatoRandom}></div>
					<div className='divInputBuscar'>
						<button
							title='receta aleatoria'
							className='btnAleatoria'
							onClick={pintarRecetas}>
							<TfiReload />
						</button>
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
				<div className='aleatoriaPlatoRandom'>
					<div className='divInputBuscar'>
						<button className='btnAleatoria' onClick={pintarRecetas}>
							<TfiReload />
						</button>
						<BuscadorDePalabras buscadorRecetas={buscadorRecetas} />
					</div>

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
				</div>
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
