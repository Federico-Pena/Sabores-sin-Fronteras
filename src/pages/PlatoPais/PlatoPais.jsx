import styles from './PlatoPais.module.css'
import stylesReceta from '../../components/Receta/Receta.module.css'

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
	const [region, setRegion] = useState()
	const [regiones, setRegiones] = useState()
	const [ingrediente, setIngrediente] = useState()
	const [ingredientList, setIngredientList] = useState()
	const [receta, setReceta] = useState()
	const [recetas, setRecetas] = useState()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [buscado, setBuscado] = useState()
	const sectionRef = useRef(null)
	const [resultado, setResultado] = useState(null)

	useEffect(() => {
		//todas las regiones
		const fetchRegions = () => {
			const data = obtenerRegiones()
			setRegiones(data.sort((a, b) => (a.strArea < b.strArea ? -1 : 1)))
		}
		fetchRegions()
	}, [])

	useEffect(() => {
		if (recetas && buscado) {
			setResultado(`${buscado} ${recetas.length} Results`)
		}
	}, [recetas, buscado])

	useEffect(() => {
		const fetchRecetaFiltrada = async () => {
			setBuscado(region ? region : ingrediente)
			try {
				const response = await fetch(
					region
						? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`
						: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`
				)
				const data = await response.json()
				setRecetas(data.meals)
				setTimeout(() => {
					if (sectionRef.current) {
						sectionRef.current.scrollIntoView({ behavior: 'smooth' })
					}
				}, 500)
			} catch (error) {
				setError(error)
			}
		}
		fetchRecetaFiltrada()
	}, [ingrediente, region])

	//mostrar resultados del filtro Pais al hacer click en el icono
	const elegirFiltroPais = (e) => {
		setRegion(e)
		setIngrediente()
		setReceta()
	}

	//mostrar resultados del filtro Ingrediente al hacer click en el icono
	function setarIngrediente(e) {
		setIngrediente(e)
		setRegion()
		setReceta()
	}

	//mostrar Receta al hacerle click a la foto
	const mostrarReceta = (e) => {
		setLoading(true)
		const ingredientList = textIngredientFormater(e)
		setIngredientList(ingredientList)
		setReceta(e)
		setLoading(false)
		setTimeout(() => {
			if (sectionRef.current) {
				sectionRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		}, 500)
	}

	function cerrarModal() {
		setError(false)
	}
	function cerrarReceta(e) {
		e.current.classList.add(stylesReceta.recetasContainerCerrar)
		setTimeout(() => {
			setReceta()
			setIngredientList()
		}, 900)
	}
	function manejoErrorReceta(e) {
		setError(e)
	}

	return (
		<>
			{loading && <Modal loading={loading} />}
			{error && (
				<Modal
					titulo={'Ocurrió Un Error'}
					descripcion={'Intente Nuevamente'}
					cerrarModal={cerrarModal}
					error={error}
				/>
			)}
			<main
				className={`${styles.divPlatoPais} ${stylesDefault.DflexContainer}`}>
				<section className={stylesDefault.DsectionRandomRecetas}>
					<div className={styles.titulos}>
						<h1 translate='no'>Descubre Cocinas del Mundo</h1>
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
				{(receta || recetas?.length) && (
					<section
						className={stylesDefault.DsectionRandomRecetas}
						ref={sectionRef}>
						{receta ? (
							<Receta
								cerrarReceta={cerrarReceta}
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
						) : null}
					</section>
				)}
				{buscado && !receta && recetas?.length ? (
					<h3 className={styles.buscadoH1} translate=''>
						{resultado}
					</h3>
				) : buscado && !receta && !recetas?.length ? (
					<section
						className={stylesDefault.DsectionRandomRecetas}
						ref={sectionRef}>
						<h3 translate='no' className={styles.H1Nada}>
							No Hay Resultados
						</h3>
					</section>
				) : null}
			</main>
		</>
	)
}

export default PlatoPais
