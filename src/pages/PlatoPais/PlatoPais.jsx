import styles from './PlatoPais.module.css'
import stylesReceta from '../../components/Receta/Receta.module.css'

import stylesDefault from '../../App.module.css'
import { useEffect, useRef, useState } from 'react'
import Receta from '../../components/Receta/Receta'
import Modal from '../../components/Modal/Modal'
import IngredientesComponent from '../../components/IngredientesComponent/IngredientesComponent'
import { textIngredientFormater } from '../../helpers/textIngredientFormater'
import RegionesComponent from '../../components/RegionesComponent/RegionesComponent'
import RecetaCerrada from '../../components/Receta/RecetaCerrada'
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
			setLoading(true)
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
				}, 200)
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		}
		fetchRecetaFiltrada()
	}, [ingrediente, region])

	//mostrar resultados del filtro Pais al hacer click en el icono
	const elegirFiltroPais = (e) => {
		setIngrediente()
		setRegion(e)
		setReceta()
	}

	//mostrar resultados del filtro Ingrediente al hacer click en el icono
	function setarIngrediente(e) {
		setRegion()
		setIngrediente(e)
		setReceta()
	}

	//mostrar Receta al hacerle click a la foto
	const mostrarReceta = (e) => {
		setLoading(true)
		const ingredientList = textIngredientFormater(e)
		setIngredientList(ingredientList)
		setReceta(e)
		setTimeout(() => {
			if (sectionRef.current) {
				sectionRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		}, 200)
		setLoading(false)
	}

	function cerrarModal() {
		setError(false)
	}

	function cerrarReceta(e) {
		e.current.classList.add(stylesReceta.recetasCerrar)
		setTimeout(() => {
			setReceta()
			setIngredientList()
		}, 500)
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
						<RegionesComponent elegirFiltroPais={elegirFiltroPais} />
					</div>
				</section>
				{(receta || recetas?.length) && (
					<section
						className={
							ingredientList
								? stylesDefault.DsectionRandomRecetas
								: styles.divPlatoPaisRecetas
						}
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
									<RecetaCerrada
										key={receta.idMeal}
										mostrarReceta={mostrarReceta}
										receta={receta}
										setError={setError}
									/>
								)
							})
						) : null}
					</section>
				)}
				{(region || ingrediente) && !recetas?.length ? (
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
