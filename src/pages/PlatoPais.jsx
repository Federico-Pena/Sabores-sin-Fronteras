import { useEffect, useState } from 'react'
import Receta from '../components/Receta/Receta'
import Modal from '../components/Modal/Modal'
import { fetchRegiones } from '../helpers/fetchingRegiones'
import './PlatoPais.css'
import IngredientesComponent from '../components/IngredientesComponent/IngredientesComponent'
import BuscadorPalabras from '../components/BuscadorDeLetras/BuscadorDeLetras'
import { textIngredientFormater } from '../helpers/textIngredientFormater'
function PlatoPais() {
	const [region, setPais] = useState('')
	const [regiones, setRegiones] = useState()
	const [ingredientList, setIngredientList] = useState('')
	const [receta, setReceta] = useState()
	const [recetas, setRecetas] = useState()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()

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
			setRegiones(
				data.sort((a, b) => (a.strIngredient > b.strIngredient ? -1 : 1))
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
	//mostrar resultados del filtro Ingrediente al hacer click en el icono
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
		setReceta()
		setLoading(false)
	}

	//mostrar Receta al hacerle click a la foto
	const mostrarReceta = (e) => {
		setLoading(true)
		const ingredientList = textIngredientFormater(e)
		setReceta(e)
		setLoading(false)
		setIngredientList(ingredientList)
	}

	//mostrar resultados del filtro Pais al hacer click en el icono
	const elegirFiltroPais = (e) => {
		setPais(e)
		setReceta('')
	}

	function cerrarModal() {
		setError()
		setReceta()
		setIngredientList()
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
					Encuentra Recetas Exquisitas Según Tus Ingredientes Favoritos O País
					De Origen
				</h2>
				<IngredientesComponent
					buscarRecetaPorIngrediente={buscarRecetaPorIngrediente}
				/>
				<div className='regiones'>
					<ul className='regionesUl'>
						{regiones?.map((region, i) => {
							return (
								<li
									className='regionesUlLi'
									onClick={() => {
										elegirFiltroPais(region.strArea)
									}}
									key={region.strArea}
									title={region.strArea}>
									<img
										src={region.foto}
										alt={region.strArea}
										className='regionesUlLiImg'
									/>
								</li>
							)
						})}
					</ul>
				</div>

				<div className='divRecetasContainer'>
					{receta ? (
						<Receta
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
