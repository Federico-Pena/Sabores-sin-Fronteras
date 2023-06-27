import { useEffect, useRef, useState } from 'react'
import Receta from '../components/Receta'
import Modal from '../components/Modal'
import { fetchRegiones } from '../helpers/fetchRecetas'
import './PlatoPais.css'
import IngredientesComponent from '../components/IngredientesComponent'
import BuscadorPalabras from '../components/BuscadorDePalabras'
function PlatoPais() {
	const [region, setPais] = useState('')
	const [regiones, setRegiones] = useState()
	const [ingredientList, setIngredientList] = useState('')
	const [receta, setReceta] = useState()
	const [recetas, setRecetas] = useState()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()
	const divSugerenciasRef = useRef(null)

	useEffect(() => {
		fetchRegions()
	}, [])
	useEffect(() => {
		if (region) {
			fetchRegion()
		}
	}, [region])

	//todas las regiones
	const fetchRegions = async () => {
		setLoading(true)
		try {
			const data = await fetchRegiones()
			setRegiones(data.sort((a, b) => (a.es > b.es ? 1 : -1)))
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
	const buscarRecetaPorIngrediente = async (e) => {
		setLoading(true)
		try {
			const response = await fetch(
				`https://www.themealdb.com/api/json/v1/1/filter.php?i=${e}`
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

	//mostrar resultados del filtro Pais
	const elegirFiltroPais = (e) => {
		setPais(e)
		setReceta('')
	}
	//mostrar resultados del filtro Ingrediente

	function cerrarModal() {
		setError()
		setReceta()
		setIngredientList()
	}

	function manejoErrorReceta(e) {
		setError(e)
	}

	function irArriba() {
		divSugerenciasRef.current?.scrollIntoView({
			behavior: 'smooth',
		})
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
					Encuentra Recetas Exquisitas Según Tus Ingredientes Favoritos O País
					De Origen
				</h2>

				<div className='divRecetasNombre'>
					<div className='divSugerencias'>
						<div className='regiones'>
							<ul>
								{regiones?.map((region, i) => {
									return (
										<li
											onClick={() => {
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
						<IngredientesComponent
							buscarRecetaPorIngrediente={buscarRecetaPorIngrediente}
							ingredientesPorPagina={150}
						/>
					</div>
					<div className='divRecetasContainer' ref={divSugerenciasRef}>
						{receta ? (
							<Receta
								irArriba={irArriba}
								cerrarReceta={cerrarModal}
								ingredientes={ingredientList}
								receta={receta}
							/>
						) : recetas ? (
							recetas.map((receta, i) => {
								return (
									<Receta
										manejoError={manejoErrorReceta}
										mostrarReceta={mostrarReceta}
										key={i}
										receta={receta}
										irArriba={irArriba}
									/>
								)
							})
						) : null}
					</div>
				</div>
			</div>
		</>
	)
}

export default PlatoPais
