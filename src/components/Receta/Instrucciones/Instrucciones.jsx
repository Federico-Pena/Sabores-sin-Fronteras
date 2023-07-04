import styles from './Instrucciones.module.css'
import { MdOutlineArrowBack } from 'react-icons/md'
function Instrucciones({ receta, fliping }) {
	return (
		<div className={styles.divInstrucciones}>
			<h2 className={styles.h2Instrucciones}>Instructiones</h2>
			<ul className={styles.ulIns}>
				{receta?.strInstructions.split('.').map((e, i) => {
					return e.trim() && e.trim().length >= 2 ? (
						<li className={styles.liintruccion} key={e}>
							<span className={styles.spanContenido}>{e}</span>
							<span className={styles.spanNumero}>{'# ' + (i + 1)}</span>
						</li>
					) : null
				})}
			</ul>
			<button
				className={styles.btnVolver}
				title='Ver Ingredientes'
				onClick={fliping}>
				<MdOutlineArrowBack className={styles.btnVolverico} />
			</button>
		</div>
	)
}

export default Instrucciones
