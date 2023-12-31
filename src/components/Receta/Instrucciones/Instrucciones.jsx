import { useEffect, useRef } from 'react'
import styles from './Instrucciones.module.css'
function Instrucciones({ receta, fliping }) {
	const divInstruccionesRef = useRef(null)
	useEffect(() => {
		divInstruccionesRef.current.scrollIntoView({
			smooth: 'behavior',
			block: 'start',
		})
	}, [])
	return (
		<div className={styles.divInstrucciones} ref={divInstruccionesRef}>
			<h2 className={styles.h2Instrucciones}>Instructiones</h2>
			<ul className={styles.ulIns} translate='yes'>
				{receta?.strInstructions.split('.').map((Instruccion, i) => {
					return Instruccion.trim() && Instruccion.trim().length >= 2 ? (
						<li className={styles.liintruccion} key={i}>
							<span className={styles.spanContenido}>{Instruccion}</span>
							<span translate='no' className={styles.spanNumero}>
								{'# ' + (i + 1)}
							</span>
						</li>
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
