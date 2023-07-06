import { Link } from 'react-router-dom'
import styles from './Index.module.css'
import stylesDefault from '../../App.module.css'
function Index() {
	return (
		<div className={styles.heroPlatoRandom}>
			<video
				autoPlay
				muted
				loop
				className={styles.HeroVideo}
				src='/assets/indexVideo.mp4'></video>
			<div
				className={`${styles.divHeroTitulo} ${stylesDefault.fadeInAnimation}`}>
				<h1>Explora la gastronomía desde tu hogar</h1>
				<p className={styles.subTitulo}>
					¡Descubre nuevos horizontes culinarios!
				</p>
			</div>
			<div className={styles.divHeroBtn}>
				<Link className={styles.heroPlatoRandomBtn} to='/PlatoRandom'>
					Empieza
				</Link>
			</div>
		</div>
	)
}

export default Index
