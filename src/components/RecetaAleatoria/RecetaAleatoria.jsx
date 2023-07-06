import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import styles from './RecetaAleatoria.module.css'
function RecetaAleatoria({ pintarRecetas }) {
	return (
		<div className={styles.formAleatoria}>
			<label htmlFor='selectBuscar'>Random</label>
			<button
				title='receta aleatoria'
				className={styles.btnAleatoria}
				onClick={pintarRecetas}>
				<GiPerspectiveDiceSixFacesRandom className={styles.btnAleatoriaSvg} />
			</button>
		</div>
	)
}

export default RecetaAleatoria
