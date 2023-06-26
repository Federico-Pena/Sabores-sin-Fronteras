import { useEffect, useRef, useState } from 'react'
import Receta from '../components/Receta'
import Modal from '../components/Modal'
import { fetchIngredinetes, fetchRegiones } from '../helpers/fetchRecetas'
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
		if (pais) {
			fetchRegion()
		}
	}, [ingrediente, pais])
	useEffect(() => {
		inputFiltrar()
	}, [filtroIngrediente])

	const fetchRegions = async () => {
		setLoading(true)
		try {
			const data = await fetchRegiones()
			setRegiones(data)
		} catch (error) {
			setError(error)
		}
		setLoading(false)
	}
	const fetchIngredientes = async () => {
		try {
			const data = await fetchIngredinetes()
			setIngredientes(data[0].en)
		} catch (error) {
			setError(error)
		}
	}

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
					<div className='divContainerH2'>
						<h2 className='hidden' ref={h2Filtroref}>
							{pais || ingrediente}
						</h2>
					</div>
				</div>

				<div className='divRecetasNombre' ref={divRecetas}>
					<div className='divSugerencias'>
						<div className='ingredientes'>
							<ul>
								{filtroIngrediente
									? filtrosInputIngredientes?.map((ing, i) => {
											return (
												<li
													key={ing.idIngredient}
													onClick={() => {
														elegirFiltroIngrediente(ing.strIngredient)
														aparecerNombre()
													}}>
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
													onClick={() => {
														aparecerNombre()
														elegirFiltroIngrediente(ing.strIngredient)
													}}>
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
													onClick={() => {
														aparecerNombre()
														elegirFiltroPais(region.en)
													}}
													key={i}
													title={region.es}>
													<img
														src={region.foto}
														alt={region.es}
														loading='lazy'
													/>
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
													<img
														src={region.foto}
														alt={region.es}
														loading='lazy'
													/>
												</li>
											)
									  })}
							</ul>
						</div>
					</div>
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
