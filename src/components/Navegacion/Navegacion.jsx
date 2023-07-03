import { Link } from 'react-router-dom'
import {
	IoFastFoodOutline,
	IoFastFoodSharp,
	IoHomeOutline,
	IoHomeSharp,
} from 'react-icons/io5'
import { MdRestaurantMenu } from 'react-icons/md'
import styles from './Navegacion.module.css'
import { useLocation } from 'react-router-dom'

function Navegacion() {
	let location = useLocation()

	return (
		<header>
			{location.pathname === '/' ? null : (
				<nav className={styles.Nav}>
					<ul className={styles.UlNav}>
						<li className={styles.liNav}>
							<img
								className={styles.logoNav}
								src='/assets/food.png'
								alt='Logo'
							/>
						</li>
						<li className={styles.liNav}>
							<Link className={styles.linkPlatoRandom} to={'/PlatoRandom'}>
								{location.pathname === '/PlatoRandom' ? (
									<IoHomeSharp className={styles.iconNav} />
								) : (
									<IoHomeOutline className={styles.iconNav} />
								)}
							</Link>
						</li>
						<li className={styles.liNav}>
							<Link className={styles.linkPlatoPais} to={'/PlatoPais'}>
								{location.pathname === '/PlatoRandom' ? (
									<IoFastFoodOutline className={styles.iconNav} />
								) : (
									<IoFastFoodSharp className={styles.iconNav} />
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
