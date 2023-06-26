import eeuu from '../../public/assets/images/eeuu.png'
import england from '../../public/assets/images/england.png'
import canada from '../../public/assets/images/canada.png'
import china from '../../public/assets/images/china.png'
import croacia from '../../public/assets/images/croacia.png'
import holanda from '../../public/assets/images/holanda.png'
import egipto from '../../public/assets/images/egipto.png'
import filipinas from '../../public/assets/images/filipinas.png'
import francia from '../../public/assets/images/francia.png'
import grecia from '../../public/assets/images/grecia.png'
import india from '../../public/assets/images/india.png'
import irlanda from '../../public/assets/images/irlanda.png'
import italia from '../../public/assets/images/italia.png'
import jamaica from '../../public/assets/images/jamaica.png'
import japon from '../../public/assets/images/japon.png'
import kenia from '../../public/assets/images/kenia.png'
import malasia from '../../public/assets/images/malasia.png'
import mexico from '../../public/assets/images/mexico.png'
import marruecos from '../../public/assets/images/marruecos.png'
import polonia from '../../public/assets/images/polonia.png'
import portugal from '../../public/assets/images/portugal.png'
import rusia from '../../public/assets/images/rusia.png'
import españa from '../../public/assets/images/españa.png'
import tailandia from '../../public/assets/images/tailandia.png'
import tunez from '../../public/assets/images/tunez.png'
import turquia from '../../public/assets/images/turquia.png'
import desconocida from '../../public/assets/images/desconocida.png'
import vietnam from '../../public/assets/images/vietnam.png'
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
	try {
		const responseEN = await fetch('../../datosIngredientes.json')
		const responseES = await fetch('../../datosIngredientesEspañol.json')
		const dataEN = await responseEN.json()
		const dataES = await responseES.json()
		const ingredientes = {
			en: dataEN.meals || [],
			es: dataES.meals || [],
		}
		const ingredientesPorPaginaEN = ingredientes.en.slice(
			(pagina - 1) * ingredientesPorPagina,
			pagina * ingredientesPorPagina
		)
		const ingredientesPorPaginaES = ingredientes.es.slice(
			(pagina - 1) * ingredientesPorPagina,
			pagina * ingredientesPorPagina
		)

		const imagenesPromesas = ingredientesPorPaginaEN.map(
			async (ingredienteEN) => {
				const url = `https://www.themealdb.com/images/ingredients/${ingredienteEN.strIngredient}.png`
				const response = await fetch(url)
				const blob = await response.blob()
				return URL.createObjectURL(blob)
			}
		)

		const imagenes = await Promise.all(imagenesPromesas)

		const ingredientesConImagenes = ingredientesPorPaginaEN.map(
			(ingredienteEN, index) => ({
				...ingredienteEN,
				foto: imagenes[index],
				nombreEspañol: ingredientesPorPaginaES[index]?.strIngredient,
			})
		)

		return ingredientesConImagenes
	} catch (error) {
		console.error(error)
		throw new Error('Hubo un error al obtener los ingredientes.')
	}
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
