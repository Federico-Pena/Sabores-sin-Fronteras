import styles from './PlatoPais.module.css'
import stylesDefault from '../../App.module.css'
import { useEffect, useRef, useState } from 'react'
import Receta from '../../components/Receta/Receta'
import Modal from '../../components/Modal/Modal'
import { obtenerRegiones } from '../../helpers/obtenerRegiones'
import IngredientesComponent from '../../components/IngredientesComponent/IngredientesComponent'
import { textIngredientFormater } from '../../helpers/textIngredientFormater'
import RegionesComponent from '../../components/RegionesComponent/RegionesComponent'
import ContenedorRecetas from '../../components/ContenedorRecetas/ContenedorRecetas'
function PlatoPais() {
	const [region, setPais] = useState()
	const [regiones, setRegiones] = useState()
	const [ingrediente, setIngrediente] = useState()
	const [ingredientList, setIngredientList] = useState()
	const [receta, setReceta] = useState()
	const [recetas, setRecetas] = useState()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [buscado, setBuscado] = useState()
	const sectionRef = useRef(null)

	useEffect(() => {
		//todas las regiones
		const fetchRegions = () => {
			const data = obtenerRegiones()
			setRegiones(data.sort((a, b) => (a.strArea < b.strArea ? -1 : 1)))
		}
		fetchRegions()
	}, [])

	useEffect(() => {
		//buscar recetas por una region
		const fetchRegion = async () => {
			setLoading(true)
			setBuscado()
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
			setBuscado(region)
		}
		if (region) {
			setTimeout(() => {
				if (sectionRef.current) {
					sectionRef.current.scrollIntoView({ behavior: 'smooth' })
				}
			}, 500)
		}
		fetchRegion()
	}, [region])

	useEffect(() => {
		const buscarRecetaPorIngrediente = async () => {
			setLoading(true)
			setBuscado()
			try {
				const response = await fetch(
					`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`
				)
				const data = await response.json()
				setRecetas(data.meals)
			} catch (error) {
				setError(true)
			}
			setReceta()
			setPais()
			setLoading(false)
			setBuscado(ingrediente)
			if (ingrediente) {
				setTimeout(() => {
					if (sectionRef.current) {
						sectionRef.current.scrollIntoView({ behavior: 'smooth' })
					}
				}, 500)
			}
		}
		buscarRecetaPorIngrediente()
	}, [ingrediente])

	//mostrar Receta al hacerle click a la foto
	const mostrarReceta = (e) => {
		setLoading(true)
		const ingredientList = textIngredientFormater(e)
		setIngredientList(ingredientList)
		setReceta(e)
		setLoading(false)
		if (receta) {
			setTimeout(() => {
				if (sectionRef.current) {
					sectionRef.current.scrollIntoView({ behavior: 'smooth' })
				}
			}, 500)
		}
	}

	//mostrar resultados del filtro Pais al hacer click en el icono
	const elegirFiltroPais = (e) => {
		setPais(e)
		setReceta()
	}

	function cerrarModal() {
		setError(false)
		setReceta()
		setIngredientList()
	}

	function manejoErrorReceta(e) {
		setError(e)
	}
	function setarIngrediente(e) {
		setIngrediente(e)
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

			<main
				className={`${styles.divPlatoPais} ${stylesDefault.DflexContainer}`}>
				<section className={stylesDefault.DsectionRandomRecetas}>
					<div className={styles.titulos}>
						<h1 translate='no'>
							Encuentra Recetas Exquisitas Según Tus Ingredientes Favoritos O
							País De Origen
						</h1>
					</div>
					<div className={styles.opciones}>
						<IngredientesComponent
							buscarRecetaPorIngrediente={setarIngrediente}
						/>
						<RegionesComponent
							regiones={regiones}
							elegirFiltroPais={elegirFiltroPais}
						/>
					</div>
				</section>

				<section
					className={stylesDefault.DsectionRandomRecetas}
					ref={sectionRef}>
					{buscado && !receta && recetas ? (
						<h3 className={styles.buscadoH1}>
							{buscado} {recetas.length} Results
						</h3>
					) : buscado && !receta ? (
						<h3 translate='no' className={styles.buscadoH1}>
							No Hay Resultados
						</h3>
					) : null}
					{receta ? (
						<Receta
							cerrarReceta={cerrarModal}
							ingredientes={ingredientList}
							receta={receta}
						/>
					) : recetas ? (
						<ContenedorRecetas>
							{recetas.map((receta, i) => {
								return (
									<Receta
										key={i}
										manejoError={manejoErrorReceta}
										mostrarReceta={mostrarReceta}
										receta={receta}
									/>
								)
							})}
						</ContenedorRecetas>
					) : (
						<h1 translate='no' className={styles.H1NadaPais}>
							Realiza Una Busqueda
						</h1>
					)}
				</section>
			</main>
		</>
	)
}

export default PlatoPais
