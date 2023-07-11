import stylesDefault from '../../App.module.css'
import stylesReceta from '../../components/Receta/Receta.module.css'
import styles from './PlatoLetra.module.css'
import { useEffect, useRef, useState } from 'react'
import BuscadorDePalabras from '../../components/BuscadorDeLetras/BuscadorDeLetras'
import Receta from '../../components/Receta/Receta'
import { textIngredientFormater } from '../../helpers/textIngredientFormater'
import RecetaCerrada from '../../components/Receta/RecetaCerrada'
function PlatoLetra() {
	const [buscado, setBuscado] = useState()
	const [receta, setReceta] = useState()
	const [ingredientes, setIngredientes] = useState()
	const [recetas, setRecetas] = useState([])
	const sectionLetraRef = useRef()

	useEffect(() => {
		mostrarBuscados(buscado)
	}, [buscado])

	function buscadorRecetas(e) {
		setRecetas(e)
		setReceta()
		if (sectionLetraRef.current) {
			setTimeout(() => {
				sectionLetraRef.current.scrollIntoView({ behavior: 'smooth' })
			}, 200)
		}
	}

	function mostrarBuscados(e) {
		setBuscado(e)
	}

	function mostrarReceta(e) {
		setReceta(e)
		const ingredientList = textIngredientFormater(e)
		setIngredientes(ingredientList)
	}

	function cerrarReceta(e) {
		e.current.classList.add(stylesReceta.recetasCerrar)
		setTimeout(() => {
			setReceta()
			setIngredientes()
		}, 500)
	}

	return (
		<main className={`${stylesDefault.DflexContainer} ${styles.divPLatoLetra}`}>
			<section className={stylesDefault.DsectionRandomRecetas}>
				<div className={styles.tituloPLatoLetra}>
					<h1>Explora por Letra</h1>
				</div>
				<div className={styles.BuscadorDePalabrasPLatoLetra}>
					<BuscadorDePalabras
						buscadorRecetas={buscadorRecetas}
						setBuscados={mostrarBuscados}
					/>
				</div>
			</section>
			<section
				className={
					ingredientes
						? stylesDefault.DsectionRandomRecetas
						: styles.divPLatoLetraReceta
				}
				ref={sectionLetraRef}>
				{receta ? (
					<Receta
						ingredientes={ingredientes}
						receta={receta}
						cerrarReceta={cerrarReceta}
					/>
				) : recetas?.length > 0 ? (
					recetas.map((receta, i) => {
						return (
							<RecetaCerrada
								key={receta.idMeal}
								mostrarReceta={mostrarReceta}
								receta={receta}
							/>
						)
					})
				) : null}
				{buscado && !recetas?.length ? (
					<h3 translate='no' className={styles.H1NadaLetra}>
						No Hay Resultados
					</h3>
				) : !buscado ? (
					<h3 translate='no' className={styles.H1NadaLetra}>
						Realiza una busqueda
					</h3>
				) : null}
			</section>
		</main>
	)
}

export default PlatoLetra
