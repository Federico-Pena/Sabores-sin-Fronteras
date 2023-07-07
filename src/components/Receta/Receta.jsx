import { useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { FiChevronsDown } from 'react-icons/fi'
import { AiFillSave } from 'react-icons/Ai'
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
			setTimeout(() => {
				if (divRecetRef.current) {
					divRecetRef.current.scrollIntoView({ behavior: 'smooth' })
				}
			}, 500)
		} catch (error) {
			manejoError(error)
		}
	}
	const guardarReceta = () => {
		let arrayDB = []
		const DBLocal = JSON.parse(localStorage.getItem('recetas'))
		if (DBLocal?.length > 0) {
			let coincidencias = DBLocal.filter((rec) => rec.idMeal === receta.idMeal)
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
	}

	const cerrarModal = () => {
		setError(false)
		setExito(false)
	}
	return (
		<div
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
					titulo={'Error Al Guardar La Receta'}
					descripcion={'La Receta Ya Esta Guardada'}
					error={error}
					cerrarModal={cerrarModal}
				/>
			) : null}
			<div className={styles.sliderDiv}>
				{cerrarReceta && ingredientes && (
					<>
						<button
							className={styles.btnGuardar}
							onClick={guardarReceta}
							title='Cerrar Receta'>
							<AiFillSave className={styles.btnGuardarIco} />
						</button>
						<button
							className={styles.btnCerrar}
							onClick={cerrarReceta}
							title='Cerrar Receta'>
							<MdClose className={styles.btnCerrarIco} />
						</button>
					</>
				)}
				<FotoReceta receta={receta} />
				{ingredientes ? <FiChevronsDown className={styles.abajoIco} /> : null}
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
