import { useState, useEffect, useRef } from 'react'
import Receta from '../components/Receta/Receta'
import styles from './PlatoRandom.module.css'
import Modal from '../components/Modal/Modal'
import { fetchRecetas } from '../helpers/fetchRecetas'
import { textIngredientFormater } from '../helpers/textIngredientFormater'
import BuscadorDePalabras from '../components//BuscadorDeLetras/BuscadorDeLetras'
import RecetaAleatoria from '../components/RecetaAleatoria/RecetaAleatoria'
function PlatoRandom() {
	const [receta, setReceta] = useState('')
	const [ingredientes, setIngredientes] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()
	const [recetas, setRecetas] = useState()
	const divRandomRecetasRef = useRef()
	useEffect(() => {
		pintarRecetas()
	}, [])
	const pintarRecetas = async () => {
		setLoading(true)
		try {
			const data = await fetchRecetas()
			setReceta(...data.data[0].meals)
			setIngredientes(data.ingredientes)
			if (divRandomRecetasRef.current) {
				divRandomRecetasRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		} catch (error) {
			setError(error)
		}
		setLoading(false)
	}

	function cerrarModal() {
		setError()
	}

	function buscadorRecetas(e) {
		mostrarRecetas(e)
	}

	const mostrarRecetas = (e) => {
		setLoading(true)
		setReceta()
		setIngredientes()
		setRecetas(e)
		setLoading(false)
	}

	function mostrarReceta(e) {
		setLoading(true)
		setReceta(e)
		const ingredientList = textIngredientFormater(e)
		setLoading(false)
		setIngredientes(ingredientList)
	}

	function cerrarReceta() {
		setError()
		setReceta()
		setIngredientes()
	}
	function manejoError() {
		setError(true)
	}
	const moverseEnPagina = (ref) => {
		const releventDiv = ref.current
		releventDiv.scrollIntoView({ behavior: 'smooth' })
	}
	return (
		<main className={styles.divPlatoRandom}>
			{error ? (
				<Modal
					cerrarModal={cerrarModal}
					manejoError={error}
					error={error}
					titulo={'Ocurrió Un Error'}
				/>
			) : null}
			{loading ? <Modal loading={loading} /> : null}
			<section className={styles.sectionRandomRecetas}>
				{ingredientes && (
					<>
						<h1>No Sabes Que Cocinar?</h1>
						<p>
							Viaja Por El Mundo. En Sabores Sin Fronteras Encontrarás Una
							Amplia Variedad De Recetas Internacionales, Desde Clásicos
							Italianos Hasta Exóticas Especias Asiáticas. ¡Descubre Nuevos
							Horizontes Culinarios!
						</p>
					</>
				)}
				<div className={styles.divInputBuscar}>
					<RecetaAleatoria pintarRecetas={pintarRecetas} />
					<BuscadorDePalabras
						buscadorRecetas={buscadorRecetas}
						refParent={divRandomRecetasRef}
					/>
				</div>
			</section>
			{receta ? (
				<section className={styles.sectionRandomRecetas}>
					<div className={styles.divRandomRecetas} ref={divRandomRecetasRef}>
						<Receta
							manejoError={manejoError}
							ingredientes={ingredientes}
							receta={receta}
							cerrarReceta={recetas ? cerrarReceta : null}
						/>
					</div>
				</section>
			) : recetas ? (
				<section className={styles.sectionRandomRecetas}>
					<div className={styles.divRandomRecetas} ref={divRandomRecetasRef}>
						{recetas?.map((receta, i) => {
							return (
								<Receta
									manejoError={manejoError}
									mostrarReceta={mostrarReceta}
									key={i}
									receta={receta}
								/>
							)
						})}
					</div>
				</section>
			) : null}
		</main>
	)
}

export default PlatoRandom
