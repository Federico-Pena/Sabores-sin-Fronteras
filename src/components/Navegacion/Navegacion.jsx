import { Link } from 'react-router-dom'
import {
	IoFastFoodOutline,
	IoFastFoodSharp,
	IoHomeOutline,
	IoHomeSharp,
} from 'react-icons/io5'
import { MdRestaurantMenu } from 'react-icons/md'
import './Navegacion.css'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navegacion() {
	let location = useLocation()
	const [open, setOpen] = useState(false)

	const abrirMenu = () => {
		setOpen(!open)
	}
	return (
		<header>
			{location.pathname === '/' ? null : (
				<nav className='headerNav'>
					<button
						className={open ? 'NavButtonMenuOpen' : 'NavButtonMenuClose'}
						onClick={abrirMenu}>
						<MdRestaurantMenu className={'ButtonMenuSvg'} />
					</button>
					<ul className={open ? 'NavUlOpen' : 'NavUlClose'}>
						<li className='linkNav'>
							<Link className='linkNav' to={'/PlatoRandom'}>
								{location.pathname === '/PlatoRandom' ? (
									<IoHomeSharp />
								) : (
									<IoHomeOutline />
								)}
							</Link>
						</li>
						<li className='linkNav'>
							<Link className='linkNav' to={'/PlatoPais'}>
								{location.pathname === '/PlatoRandom' ? (
									<IoFastFoodOutline />
								) : (
									<IoFastFoodSharp />
								)}
							</Link>
						</li>
					</ul>
				</nav>
			)}
		</header>
	)
}

export default Navegacion
