import stylesDefault from '../../App.module.css'
import styles from './PlatoLetra.module.css'
import { useEffect, useRef, useState } from 'react'
import BuscadorDePalabras from '../../components/BuscadorDeLetras/BuscadorDeLetras'
import ContenedorRecetas from '../../components/ContenedorRecetas/ContenedorRecetas'
import Receta from '../../components/Receta/Receta'
import { textIngredientFormater } from '../../helpers/textIngredientFormater'
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
			}, 500)
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
	function cerrarReceta() {
		setReceta()
		setIngredientes()
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
				className={stylesDefault.DsectionRandomRecetas}
				ref={sectionLetraRef}>
				{receta ? (
					<Receta
						ingredientes={ingredientes}
						receta={receta}
						cerrarReceta={cerrarReceta}
					/>
				) : recetas?.length > 0 ? (
					<ContenedorRecetas>
						{recetas.map((receta, i) => {
							return (
								<Receta key={i} mostrarReceta={mostrarReceta} receta={receta} />
							)
						})}
					</ContenedorRecetas>
				) : null}
				{buscado && !receta && recetas ? (
					<h3 translate='no' className={styles.buscadoH1Letra}>
						{recetas.length} Resultados
					</h3>
				) : buscado && !recetas ? (
					<h3 translate='no' className={styles.H1NadaLetra}>
						No Hay Resultados
					</h3>
				) : !buscado && !receta && !recetas.length ? (
					<h1 translate='no' className={styles.H1NadaLetra}>
						Realiza Una Busqueda
					</h1>
				) : null}
			</section>
		</main>
	)
}

export default PlatoLetra
