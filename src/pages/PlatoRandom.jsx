import { useState, useEffect } from 'react'
import Receta from '../components/Receta'
import './PlatoRandom.css'
import { TfiReload } from 'react-icons/tfi'
import Modal from '../components/Modal'
function PlatoRandom() {
	const [receta, setReceta] = useState('')
	const [ingredientes, setIngredientes] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()

	useEffect(() => {
		fetchRecetas()
	}, [])

	const fetchRecetas = async () => {
		const ingredientList = []
		setLoading(true)
		try {
			const result = await fetch(
				'https://www.themealdb.com/api/json/v1/1/random.php'
			)
			const data = await result.json()
			setReceta(data.meals[0])
			// Iterar sobre los ingredientes y medidas
			for (let i = 1; i <= 20; i++) {
				const ingredientKey = `strIngredient${i}`
				const measureKey = `strMeasure${i}`
				const ingredient = data.meals[0][ingredientKey]
				const measure = data.meals[0][measureKey]
				// Verificar si el ingrediente es válido (no vacío)
				if (ingredient && ingredient.trim() !== '') {
					// Crear una cadena con la cantidad y el ingrediente
					const ingredientEntry = `${measure} ${ingredient}`
					// Agregar la cadena a la lista de ingredientes
					ingredientList.push(ingredientEntry)
				}
			}
		} catch (error) {
			setError(error)
		}
		setLoading(false)

		setIngredientes(ingredientList)
	}
	function manejoError(error) {
		setError(error)
	}
	function cerrarModal() {
		setError()
	}

	return (
		<div className='divPlatoRandom'>
			{error ? (
				<Modal
					cerrarModal={cerrarModal}
					manejoError={manejoError}
					error={error}
					titulo={'Ocurrió Un Error'}
				/>
			) : loading ? (
				<Modal loading={loading} />
			) : receta ? (
				<>
					<h1>Sorpresa Culinaria</h1>
					<button className='btnAleatoria' onClick={fetchRecetas}>
						<TfiReload />
					</button>
					<Receta
						manejoError={manejoError}
						ingredientes={ingredientes}
						receta={receta}
						loading={loading}
					/>
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
