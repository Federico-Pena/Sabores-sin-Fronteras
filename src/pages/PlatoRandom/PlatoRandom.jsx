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
	const [error, setError] = useState(null)
	const [recetas, setRecetas] = useState([])
	const sectionRandomRef = useRef(null)
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
		setTimeout(() => {
			if (sectionRandomRef.current) {
				sectionRandomRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		}, 500)
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
		setTimeout(() => {
			if (sectionRandomRef.current) {
				sectionRandomRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		}, 500)
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

	return (
		<main
			className={`${stylesDefault.DflexContainer} ${styles.divPlatoRandom}`}>
			{error ? (
				<Modal
					cerrarModal={cerrarModal}
					manejoError={error}
					error={error}
					titulo={'Ocurrió un Error'}
				/>
			) : null}
			{loading ? <Modal loading={loading} /> : null}
			<section className={stylesDefault.DsectionRandomRecetas}>
				<div className={styles.sectionH1}>
					<h1 lang='es'>
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
