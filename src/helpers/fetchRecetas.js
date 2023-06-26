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

export const fetchIngredinetes = async () => {
	let nombreEspañol = []
	try {
		const responseEN = await fetch('../../datosIngredientes.json')
		const responseES = await fetch('../../datosIngredientesEspañol.json')
		const dateEN = await responseEN.json()
		const dateES = await responseES.json()
		const Promesas = await Promise.allSettled([dateEN, dateES])
		Promesas.forEach((Promesa) => {
			if (Promesa.status === 'fulfilled') {
				nombreEspañol.length > 0
					? null
					: nombreEspañol.push({
							en: Promesas[0].value.meals,
							es: Promesas[1].value.meals,
					  })
			}
		})
		for (let i = 0; i < Promesas[0].value.meals.length; i++) {
			nombreEspañol[0].en[
				i
			].foto = `https://www.themealdb.com/images/ingredients/${nombreEspañol[0].en[i].strIngredient}-Small.png`
			nombreEspañol[0].en[i].nombreEspañol =
				Promesas[1].value.meals[i].strIngredient
		}
	} catch (error) {
		return error
	}
	return nombreEspañol
}

export const fetchRegiones = async () => {
	let regionesEspañol = []

	let arrayFotos = [
		'../../assets/images/eeuu.png',
		'../../assets/images/england.png',
		'../../assets/images/canada.png',
		'../../assets/images/china.png',
		'../../assets/images/croacia.png',
		'../../assets/images/holanda.png',
		'../../assets/images/egipto.png',
		'../../assets/images/filipinas.png',
		'../../assets/images/francia.png',
		'../../assets/images/grecia.png',
		'../../assets/images/india.png',
		'../../assets/images/irlanda.png',
		'../../assets/images/italia.png',
		'../../assets/images/jamaica.png',
		'../../assets/images/japon.png',
		'../../assets/images/kenia.png',
		'../../assets/images/malasia.png',
		'../../assets/images/mexico.png',
		'../../assets/images/marruecos.png',
		'../../assets/images/polonia.png',
		'../../assets/images/portugal.png',
		'../../assets/images/rusia.png',
		'../../assets/images/españa.png',
		'../../assets/images/tailandia.png',
		'../../assets/images/tunez.png',
		'../../assets/images/turquia.png',
		'../../assets/images/desconocida.png',
		'../../assets/images/vietnam.png',
	]
	try {
		const responseEN = await fetch('./datosRegiones.json')
		const dataEN = await responseEN.json()
		const responseES = await fetch('./datosRegionesEspañol.json')
		const dataES = await responseES.json()
		const Promesas = await Promise.all([dataES, dataEN])
		Promesas[0].meals?.map((dataes) => {
			regionesEspañol.push({ es: dataes.strArea })
		})
		Promesas[1].meals?.map((dataen, i) => {
			regionesEspañol[i].en = dataen.strArea
			regionesEspañol[i].foto = arrayFotos[i]
		})
	} catch (error) {
		return error
	}
	return regionesEspañol
}
