import styles from './Ingredientes.module.css'

function Ingredientes({ ingredientes, fliping }) {
	return (
		<div className={styles.Ingredientes}>
			<h2 className={styles.titulo}>Ingredientes</h2>
			<ul className={styles.Ul}>
				{ingredientes?.map((entry, i) => {
					return (
						<li className={styles.Li} key={entry + i}>
							<span className={styles.LiSpan}>{entry.medidas}</span>
							<span>{entry.ingredientes}</span>
						</li>
					)
				})}
			</ul>
			<button
				className={styles.btnVerIngredientes}
				title='Ver Ingredientes'
				onClick={fliping}>
				<strong>Ver Instrucciones</strong>
			</button>
		</div>
	)
}

export default Ingredientes
