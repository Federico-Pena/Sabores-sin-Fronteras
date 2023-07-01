import { Link } from 'react-router-dom'
import './Index.css'
function Index() {
	return (
		<div className='heroPlatoRandom'>
			<div className='divHeroTitulo'>
				<h1>Explora la gastronomía desde tu hogar</h1>
				<p>¡Descubre nuevos horizontes culinarios!</p>
			</div>
			<div className='divHeroBtn'>
				<button className='heroPlatoRandomBtn' title='Boton Empezar'>
					<Link to='/PlatoRandom'>Empecemos</Link>
				</button>
			</div>
		</div>
	)
}

export default Index
