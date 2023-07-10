import styles from './PlatoPais.module.css'
import stylesReceta from '../../components/Receta/Receta.module.css'

import stylesDefault from '../../App.module.css'
import { useEffect, useRef, useState } from 'react'
import Receta from '../../components/Receta/Receta'
import Modal from '../../components/Modal/Modal'
import IngredientesComponent from '../../components/IngredientesComponent/IngredientesComponent'
import { textIngredientFormater } from '../../helpers/textIngredientFormater'
import RegionesComponent from '../../components/RegionesComponent/RegionesComponent'
function PlatoPais() {
	const [region, setRegion] = useState()
	const [ingrediente, setIngrediente] = useState()
	const [ingredientList, setIngredientList] = useState()
	const [receta, setReceta] = useState()
	const [recetas, setRecetas] = useState()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const sectionRef = useRef(null)

	useEffect(() => {
		const fetchRecetaFiltrada = async () => {
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
				}, 900)
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
		console.log(e)
		setLoading(true)
		const ingredientList = textIngredientFormater(e)
		setIngredientList(ingredientList)
		setReceta(e)
		if (sectionRef.current) {
			sectionRef.current.scrollIntoView({ behavior: 'smooth' })
		}
		setLoading(false)
	}

	function cerrarModal() {
		setError(false)
	}

	function cerrarReceta(e) {
		e.current.classList.add(stylesReceta.recetasContainerCerrar)
		setTimeout(() => {
			setReceta()
			setIngredientList()
		}, 800)
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
						<h3 className={styles.titulos2}>Ingredientes Y Regiones</h3>
					</div>
					<div className={styles.opciones}>
						<IngredientesComponent
							buscarRecetaPorIngrediente={setarIngrediente}
						/>
						<RegionesComponent elegirFiltroPais={elegirFiltroPais} />
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
							recetas.map((receta) => {
								return (
									<div
										onClick={() => mostrarReceta(receta.idMeal)}
										key={receta.idMeal}
										className={styles.recetaCerrada}>
										<div className={styles.recetaCerradaFotoNombre}>
											<img src={receta.strMealThumb} alt={receta.strMeal} />
											<p>
												{receta.strMeal} <samp>N° {receta.idMeal}</samp>
											</p>
										</div>
									</div>
								)
							})
						) : null}
					</section>
				)}
				{!recetas?.length ? (
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
