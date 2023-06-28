import { Link } from 'react-router-dom'
import {
	IoFastFoodOutline,
	IoFastFoodSharp,
	IoHomeOutline,
	IoHomeSharp,
} from 'react-icons/io5'
import './Navegacion.css'
import { useLocation } from 'react-router-dom'

function Navegacion() {
	let location = useLocation()
	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link className='linkNav' to={'/'}>
							{location.pathname === '/' ? <IoHomeSharp /> : <IoHomeOutline />}
						</Link>
					</li>
					<li>
						<Link className='linkNav' to={'/PlatoPais'}>
							{location.pathname === '/' ? (
								<IoFastFoodOutline />
							) : (
								<IoFastFoodSharp />
							)}
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Navegacion
