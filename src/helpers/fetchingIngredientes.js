export const fetchIngredientes = async () => {
	try {
		const response = await fetch('../../datosIngredientes.json')
		const data = await response.json()
		if (data.meals.length > 0) {
			for (let i = 0; i < data.meals.length; i++) {
				data.meals[
					i
				].foto = `https://www.themealdb.com/images/ingredients/${data.meals[i].strIngredient}-Small.png`
			}
			return data
		}
	} catch (error) {
		console.error(error)
		throw new Error('Hubo un error al obtener los ingredientes.')
	}
}
