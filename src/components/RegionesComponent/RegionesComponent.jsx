import { useEffect, useState } from 'react'
import { obtenerRegiones } from '../../helpers/obtenerRegiones'

import styles from './RegionesComponent.module.css'
function RegionesComponent({ elegirFiltroPais }) {
	const [regiones, setRegiones] = useState()

	useEffect(() => {
		//todas las regiones
		const fetchRegions = () => {
			const data = obtenerRegiones()
			setRegiones(data.sort((a, b) => (a.strArea < b.strArea ? -1 : 1)))
		}
		fetchRegions()
	}, [])

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
						<span>{region.strArea}</span>
						<img
							src={region.foto}
							alt={`Region ${region.strArea}`}
							className={styles.ImgRegion}
						/>
					</li>
				)
			})}
		</ul>
	)
}

export default RegionesComponent
