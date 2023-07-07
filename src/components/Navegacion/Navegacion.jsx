import { Link } from 'react-router-dom'
import { IoFastFoodOutline } from 'react-icons/io5'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { TiSortAlphabeticallyOutline } from 'react-icons/ti'
import styles from './Navegacion.module.css'
import { useLocation } from 'react-router-dom'

function Navegacion() {
	let location = useLocation()

	return (
		<header>
			{location.pathname === '/' ? null : (
				<nav className={styles.Nav}>
					<ul className={styles.UlNav}>
						<li className={styles.liNavLogo}>
							<img className={styles.logoNav} src='/food.png' alt='Logo' />
							SSF
						</li>
						<li className={styles.liNavPag}>
							<Link to={'/PlatoRandom'}>
								{location.pathname === '/PlatoRandom' ? (
									<GiPerspectiveDiceSixFacesRandom
										className={styles.iconNavActive}
									/>
								) : (
									<GiPerspectiveDiceSixFacesRandom className={styles.iconNav} />
								)}
							</Link>
							Random
						</li>
						<li className={styles.liNavPag}>
							<Link to={'/PlatoLetra'}>
								{location.pathname === '/PlatoLetra' ? (
									<TiSortAlphabeticallyOutline
										className={styles.iconNavActive}
									/>
								) : (
									<TiSortAlphabeticallyOutline className={styles.iconNav} />
								)}
							</Link>
							Letters
						</li>
						<li className={styles.liNavPag}>
							<Link to={'/PlatoPais'}>
								{location.pathname === '/PlatoPais' ? (
									<IoFastFoodOutline className={styles.iconNavActive} />
								) : (
									<IoFastFoodOutline className={styles.iconNav} />
								)}
							</Link>
							Region / Ing
						</li>
					</ul>
				</nav>
			)}
		</header>
	)
}

export default Navegacion
