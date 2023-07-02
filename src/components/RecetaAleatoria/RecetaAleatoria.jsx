import { TfiReload } from 'react-icons/tfi'
import styles from './RecetaAleatoria.module.css'
function RecetaAleatoria({ pintarRecetas }) {
	return (
		<button
			title='receta aleatoria'
			className={styles.btnAleatoria}
			onClick={pintarRecetas}>
			<TfiReload className={styles.btnAleatoriaSvg} />
		</button>
	)
}

export default RecetaAleatoria
