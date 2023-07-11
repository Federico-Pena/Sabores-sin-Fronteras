import styles from './Receta.module.css'

function RecetaCerrada({ receta, mostrarReceta, setError }) {
	const obtenerReceta = async (e) => {
		try {
			const response = await fetch(
				`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`
			)
			const data = await response.json()
			mostrarReceta(data.meals[0])
		} catch (error) {
			setError('Error Al Obtener La Receta')
		}
	}

	return (
		<div className={styles.divCerradas}>
			<div className={styles.cerradas}>
				<div className={styles.cerradasFotoNombre}>
					<img src={receta.strMealThumb} alt={receta.strMeal} />
					<p>
						{receta.strMeal} <samp>N° {receta.idMeal}</samp>
					</p>
				</div>
				<div className={styles.cerradasBtns}>
					<button
						className={styles.BtnVer}
						onClick={() => obtenerReceta(receta.idMeal)}>
						Ver
					</button>
				</div>
			</div>
		</div>
	)
}

export default RecetaCerrada
