import styles from './Navegacion.module.css'
import { BiWorld } from 'react-icons/bi'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { TiSortAlphabeticallyOutline } from 'react-icons/ti'
import { TfiAgenda } from 'react-icons/tfi'
import { useLocation, Link } from 'react-router-dom'
function Navegacion() {
	let locationReact = useLocation()

	return (
		<header>
			{locationReact.pathname === '/' ? null : (
				<nav className={styles.Nav} translate='no'>
					<ul className={styles.UlNav}>
						<li className={styles.liNavLogo}>
							<img className={styles.logoNav} src='/food.png' alt='Logo' />
							SSF
						</li>
						<li className={styles.liNavPag}>
							<Link to={'/PlatoPais'}>
								{locationReact.pathname === '/PlatoPais' ? (
									<BiWorld className={styles.iconNavActive} />
								) : (
									<BiWorld className={styles.iconNav} />
								)}
							</Link>
							Región
						</li>
						<li className={styles.liNavPag}>
							<Link to={'/PlatoLetra'}>
								{locationReact.pathname === '/PlatoLetra' ? (
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
							<Link to={'/PlatoRandom'}>
								{locationReact.pathname === '/PlatoRandom' ? (
									<GiPerspectiveDiceSixFacesRandom
										href='/PlatoRandom'
										className={styles.iconNavActive}
									/>
								) : (
									<GiPerspectiveDiceSixFacesRandom className={styles.iconNav} />
								)}
							</Link>
							Random
						</li>
						<li className={styles.liNavPag}>
							<Link to={'/RecetasGuardadas'}>
								{locationReact.pathname === '/RecetasGuardadas' ? (
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
