import { useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'

import styles from './Receta.module.css'
import FotoReceta from './FotoReceta/FotoReceta'
import Instrucciones from './Instrucciones/Instrucciones'
import CategoriaPais from './EnlacesCategoriaPais/EnlacesCategoriaPais'
import Ingredientes from './Ingredientes/Ingredientes'
/**
 * @param {*} receta
 * Objeto - Receta a mostrar
 * @param {*} cerrarReceta
 * Funcion - Cerrar vista de recetas
 * @param {*} ingredientes
 * Objeto - Ingredientes a mostrar
 * @param {*} mostrarReceta
 * Funcion - Guarda la receta en el estado del padre
 */
function Receta({
	receta,
	cerrarReceta,
	ingredientes,
	mostrarReceta,
	manejoError,
}) {
	const divRecetRef = useRef(null)
	const [flip, setFlip] = useState(false)
	function fliping() {
		setFlip(!flip)
	}

	const obtenerReceta = async () => {
		try {
			const response = await fetch(
				`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${receta.idMeal}`
			)
			const data = await response.json()
			mostrarReceta(data.meals[0])
		} catch (error) {
			manejoError(error)
		}
	}

	return (
		<div
			ref={divRecetRef}
			className={styles.recetasContainer}
			onClick={() => {
				ingredientes ? null : obtenerReceta()
			}}>
			{cerrarReceta && (
				<button
					className={styles.btnCerrar}
					onClick={cerrarReceta}
					title='Cerrar Receta'>
					<MdClose className={styles.btnCerrarIco} />
				</button>
			)}
			<div className={styles.sliderDiv}>
				<FotoReceta receta={receta} />
			</div>

			{flip ? (
				<div className={styles.sliderDiv}>
					<Instrucciones fliping={fliping} receta={receta} />
				</div>
			) : ingredientes ? (
				<>
					<div className={styles.sliderDiv}>
						<CategoriaPais receta={receta} />
					</div>
					<div className={styles.sliderDiv}>
						<Ingredientes ingredientes={ingredientes} fliping={fliping} />
					</div>
				</>
			) : null}
		</div>
	)
}

export default Receta
