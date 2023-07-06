import styles from './RegionesComponent.module.css'
function RegionesComponent({ regiones, elegirFiltroPais }) {
	return (
		<ul className={styles.UlRegion}>
			{regiones?.map((region) => {
				return (
					<li
						className={styles.LiRegion}
						onClick={() => {
							elegirFiltroPais(region.strArea)
						}}
						key={region.strArea}
						title={region.strArea}>
						<img
							src={region.foto}
							alt={region.strArea}
							className={styles.ImgRegion}
						/>
						<small>{region.strArea}</small>
					</li>
				)
			})}
		</ul>
	)
}

export default RegionesComponent
