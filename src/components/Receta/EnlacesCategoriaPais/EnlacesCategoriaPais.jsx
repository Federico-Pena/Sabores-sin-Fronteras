import styles from './EnlacesCategoriaPais.module.css'
import {
	MdOutlinePublic,
	MdOutlineCategory,
	MdOutlineSell,
	MdVideocam,
	MdOutlineSource,
} from 'react-icons/md'
function CategoriaPais({ receta }) {
	return (
		<div className={styles.divUl}>
			<h2>
				Categorías {receta.strYoutube || receta.strSource ? 'Y Enlaces' : null}
			</h2>
			<ul className={styles.ulInfo}>
				{receta.strTags &&
					receta.strTags.split(',').map((tag) => (
						<li className={styles.liInfo} key={tag}>
							<small className={styles.liSmall}>
								<MdOutlineSell className={styles.liIcono} />
							</small>
							<small className={styles.liSmall}>{tag}</small>
						</li>
					))}

				{receta.strCategory && (
					<li className={styles.liInfo}>
						<small className={styles.liSmall}>
							<MdOutlineCategory className={styles.liIcono} />
						</small>

						<small className={styles.liSmall}>{receta.strCategory}</small>
					</li>
				)}
				{receta.strArea && (
					<li className={styles.liInfo}>
						<small className={styles.liSmall}>
							<MdOutlinePublic className={styles.liIcono} />
						</small>

						<small className={styles.liSmall}>{receta.strArea}</small>
					</li>
				)}
			</ul>
			<li className={styles.divEnlaces}>
				{receta.strYoutube && (
					<a
						className={styles.enlaces}
						href={receta.strYoutube}
						target='_blanck'>
						<MdVideocam className={styles.enlaceIcono} />
						Video
					</a>
				)}

				{receta.strSource && (
					<a
						className={styles.enlaces}
						href={receta.strSource}
						target='_blanck'>
						<MdOutlineSource className={styles.enlaceIcono} />
						Source
					</a>
				)}
			</li>
		</div>
	)
}

export default CategoriaPais
