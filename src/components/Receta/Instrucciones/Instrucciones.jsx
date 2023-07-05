import { useRef } from 'react'
import styles from './Instrucciones.module.css'
import InstruccionIntersection from './InstruccionIntersection'
function Instrucciones({ receta, fliping }) {
	const ulInstRef = useRef(null)

	return (
		<div className={styles.divInstrucciones}>
			<h2 className={styles.h2Instrucciones}>Instructiones</h2>
			<ul className={styles.ulIns} ref={ulInstRef}>
				{receta?.strInstructions.split('.').map((e, i) => {
					return e.trim() && e.trim().length >= 2 ? (
						<InstruccionIntersection
							key={e + i}
							Instruccion={e}
							index={i}
							root={ulInstRef.current}
						/>
					) : null
				})}
			</ul>
			<button
				className={styles.btnVolver}
				title='Ver Ingredientes'
				onClick={fliping}>
				Volver
			</button>
		</div>
	)
}

export default Instrucciones
