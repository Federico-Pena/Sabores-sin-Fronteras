import { TfiReload } from 'react-icons/tfi'
import styles from './RecetaAleatoria.module.css'
function RecetaAleatoria({ pintarRecetas }) {
	return (
		<div className={styles.formAleatoria}>
			<label htmlFor='selectBuscar'>Aleatoria</label>
			<button
				title='receta aleatoria'
				className={styles.btnAleatoria}
				onClick={pintarRecetas}>
				<TfiReload className={styles.btnAleatoriaSvg} />
			</button>
		</div>
	)
}

export default RecetaAleatoria
