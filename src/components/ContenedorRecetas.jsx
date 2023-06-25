import { useState, useEffect } from 'react'
import Receta from './Receta'
function ContenedorRecetas() {
	const [receta, setReceta] = useState('')
	const [ingredientes, setIngredientes] = useState([])
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		fetchRecetas()
	}, [])
	const fetchRecetas = () => {
		const ingredientList = []
		setLoading(true)
		fetch('https://www.themealdb.com/api/json/v1/1/random.php')
			.then((res) => res.json())
			.then((data) => {
				console.log(data.meals[0])
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
				setLoading(false)
			})

		setIngredientes(ingredientList)
	}

	return (
		<>
			<Receta ingredientes={ingredientes} receta={receta} loading={loading} />
			<Receta ingredientes={ingredientes} receta={receta} loading={loading} />
			<Receta ingredientes={ingredientes} receta={receta} loading={loading} />
			<Receta ingredientes={ingredientes} receta={receta} loading={loading} />
			<Receta ingredientes={ingredientes} receta={receta} loading={loading} />
			<Receta ingredientes={ingredientes} receta={receta} loading={loading} />
		</>
	)
}

export default ContenedorRecetas
