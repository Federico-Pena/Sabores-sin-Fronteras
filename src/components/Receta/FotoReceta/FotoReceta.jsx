import styles from './FotoReceta.module.css'

function FotoReceta({ receta }) {
	return (
		<div className={styles.divFoto}>
			<div className={styles.divH2Foto}>
				{receta.idMeal && (
					<small
						className={styles.SmallFoto}>{`Receta N° ${receta.idMeal}`}</small>
				)}
			</div>
			<div className={styles.divImgReceta}>
				{receta.strMealThumb && (
					<img
						className={styles.imgReceta}
						src={receta.strMealThumb}
						alt={receta.strMeal}
					/>
				)}
				{receta.strMeal && <h2 className={styles.H2Foto}>{receta.strMeal}</h2>}
			</div>
		</div>
	)
}

export default FotoReceta
