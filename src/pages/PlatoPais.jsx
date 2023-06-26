import { useEffect, useRef, useState } from 'react'
import Receta from '../components/Receta'
import Modal from '../components/Modal'
import { fetchIngredinetes, fetchRegiones } from '../helpers/fetchRecetas'
import './PlatoPais.css'
function PlatoPais() {
	const [region, setPais] = useState('')
	const [regiones, setRegiones] = useState()
	const [ingrediente, setIngrediente] = useState('')
	const [ingredientes, setIngredientes] = useState()
	const [ingredientList, setIngredientList] = useState('')
	const [filtroIngrediente, setFiltroIngrediente] = useState('')
	const [filtrosInputIngredientes, setFiltrosInputIngredientes] = useState()
	const [filtrosInputRegiones, setFiltrosInputRegiones] = useState()
	const [receta, setReceta] = useState()
	const [recetas, setRecetas] = useState()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()

	const h2Filtroref = useRef()
	const divRecetas = useRef()

	useEffect(() => {
		window.addEventListener('scroll', aparecerNombre)
		return () => {
			window.removeEventListener('scroll', aparecerNombre)
		}
	})
	const aparecerNombre = () => {
		if (divRecetas.current.getBoundingClientRect().top <= -350) {
			h2Filtroref.current.classList.add('NombreH2')
			h2Filtroref.current.classList.remove('hidden')
		}
		if (divRecetas.current.getBoundingClientRect().top >= -350) {
			h2Filtroref.current.classList.remove('NombreH2')
			h2Filtroref.current.classList.add('hidden')
		}
	}
	useEffect(() => {
		fetchIngredientes()
		fetchRegions()
	}, [])
	useEffect(() => {
		if (ingrediente) {
			fetchIngrediente()
		}
		if (region) {
			fetchRegion()
		}
	}, [ingrediente, region])

	useEffect(() => {
		inputFiltrar()
	}, [filtroIngrediente])

	//todas las regiones
	const fetchRegions = async () => {
		try {
			const data = await fetchRegiones()
			setRegiones(data.sort((a, b) => (a.es > b.es ? 1 : -1)))
		} catch (error) {
			setError(error)
		}
	}
	//de a 40 ingredientes
	const fetchIngredientes = async () => {
		setLoading(true)
		try {
			const data = await fetchIngredinetes(1, 574)

			setIngredientes(
				data.sort((a, b) => (a.nombreEspañol > b.nombreEspañol ? 1 : -1))
			)
		} catch (error) {
			setError(error)
		}
		setLoading(false)
	}
	//buscar recetas por una region
	const fetchRegion = async () => {
		setLoading(true)
		try {
			const response = await fetch(
				`https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`
			)
			const data = await response.json()
			setRecetas(data.meals)
		} catch (error) {
			setError(error)
		}
		setLoading(false)
	}
	//buscar recetas por un ingrediente
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
	//mostrar Receta al hacerle click a la foto

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
	//funcion del filtro del input
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
	//mostrar resultados del filtro Pais
	const elegirFiltroPais = (e) => {
		setPais(e)
		setIngrediente('')
		setReceta('')
	}
	//mostrar resultados del filtro Ingrediente

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
						placeholder='Papas, Holandesa'
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
					<div className='divContainerH2'>
						<h2 className='hidden' ref={h2Filtroref}>
							{region || ingrediente}
						</h2>
					</div>
				</div>

				<div className='divRecetasNombre' ref={divRecetas}>
					{ingredientes && ingredientes[570]?.foto ? (
						<div className='divSugerencias'>
							<div className='ingredientes'>
								<ul>
									{filtroIngrediente
										? filtrosInputIngredientes?.map((ing) => {
												return (
													<li
														key={ing.idIngredient}
														onClick={() => {
															elegirFiltroIngrediente(ing.strIngredient)
															aparecerNombre()
														}}>
														<span>{ing.nombreEspañol}</span>

														<img
															src={ing.foto}
															alt={ing.nombreEspañol}
															title={ing.nombreEspañol}
															loading='lazy'
														/>
													</li>
												)
										  })
										: ingredientes?.map((ing) => {
												return (
													<li
														key={ing.idIngredient}
														onClick={() => {
															aparecerNombre()
															elegirFiltroIngrediente(ing.strIngredient)
														}}>
														<span>{ing.nombreEspañol}</span>
														<img
															src={ing.foto}
															alt={ing.nombreEspañol}
															title={ing.nombreEspañol}
															loading='lazy'
														/>
													</li>
												)
										  })}
								</ul>
							</div>
							<div className='regiones'>
								<ul>
									{filtrosInputRegiones
										? filtrosInputRegiones?.map((region, i) => {
												return (
													<li
														onClick={() => {
															aparecerNombre()
															elegirFiltroPais(region.en)
														}}
														key={i}
														title={region.es}>
														<img src={region.foto} alt={region.es} />
													</li>
												)
										  })
										: regiones?.map((region, i) => {
												return (
													<li
														onClick={() => {
															aparecerNombre()
															elegirFiltroPais(region.en)
														}}
														key={i}
														title={region.es}>
														<img src={region.foto} alt={region.es} />
													</li>
												)
										  })}
								</ul>
							</div>
						</div>
					) : (
						<Modal
							contenido={loading}
							titulo={
								'A Buscar Recetas!!! Puedes Buscarlas Por Ingrediente O Nacionalidad'
							}
						/>
					)}

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
