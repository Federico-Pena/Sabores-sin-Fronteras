import { useState, useEffect, useRef } from 'react'
import Receta from '../components/Receta'
import './PlatoRandom.css'
import { TfiReload } from 'react-icons/tfi'
import Modal from '../components/Modal'
import { fetchRecetas } from '../helpers/fetchRecetas'
import BuscadorDePalabras from '../components/BuscadorDePalabras'
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
		setReceta(e)
		const ingredientList = []
		for (let i = 1; i <= 20; i++) {
			const ingredientKey = `strIngredient${i}`
			const measureKey = `strMeasure${i}`
			const ingredient = e[ingredientKey]
			const measure = e[measureKey]
			// Verificar si el ingrediente es válido (no vacío)
			if (ingredient && ingredient.trim() !== '') {
				// Crear una cadena con la cantidad y el ingrediente
				const ingredientEntry = `${measure} ${ingredient}`
				// Agregar la cadena a la lista de ingredientes
				ingredientList.push(ingredientEntry)
			}
		}
		setLoading(false)
		setIngredientes(ingredientList)
	}
	function irArriba() {
		divPlatoRandom?.current.scrollIntoView({ behavior: 'smooth' })
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
					<button className='btnAleatoria' onClick={pintarRecetas}>
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
						irArriba={irArriba}
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
								irArriba={irArriba}
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
