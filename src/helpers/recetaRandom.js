import { textIngredientFormater } from './textIngredientFormater'
export const recetaRandom = async () => {
	const ingredientList = []
	let receta

	try {
		const result = await fetch(
			'https://www.themealdb.com/api/json/v1/1/random.php'
		)
		const data = await result.json()
		receta = data.meals[0]

		const ingredientesFormateados = textIngredientFormater(data.meals[0])
		ingredientList.push(...ingredientesFormateados)
	} catch (error) {
		return error
	}

	return { receta, ingredientes: ingredientList }
}
