import { Link } from 'react-router-dom'
import './Index.css'
function Index() {
	return (
		<div className='heroPlatoRandom'>
			<h1>Explora la gastronomía desde tu hogar</h1>
			<p>
				Viaja por el mundo. En Sabores sin Fronteras encontrarás una amplia
				variedad de recetas internacionales, desde clásicos italianos hasta
				exóticas especias asiáticas. ¡Descubre nuevos horizontes culinarios!
			</p>
			<button className='heroPlatoRandomBtn'>
				<Link to='/PlatoRandom'>Empecemos</Link>
			</button>
		</div>
	)
}

export default Index
