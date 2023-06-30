import { textIngredientFormater } from './textIngredientFormater'
export const fetchRecetas = async () => {
	const ingredientList = []
	const datafetch = []

	try {
		const result = await fetch(
			'https://www.themealdb.com/api/json/v1/1/random.php'
		)
		const data = await result.json()
		datafetch.push(data)
		const ingredientesFormateados = textIngredientFormater(data.meals[0])
		ingredientList.push(...ingredientesFormateados)
	} catch (error) {
		return error
	}
	return { data: datafetch, ingredientes: ingredientList }
}
