export const textIngredientFormater = (listaDeIngredientes) => {
	const ingredientList = []
	for (let i = 1; i <= 20; i++) {
		const ingredientKey = `strIngredient${i}`
		const measureKey = `strMeasure${i}`
		const ingredient = listaDeIngredientes[ingredientKey]
		const measure = listaDeIngredientes[measureKey]
		// Verificar si el ingrediente es válido (no vacío)
		if (ingredient && ingredient.trim() !== '') {
			// Crear una cadena con la cantidad y el ingrediente
			const ingredientEntry = `${measure} ${ingredient}`
			// Agregar la cadena a la lista de ingredientes
			ingredientList.push(ingredientEntry)
		}
	}
	return ingredientList
}
