import { useEffect, useRef } from 'react'
import styles from './Instrucciones.module.css'

function InstruccionIntersection({ root, Instruccion, index }) {
	const liRef = useRef(null)
	const { current } = liRef

	useEffect(() => {
		const opciones = {
			root: root ? root : null,
			rootMargin: '0px 0px 0px 0px',
			threshold: 0,
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add(styles.liintruccionAnimado)
				}
			})
		}, opciones)

		observer.observe(liRef.current)
		return () => {
			current && observer.unobserve(current)
		}
	}, [Instruccion, current, root])

	return (
		<li className={styles.liintruccion} ref={liRef}>
			<span className={styles.spanContenido}>{Instruccion}</span>
			<span translate='no' className={styles.spanNumero}>
				{'# ' + (index + 1)}
			</span>
		</li>
	)
}

export default InstruccionIntersection
