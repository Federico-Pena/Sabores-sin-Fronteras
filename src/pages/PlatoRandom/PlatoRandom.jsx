import styles from './PlatoRandom.module.css'
import stylesDefault from '../../App.module.css'
import { useState, useEffect, useRef } from 'react'
import Receta from '../../components/Receta/Receta'
import Modal from '../../components/Modal/Modal'
import { fetchRecetas } from '../../helpers/fetchRecetas'
import { textIngredientFormater } from '../../helpers/textIngredientFormater'
import BuscadorDePalabras from '../../components/BuscadorDeLetras/BuscadorDeLetras'
import RecetaAleatoria from '../../components/RecetaAleatoria/RecetaAleatoria'
import ContenedorRecetas from '../../components/ContenedorRecetas/ContenedorRecetas'
function PlatoRandom() {
	const [receta, setReceta] = useState('')
	const [ingredientes, setIngredientes] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()
	const [recetas, setRecetas] = useState()
	const sectionRandomRef = useRef()
	useEffect(() => {
		pintarRecetas()
	}, [])
	const pintarRecetas = async () => {
		setLoading(true)
		try {
			const data = await fetchRecetas()
			setReceta(...data.data[0].meals)
			setIngredientes(data.ingredientes)
		} catch (error) {
			setError(error)
		}
		setLoading(false)
		if (sectionRandomRef.current) {
			sectionRandomRef.current.scrollIntoView({ behavior: 'smooth' })
		}
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
		if (sectionRandomRef.current) {
			sectionRandomRef.current.scrollIntoView({ behavior: 'smooth' })
		}
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
		<main
			className={`${stylesDefault.DflexContainer} ${styles.divPlatoRandom}`}>
			{error ? (
				<Modal
					cerrarModal={cerrarModal}
					manejoError={error}
					error={error}
					titulo={'Error De Red'}
				/>
			) : null}
			{loading ? <Modal loading={loading} /> : null}
			<section className={stylesDefault.DsectionRandomRecetas}>
				<div className={styles.sectionH1}>
					<h1>
						En Sabores Sin Fronteras Encontrarás Una Amplia Variedad De Recetas
						Internacionales, Desde Clásicos Italianos Hasta Exóticas Especias
						Asiáticas. ¡Descubre Nuevos Horizontes Culinarios!
					</h1>
				</div>
				<div className={styles.divInputBuscar}>
					<div>
						<RecetaAleatoria pintarRecetas={pintarRecetas} />
					</div>
					<BuscadorDePalabras
						buscadorRecetas={buscadorRecetas}
						refParent={sectionRandomRef}
					/>
				</div>
			</section>
			<section
				className={stylesDefault.DsectionRandomRecetas}
				ref={sectionRandomRef}>
				{receta ? (
					<Receta
						manejoError={manejoError}
						ingredientes={ingredientes}
						receta={receta}
						cerrarReceta={recetas ? cerrarReceta : null}
					/>
				) : recetas ? (
					<ContenedorRecetas>
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
					</ContenedorRecetas>
				) : null}
			</section>
		</main>
	)
}

export default PlatoRandom
