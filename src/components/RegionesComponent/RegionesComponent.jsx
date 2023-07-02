import styles from './RegionesComponent.module.css'
function RegionesComponent({ regiones, elegirFiltroPais }) {
	return (
		<ul className={styles.Ul}>
			{regiones?.map((region) => {
				return (
					<li
						className={styles.Li}
						onClick={() => {
							elegirFiltroPais(region.strArea)
						}}
						key={region.strArea}
						title={region.strArea}>
						<img
							src={region.foto}
							alt={region.strArea}
							className={styles.Img}
						/>
					</li>
				)
			})}
		</ul>
	)
}

export default RegionesComponent
