import eeuu from '../assets/images/eeuu.png'
import england from '../assets/images/england.png'
import canada from '../assets/images/canada.png'
import china from '../assets/images/china.png'
import croacia from '../assets/images/croacia.png'
import holanda from '../assets/images/holanda.png'
import egipto from '../assets/images/egipto.png'
import filipinas from '../assets/images/filipinas.png'
import francia from '../assets/images/francia.png'
import grecia from '../assets/images/grecia.png'
import india from '../assets/images/india.png'
import irlanda from '../assets/images/irlanda.png'
import italia from '../assets/images/italia.png'
import jamaica from '../assets/images/jamaica.png'
import japon from '../assets/images/japon.png'
import kenia from '../assets/images/kenia.png'
import malasia from '../assets/images/malasia.png'
import mexico from '../assets/images/mexico.png'
import marruecos from '../assets/images/marruecos.png'
import polonia from '../assets/images/polonia.png'
import portugal from '../assets/images/portugal.png'
import rusia from '../assets/images/rusia.png'
import españa from '../assets/images/españa.png'
import tailandia from '../assets/images/tailandia.png'
import tunez from '../assets/images/tunez.png'
import turquia from '../assets/images/turquia.png'
import desconocida from '../assets/images/desconocida.png'
import vietnam from '../assets/images/vietnam.png'
let arrayFotos = [
	eeuu,
	england,
	canada,
	china,
	croacia,
	holanda,
	egipto,
	filipinas,
	francia,
	grecia,
	india,
	irlanda,
	italia,
	jamaica,
	japon,
	kenia,
	malasia,
	mexico,
	marruecos,
	polonia,
	portugal,
	rusia,
	españa,
	tailandia,
	tunez,
	turquia,
	desconocida,
	vietnam,
]

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

export const fetchIngredinetes = async (pagina, ingredientesPorPagina) => {
	const nombreEspañol = []
	try {
		const responseEN = await fetch('../../datosIngredientes.json')
		const responseES = await fetch('../../datosIngredientesEspañol.json')
		const dataEN = await responseEN.json()
		const dataES = await responseES.json()
		const Promesas = await Promise.allSettled([dataEN, dataES])

		Promesas.forEach((Promesa) => {
			if (Promesa.status === 'fulfilled') {
				const ingredientesEN = Promesas[0].value.meals.slice(
					(pagina - 1) * ingredientesPorPagina,
					pagina * ingredientesPorPagina
				)
				const ingredientesES = Promesas[1].value.meals.slice(
					(pagina - 1) * ingredientesPorPagina,
					pagina * ingredientesPorPagina
				)
				nombreEspañol.length > 0
					? null
					: nombreEspañol.push({
							en: ingredientesEN,
							es: ingredientesES,
					  })
			}
		})

		for (let i = 0; i < nombreEspañol[0].en.length; i++) {
			nombreEspañol[0].en[
				i
			].foto = `https://www.themealdb.com/images/ingredients/${nombreEspañol[0].en[i].strIngredient}.png`
			nombreEspañol[0].en[i].nombreEspañol =
				nombreEspañol[0].es[i].strIngredient
		}
	} catch (error) {
		console.error(error)
		throw new Error('Hubo un error al obtener los ingredientes.')
	}
	return nombreEspañol[0]
}

export const fetchRegiones = async () => {
	let regionesEspañol = []
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
