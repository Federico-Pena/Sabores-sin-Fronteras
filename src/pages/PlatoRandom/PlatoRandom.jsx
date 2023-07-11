import styles from './PlatoRandom.module.css'
import stylesReceta from '../../components/Receta/Receta.module.css'

import stylesDefault from '../../App.module.css'
import { useState, useRef } from 'react'
import Receta from '../../components/Receta/Receta'
import Modal from '../../components/Modal/Modal'
import { recetaRandom } from '../../helpers/recetaRandom'

import RecetaAleatoria from '../../components/RecetaAleatoria/RecetaAleatoria'
function PlatoRandom() {
	const [receta, setReceta] = useState('')
	const [ingredientes, setIngredientes] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const sectionRandomRef = useRef(null)

	const pintarReceta = async () => {
		setLoading(true)
		try {
			const data = await recetaRandom()
			setReceta(data.receta)
			setIngredientes(data.ingredientes)
		} catch (error) {
			setError(error)
		}
		setTimeout(() => {
			sectionRandomRef.current.scrollIntoView({ behavior: 'smooth' })
		}, 200)

		setLoading(false)
	}

	function cerrarModal() {
		setError()
	}

	function manejoError() {
		setError(true)
	}
	function cerrarReceta(e) {
		e.current.classList.add(stylesReceta.recetasCerrar)
		setTimeout(() => {
			setReceta('')
			setIngredientes('')
		}, 500)
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
					<h1 translate='no'>Receta Aleatoria</h1>
				</div>
				<div className={styles.divInputBuscar}>
					<RecetaAleatoria pintarRecetas={pintarReceta} />
				</div>
			</section>
			{receta && (
				<section
					className={stylesDefault.DsectionRandomRecetas}
					ref={sectionRandomRef}>
					<Receta
						manejoError={manejoError}
						ingredientes={ingredientes}
						receta={receta}
						cerrarReceta={cerrarReceta}
					/>
				</section>
			)}
		</main>
	)
}

export default PlatoRandom
