import { Link } from 'react-router-dom'
import styles from './Index.module.css'
function Index() {
	return (
		<div className={styles.heroPlatoRandom}>
			<div className={styles.divHeroTitulo}>
				<h1>Explora la gastronomía desde tu hogar</h1>
				<p className={styles.subTitulo}>
					¡Descubre nuevos horizontes culinarios!
				</p>
			</div>
			<div className={styles.divHeroBtn}>
				<Link className={styles.heroPlatoRandomBtn} to='/PlatoRandom'>
					Empecemos
				</Link>
			</div>
		</div>
	)
}

export default Index
