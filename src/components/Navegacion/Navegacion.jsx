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
						<li className={styles.liNavlogo}>
							<img className={styles.logoNav} src='/food.png' alt='Logo' />
						</li>
						<li className={styles.liNavPag}>
							<Link className={styles.linkPlatoRandom} to={'/PlatoRandom'}>
								{location.pathname === '/PlatoRandom' ? (
									<GiPerspectiveDiceSixFacesRandom
										className={styles.iconNavActive}
									/>
								) : (
									<GiPerspectiveDiceSixFacesRandom className={styles.iconNav} />
								)}
							</Link>
						</li>
						<li className={styles.liNavPag}>
							<Link className={styles.linkPlatoRandom} to={'/PlatoLetra'}>
								{location.pathname === '/PlatoLetra' ? (
									<TiSortAlphabeticallyOutline
										className={styles.iconNavActive}
									/>
								) : (
									<TiSortAlphabeticallyOutline className={styles.iconNav} />
								)}
							</Link>
						</li>
						<li className={styles.liNavPag}>
							<Link className={styles.linkPlatoPais} to={'/PlatoPais'}>
								{location.pathname === '/PlatoPais' ? (
									<IoFastFoodOutline className={styles.iconNavActive} />
								) : (
									<IoFastFoodOutline className={styles.iconNav} />
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
