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
				src='../assets/indexVideo.mp4'></video>
			<div
				translate='no'
				className={`${styles.divHeroTitulo} ${stylesDefault.fadeInAnimation}`}>
				<h1 translate='no'>Explora la gastronomía desde tu hogar</h1>
				<p translate='no' className={styles.subTitulo}>
					¡Descubre nuevos horizontes culinarios!
				</p>
			</div>
			<div className={styles.divHeroBtn}>
				<Link
					translate='no'
					className={styles.heroPlatoRandomBtn}
					to='/PlatoPais'>
					Empieza
				</Link>
			</div>
		</div>
	)
}

export default Index
