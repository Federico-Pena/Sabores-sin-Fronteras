import data from '../../datosIngredientes.json'
export const obtenerIngredientes = () => {
	for (let i = 0; i < data.meals.length; i++) {
		data.meals[
			i
		].foto = `https://www.themealdb.com/images/ingredients/${data.meals[i].strIngredient}-Small.png`
	}
	return data
}
