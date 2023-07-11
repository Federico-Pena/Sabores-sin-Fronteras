import { useRef, useState } from 'react'
import { IoChevronBackOutline } from 'react-icons/io5'
import { MdFavorite } from 'react-icons/md'
import styles from './Receta.module.css'
import FotoReceta from './FotoReceta/FotoReceta'
import Instrucciones from './Instrucciones/Instrucciones'
import CategoriaPais from './EnlacesCategoriaPais/EnlacesCategoriaPais'
import Ingredientes from './Ingredientes/Ingredientes'
import Modal from '../Modal/Modal'

/**
 * @param {*} receta
 * Objeto - Receta a mostrar
 * @param {*} cerrarReceta
 * Funcion - Cerrar vista de recetas
 * @param {*} ingredientes
 * Array Strings - Ingredientes a mostrar
 * @param {*} mostrarReceta
 * Funcion - Se Obtiene la receta Completa y se la pasa al padre con esta funcion
 */
function Receta({ receta, cerrarReceta, ingredientes, mostrarReceta }) {
	const divRecetRef = useRef(null)
	const [flip, setFlip] = useState(false)
	const [error, setError] = useState(false)
	const [exito, setExito] = useState(false)

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
			setError('Error Al Obtener La Receta')
		}
	}
	const guardarReceta = () => {
		let arrayDB = []
		try {
			const DBLocal = JSON.parse(localStorage.getItem('recetas'))
			if (DBLocal?.length > 0) {
				let coincidencias = DBLocal.filter(
					(rec) => rec.idMeal === receta.idMeal
				)
				if (coincidencias?.length === 0) {
					arrayDB.push(...DBLocal)
					arrayDB.push(receta)
					localStorage.setItem('recetas', JSON.stringify(arrayDB))
					setExito(true)
				} else {
					setError('La Receta Ya Esta Guardada')
				}
			} else {
				arrayDB.push(receta)
				localStorage.setItem('recetas', JSON.stringify(arrayDB))
				setExito(true)
			}
		} catch (error) {
			setError('La Receta Ya Esta Guardada')
		}
	}

	const cerrarModal = () => {
		setError(false)
		setExito(false)
	}
	return (
		<>
			{ingredientes && (
				<div
					translate='yes'
					ref={divRecetRef}
					className={styles.recetasContainer}
					onClick={() => {
						ingredientes ? null : obtenerReceta()
					}}>
					{exito ? (
						<Modal
							titulo={'Receta Guardada'}
							exito={exito}
							cerrarModal={cerrarModal}
						/>
					) : null}
					{error ? (
						<Modal
							titulo={'Ocurrió Un Error'}
							descripcion={error}
							error={error}
							cerrarModal={cerrarModal}
						/>
					) : null}
					{cerrarReceta && ingredientes && (
						<>
							<button
								className={styles.btnGuardar}
								onClick={guardarReceta}
								title='Cerrar Receta'>
								<MdFavorite className={styles.btnGuardarIco} />
							</button>
							<button
								className={styles.btnCerrar}
								onClick={() => cerrarReceta(divRecetRef)}
								title='Cerrar Receta'>
								<IoChevronBackOutline className={styles.btnCerrarIco} />
							</button>
						</>
					)}
					<FotoReceta receta={receta} />
					{flip ? (
						<Instrucciones fliping={fliping} receta={receta} />
					) : ingredientes ? (
						<>
							<CategoriaPais receta={receta} />
							<Ingredientes ingredientes={ingredientes} fliping={fliping} />
						</>
					) : null}
				</div>
			)}
		</>
	)
}

export default Receta
