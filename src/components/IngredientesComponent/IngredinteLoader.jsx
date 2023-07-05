import styles from './IngredienteLoader.module.css'
import { useEffect, useRef } from 'react'

const IngredinteLoader = ({ ingrediente, buscarRecetaPorIngrediente }) => {
	const liRef = useRef(null)
	const { current } = liRef

	useEffect(() => {
		const opciones = {
			rootMargin: '0px 0px 0px 0px',
			threshold: 0,
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					liRef.current.children[0].src = ingrediente.foto
					observer.unobserve(entry.target)
				}
			})
		}, opciones)

		observer.observe(liRef.current)
		return () => {
			current && observer.unobserve(current)
		}
	}, [ingrediente, current])

	return (
		<li
			ref={liRef}
			className={styles.Li}
			onClick={() => buscarRecetaPorIngrediente(ingrediente.strIngredient)}>
			<img
				className={styles.Imagen}
				src={ingrediente.foto}
				alt={ingrediente.strIngredient}
			/>
			<span className={styles.nombreIngles}>{ingrediente.strIngredient}</span>
			<span lang='es' className={styles.nombreEspañol}>
				{ingrediente.nombreEspañol}
			</span>
		</li>
	)
}

export default IngredinteLoader
