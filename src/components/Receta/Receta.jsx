import { useEffect, useRef, useState } from 'react'
import { IoChevronBackOutline } from 'react-icons/io5'
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
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
function Receta({ receta, cerrarReceta, ingredientes }) {
	const divRecetRef = useRef(null)
	const [flip, setFlip] = useState(false)
	const [error, setError] = useState(false)
	const [exito, setExito] = useState(false)
	const [guardada, setGuardada] = useState(false)

	useEffect(() => {
		const DB = JSON.parse(localStorage.getItem('recetas'))
		const coincidencias = DB.filter((rec) => rec.idMeal === receta.idMeal)
		if (coincidencias.length) {
			setGuardada(true)
		} else {
			setGuardada(false)
		}
	}, [receta])

	function fliping() {
		setFlip(!flip)
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
					setGuardada(true)
				} else {
					setError('La Receta Ya Esta Guardada')
				}
			} else {
				arrayDB.push(receta)
				localStorage.setItem('recetas', JSON.stringify(arrayDB))
				setExito(true)
				setGuardada(true)
			}
		} catch (error) {
			setError('Ocurrió Un Error')
		}
	}

	const cerrarModal = () => {
		setError(false)
		setExito(false)
	}
	return (
		<>
			{ingredientes && (
				<div ref={divRecetRef} className={styles.recetasContainer}>
					{exito ? (
						<Modal
							titulo={'Receta Guardada'}
							exito={exito}
							cerrarModal={cerrarModal}
						/>
					) : null}
					{error ? (
						<Modal
							titulo={'Aviso'}
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
								{guardada ? (
									<MdFavorite className={styles.btnGuardarIcoLleno} />
								) : (
									<MdOutlineFavoriteBorder className={styles.btnGuardarIco} />
								)}
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
