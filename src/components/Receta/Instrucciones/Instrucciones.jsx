import styles from './Instrucciones.module.css'
import { MdOutlineArrowBack } from 'react-icons/md'
function Instrucciones({ receta, fliping }) {
	return (
		<div className={styles.divInstrucciones}>
			<h3>Instructiones</h3>
			<ul className={styles.ulIns}>
				{receta?.strInstructions.split('.').map((e, i) => {
					return e.trim() && e.trim().length >= 2 ? (
						<>
							<li className={styles.liNumero}>
								<span className={styles.spanNumero}>{'# ' + (i + 1)}</span>
							</li>
							<li className={styles.liIns} key={e}>
								<span className={styles.spanContenido}>{e}</span>
							</li>
						</>
					) : null
				})}
			</ul>
			<button
				className={styles.btnVerIngredientes}
				title='Ver Ingredientes'
				onClick={fliping}>
				<MdOutlineArrowBack className={styles.volverBtn} />
			</button>
		</div>
	)
}

export default Instrucciones
