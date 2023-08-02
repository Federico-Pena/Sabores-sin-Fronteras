import styles from './Navegacion.module.css'
import { BiWorld } from 'react-icons/bi'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { TiSortAlphabeticallyOutline } from 'react-icons/ti'
import { MdFavorite } from 'react-icons/md'
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
							<Link title='PlatoPais' to={'/PlatoPais'}>
								{locationReact.pathname === '/PlatoPais' ? (
									<BiWorld className={styles.iconNavActive} />
								) : (
									<BiWorld className={styles.iconNav} />
								)}
							</Link>
							Región
						</li>
						<li className={styles.liNavPag}>
							<Link title='PlatoLetra' to={'/PlatoLetra'}>
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
							<Link title='PlatoRandom' to={'/PlatoRandom'}>
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
							<Link title='RecetasGuardadas' to={'/RecetasGuardadas'}>
								{locationReact.pathname === '/RecetasGuardadas' ? (
									<MdFavorite className={styles.iconNavActive} />
								) : (
									<MdFavorite className={styles.iconNav} />
								)}
							</Link>
							Fav
						</li>
					</ul>
				</nav>
			)}
		</header>
	)
}

export default Navegacion
