import styles from './FotoReceta.module.css'

function FotoReceta({ receta }) {
	return (
		<div className={styles.divFoto}>
			<div>
				{receta.idMeal && (
					<small className={styles.SmallFoto}>Receta N° {receta.idMeal}</small>
				)}
				{receta.strMeal && <h2 className={styles.H2Foto}>{receta.strMeal}</h2>}
			</div>

			{receta.strMealThumb && (
				<img
					className={styles.imgReceta}
					src={receta.strMealThumb}
					alt={receta.strMeal}
				/>
			)}
		</div>
	)
}

export default FotoReceta
