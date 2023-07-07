import { Link } from 'react-router-dom'
import { BiWorld } from 'react-icons/bi'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { TiSortAlphabeticallyOutline } from 'react-icons/ti'
import { TfiAgenda } from 'react-icons/tfi'
import styles from './Navegacion.module.css'
import { useLocation } from 'react-router-dom'

function Navegacion() {
	let location = useLocation()

	return (
		<header>
			{location.pathname === '/' ? null : (
				<nav className={styles.Nav} translate='no'>
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
							Letra
						</li>
						<li className={styles.liNavPag}>
							<Link to={'/PlatoPais'}>
								{location.pathname === '/PlatoPais' ? (
									<BiWorld className={styles.iconNavActive} />
								) : (
									<BiWorld className={styles.iconNav} />
								)}
							</Link>
							Región
						</li>
						<li className={styles.liNavPag}>
							<Link to={'/RecetasGuardadas'}>
								{location.pathname === '/RecetasGuardadas' ? (
									<TfiAgenda className={styles.iconNavActive} />
								) : (
									<TfiAgenda className={styles.iconNav} />
								)}
							</Link>
							Agenda
						</li>
					</ul>
				</nav>
			)}
		</header>
	)
}

export default Navegacion
