import { useEffect, useState } from 'react'
import Receta from '../components/Receta'
import Modal from '../components/Modal'
import './PlatoPais.css'
function PlatoPais() {
	const [pais, setPais] = useState('')
	const [regiones, setRegiones] = useState()
	const [ingrediente, setIngrediente] = useState('')
	const [ingredientes, setIngredientes] = useState()
	const [recetas, setRecetas] = useState()
	const [receta, setReceta] = useState()
	const [loading, setLoading] = useState(false)
	const [ingredientList, setIngredientList] = useState('')
	const [error, setError] = useState()
	const [filtroIngrediente, setFiltroIngrediente] = useState()
	const [filtrosInputIngredientes, setFiltrosInputIngredientes] = useState()
	const [filtrosInputRegiones, setFiltrosInputRegiones] = useState()
	function scorlltop() {
		const h2 = document.querySelector('.divRecetasNombreH2')
		if (h2?.getBoundingClientRect().top <= 10) {
			h2?.classList.add('divRecetasNombreTop')
		}
		if (window.scrollY <= 900) {
			h2?.classList.remove('divRecetasNombreTop')
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', () => scorlltop())
		return window.removeEventListener('scroll', () => scorlltop())
	}, [])
	useEffect(() => {
		fetchIngredinetes()
		fetchRegiones()
	}, [])
	useEffect(() => {
		if (ingrediente) {
			fetchIngrediente()
		}
		if (pais) {
			fetchRegion()
		}
	}, [ingrediente, pais])
	useEffect(() => {
		inputFiltrar()
	}, [filtroIngrediente])
	const fetchRegion = async () => {
		setLoading(true)
		try {
			const response = await fetch(
				`https://www.themealdb.com/api/json/v1/1/filter.php?a=${pais}`
			)
			const data = await response.json()
			setRecetas(data.meals)
		} catch (error) {
			setError(error)
		}
		setLoading(false)
	}
	const fetchRegiones = async () => {
		setLoading(true)
		let regionesEspañol = []

		let arrayFotos = [
			'https://e7.pngegg.com/pngimages/997/847/png-clipart-flag-of-the-united-states-flags-of-the-world-flag-of-china-united-states-flag-usa-thumbnail.png',
			'https://e7.pngegg.com/pngimages/696/612/png-clipart-new-england-flag-flag-of-england-flag-of-the-united-kingdom-england-flag-logo-thumbnail.png',
			'https://e7.pngegg.com/pngimages/64/392/png-clipart-canada-flag-flag-of-canada-national-flag-canada-day-canada-flag-flag-leaf-thumbnail.png',
			'https://e7.pngegg.com/pngimages/584/454/png-clipart-flag-of-china-graphy-flag-of-the-republic-of-china-china-flag-world-thumbnail.png',
			'https://th.bing.com/th/id/OIP.4Fg5Uzqh4m8qhKwl799FUwHaHa?w=177&h=180&c=7&r=0&o=5&pid=1.7',
			'https://i.pinimg.com/originals/35/49/aa/3549aad0417c481b7318c1aa876dd039.png',
			'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/62235/egypt-flag-emoji-clipart-md.png',
			'https://th.bing.com/th/id/OIP.QE01QSrGQaqhe9D7OcdIvwHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7',
			'https://th.bing.com/th/id/OIP.W3w0VjW25uF1sfDLqiFTKQHaHa?pid=ImgDet&rs=1',
			'	https://th.bing.com/th/id/OIP.X_Q9UGIH1KlU5DezR2kZ-AHaHa?pid=ImgDet&w=169&h=169&c=7',
			'https://th.bing.com/th/id/OIP.1np4lTJ7RNqqDztClXg1eQHaHa?pid=ImgDet&rs=1',
			'https://th.bing.com/th/id/OIP.jNJfYGegiV8BNOBfGxHIrgHaHa?w=158&h=180&c=7&r=0&o=5&pid=1.7',
			'https://th.bing.com/th/id/OIP.4bWuWMIR--gWL6IISLAyYQHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7',
			'https://th.bing.com/th/id/OIP.iaa72s8bF3ASUSSo2KmmDQAAAA?pid=ImgDet&w=174&h=174&c=7turismo.org/wp-content/uploads/2012/07/Bandera-de-Jamaica.png',
			'https://th.bing.com/th/id/R.88c4b7be952a6af3012dd2c62d0259b7?rik=qSzF6IKpE8kdvA&pid=ImgRaw&r=0',
			'https://th.bing.com/th/id/OIP.hxLhVTdxR7G4qJ68XFGoCgHaHa?pid=ImgDet&w=172&h=172&c=7',
			'https://th.bing.com/th/id/OIP.OqU9V7WPmm-Z97o-Df2ijgAAAA?w=170&h=180&c=7&r=0&o=5&pid=1.7',
			'https://th.bing.com/th/id/OIP.6pT0t6kZK3KIjw6d5N9k1wHaGq?w=244&h=220&c=7&r=0&o=5&pid=1.7',
			'https://th.bing.com/th/id/R.383bc8a91ed053774ac43fca78285c85?rik=FUujpoYPLWXy0g&pid=ImgRaw&r=0',
			'https://th.bing.com/th/id/R.0193f97efc246d99df8896920ff67d2e?rik=0yjdD2LBPqFjgg&pid=ImgRaw&r=0',
			'https://th.bing.com/th/id/OIP._f58iX21Mel7io9qMuNXkwHaHa?pid=ImgDet&rs=1',
			'https://th.bing.com/th/id/OIP.IqdRzvxpRh2gQa6oK1_d0gHaHa?w=173&h=180&c=7&r=0&o=5&pid=1.7',
			'https://th.bing.com/th/id/OIP.IkaFSF2ocih2WL8Ez8v_qAHaHa?w=188&h=187&c=7&r=0&o=5&pid=1.7',
			'https://th.bing.com/th/id/OIP.cATlnH2UoB-xq7Qp78GwmQHaHa?w=183&h=183&c=7&r=0&o=5&pid=1.7',
			'https://th.bing.com/th/id/OIP.kI5yprpk8jC7mmlT3wAhsQHaGU?w=222&h=187&c=7&r=0&o=5&pid=1.7',
			'https://cdn3.iconfinder.com/data/icons/o-shaped-flag-1/128/O_shaped_asian_flag-28-1024.png',
			'https://th.bing.com/th/id/OIP.laUbDa7KC0krze7Ckc8mqAHaHa?pid=ImgDet&w=172&h=172&c=7',
			'https://th.bing.com/th/id/OIP.su2xlOli3nSbGb5iw_-SeQAAAA?w=127&h=151&c=7&r=0&o=5&pid=1.7',
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
			setRegiones(regionesEspañol)
		} catch (error) {
			setError(error)
		}
		setLoading(false)
	}
	const fetchIngrediente = async () => {
		setLoading(true)
		try {
			const response = await fetch(
				`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`
			)
			const data = await response.json()
			setRecetas(data.meals)
		} catch (error) {
			setError(error)
		}
		setLoading(false)
	}
	const fetchIngredinetes = async () => {
		setLoading(true)
		let nombreEspañol = []
		try {
			const responseEN = await fetch('./datosIngredientes.json')
			const responseES = await fetch('./datosIngredientesEspañol.json')
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
			setIngredientes(nombreEspañol[0].en)
		} catch (error) {
			setError(error)
		}
		setLoading(false)
	}
	const mostrarReceta = (e) => {
		setLoading(true)
		const ingredientList = []
		setReceta(e)
		for (let i = 1; i <= 20; i++) {
			const ingredientKey = `strIngredient${i}`
			const measureKey = `strMeasure${i}`
			const ingredient = e[ingredientKey]
			const measure = e[measureKey]
			// Verificar si el ingrediente es válido (no vacío)
			if (ingredient && ingredient.trim() !== '') {
				// Crear una cadena con la cantidad y el ingrediente
				const ingredientEntry = `${measure} ${ingredient}`
				// Agregar la cadena a la lista de ingredientes
				ingredientList.push(ingredientEntry)
			}
		}
		setLoading(false)
		setIngredientList(ingredientList)
	}
	const elegirFiltroPais = (e) => {
		setPais(e)
		setIngrediente('')
		setReceta('')
	}
	const elegirFiltroIngrediente = (e) => {
		setIngrediente(e)
		setPais('')
		setReceta('')
	}
	function cerrarModal() {
		setError()
		setReceta()
	}
	function manejoErrorReceta(e) {
		setError(e)
	}
	function inputFiltrar() {
		setIngrediente()
		setPais()
		const ingredientesFiltrados = ingredientes?.filter((e) => {
			let item1 = e.nombreEspañol?.toLowerCase()
			let item2 = filtroIngrediente?.toLowerCase()
			if (item1.includes(item2)) {
				return e
			}
		})
		const regionesFiltradas = regiones?.filter((e) => {
			let item1 = e.es?.toLowerCase()
			let item2 = filtroIngrediente?.toLowerCase()
			if (item1.includes(item2)) {
				return e
			}
		})
		setFiltrosInputIngredientes(ingredientesFiltrados)
		setFiltrosInputRegiones(regionesFiltradas)
	}

	return (
		<>
			{loading ? <Modal loading={loading} /> : null}
			{error ? (
				<Modal
					titulo={'Ocurrió Un Error'}
					descripcion={'Intente Nuevamente'}
					cerrarModal={cerrarModal}
					error={error}
				/>
			) : null}
			<div className='divPlatoPais'>
				<h1>Saborea el Mundo a tu Manera</h1>
				<h2>
					Encuentra recetas exquisitas según tus ingredientes favoritos o país
					de origen
				</h2>
				<div className='divInputSearch'>
					<input
						placeholder='Papas'
						type='search'
						onChange={(e) => setFiltroIngrediente(e.target.value)}
						name='inputSearch'
					/>
					{filtrosInputRegiones?.length === 0 &&
					filtrosInputIngredientes?.length === 0 ? (
						<div className='divMsjError'>
							<h2>No Hay Coincidencias</h2>
							<img
								src='https://res.cloudinary.com/fotoscloudinary/image/upload/v1687373812/error_zdkoh9.png'
								alt='icono error'
							/>
						</div>
					) : null}
				</div>
				<div className='divSugerencias'>
					<div className='ingredientes'>
						<ul>
							{filtroIngrediente
								? filtrosInputIngredientes?.map((ing, i) => {
										return (
											<li
												key={ing.idIngredient}
												onClick={() =>
													elegirFiltroIngrediente(ing.strIngredient)
												}>
												<span>{ing.nombreEspañol}</span>
												{i >= 10 ? (
													<img
														src={ing.foto}
														alt={ing.nombreEspañol}
														title={ing.nombreEspañol}
														loading='lazy'
													/>
												) : (
													<img
														src={ing.foto}
														alt={ing.nombreEspañol}
														title={ing.nombreEspañol}
														loading='lazy'
													/>
												)}
												<img
													src={ing.foto}
													alt={ing.nombreEspañol}
													title={ing.nombreEspañol}
												/>
											</li>
										)
								  })
								: ingredientes?.map((ing) => {
										return (
											<li
												key={ing.idIngredient}
												onClick={() =>
													elegirFiltroIngrediente(ing.strIngredient)
												}>
												<span>{ing.nombreEspañol}</span>
												<img
													src={ing.foto}
													alt={ing.nombreEspañol}
													title={ing.nombreEspañol}
												/>
											</li>
										)
								  })}
						</ul>
					</div>
					<div className='paises'>
						<ul>
							{filtrosInputRegiones
								? filtrosInputRegiones?.map((region, i) => {
										return (
											<li
												onClick={() => elegirFiltroPais(region.en)}
												key={i}
												title={region.es}>
												<img src={region.foto} alt={region.es} loading='lazy' />
											</li>
										)
								  })
								: regiones?.map((region, i) => {
										return (
											<li
												onClick={() => elegirFiltroPais(region.en)}
												key={i}
												title={region.es}>
												<img src={region.foto} alt={region.es} loading='lazy' />
											</li>
										)
								  })}
						</ul>
					</div>
				</div>
				<div className='divRecetasNombre'>
					<h2 className='divRecetasNombreH2'>{pais || ingrediente}</h2>

					{receta ? (
						<Receta
							cerrarReceta={cerrarModal}
							ingredientes={ingredientList}
							loading={loading}
							receta={receta}
						/>
					) : recetas ? (
						recetas.map((receta, i) => {
							return (
								<Receta
									manejoError={manejoErrorReceta}
									mostrarReceta={mostrarReceta}
									loading={loading}
									key={i}
									receta={receta}
								/>
							)
						})
					) : null}
				</div>
			</div>
		</>
	)
}

export default PlatoPais
