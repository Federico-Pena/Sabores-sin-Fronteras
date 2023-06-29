export const fetchRecetas = async () => {
	const ingredientList = []
	const datafetch = []
	try {
		const result = await fetch(
			'https://www.themealdb.com/api/json/v1/1/random.php'
		)
		const data = await result.json()
		datafetch.push(data)
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
		return error
	}
	return { data: datafetch, ingredientes: ingredientList }
}
