import stylesDefault from '../../App.module.css'
import stylesReceta from '../../components/Receta/Receta.module.css'
import styles from './RecetasGuardadas.module.css'
import { textIngredientFormater } from '../../helpers/textIngredientFormater'
import Receta from '../../components/Receta/Receta'
import { useEffect, useRef, useState } from 'react'
import Modal from '../../components/Modal/Modal'

function RecetasGuardadas() {
	const [DbLocal, setDbLocal] = useState()
	const [error, setError] = useState()
	const [receta, setReceta] = useState()
	const [ingredientList, setIngredientList] = useState()
	const divAgendaRef = useRef()

	useEffect(() => {
		const DB = JSON.parse(localStorage.getItem('recetas'))
		setDbLocal(DB)
	}, [])

	const verReceta = async (id, e) => {
		e.target.innerHTML = `<div class=${styles.loader}></div>`
		try {
			const response = await fetch(
				`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
			)
			const data = await response.json()
			const ingredientList = textIngredientFormater(data.meals[0])
			setIngredientList(ingredientList)
			setReceta(data.meals[0])
			setTimeout(() => {
				divAgendaRef.current?.scrollIntoView({ behavior: 'smooth' })
			}, 200)
		} catch (error) {
			setError(error)
		}
		e.target.innerHTML = `Ver`
	}

	const borrarReceta = (id) => {
		setReceta()
		const DB = JSON.parse(localStorage.getItem('recetas'))
		const filtrados = DB.filter((receta) => receta.idMeal !== id)
		if (filtrados?.length) {
			localStorage.setItem('recetas', JSON.stringify(filtrados))
			setDbLocal(filtrados)
		} else {
			const filtrado = DB.filter((receta) => receta.idMeal == id)
			if (filtrado?.length) {
				localStorage.setItem('recetas', JSON.stringify([]))
				setDbLocal([])
			}
		}
	}
	const cerrarReceta = (e) => {
		e.current.classList.add(stylesReceta.recetasCerrar)
		setTimeout(() => {
			setReceta('')
			setIngredientList('')
		}, 500)
	}
	const cerrarModal = () => {
		setError()
	}
	return (
		<main
			className={`${stylesDefault.DflexContainer} ${styles.divPlatosGuardados}`}>
			<section className={stylesDefault.DsectionRandomRecetas}>
				<>
					{error ? (
						<Modal
							titulo={'Ocurrió Un Error'}
							cerrarModal={cerrarModal}
							error={error}
						/>
					) : null}
					<div className={styles.divguardadas}>
						{!DbLocal ? (
							<h1 translate='no'>Guarda Alguna Receta</h1>
						) : DbLocal?.length ? (
							<h1 translate='no'>Recetas Guardadas</h1>
						) : (
							<h1 translate='no'>Guarda Alguna Receta</h1>
						)}
					</div>
					<div
						className={`${styles.divguardadas} ${styles.divGuardadasOverflow}`}>
						{DbLocal?.map((receta) => {
							return (
								<div key={receta.idMeal} className={styles.guardadas}>
									<div className={styles.guardadasFotoNombre}>
										<img src={receta.strMealThumb} alt={receta.strMeal} />
										<p>
											{receta.strMeal} <samp>N° {receta.idMeal}</samp>
										</p>
									</div>
									<div className={styles.guardadasBtns}>
										<button
											className={styles.BtnVer}
											onClick={(e) => verReceta(receta.idMeal, e)}>
											Ver
										</button>
										<button onClick={() => borrarReceta(receta.idMeal)}>
											borrar
										</button>
									</div>
								</div>
							)
						})}
					</div>
				</>
			</section>
			{receta ? (
				<section
					className={stylesDefault.DsectionRandomRecetas}
					ref={divAgendaRef}>
					<Receta
						receta={receta}
						ingredientes={ingredientList}
						cerrarReceta={cerrarReceta}
					/>
				</section>
			) : null}
		</main>
	)
}

export default RecetasGuardadas
