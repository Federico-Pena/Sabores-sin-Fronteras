import { useRef, useState } from 'react'
import BuscadorDePalabras from '../../components/BuscadorDeLetras/BuscadorDeLetras'

function PlatoLetra() {
	const [buscado, setBuscado] = useState()
	const [loading, setLoading] = useState()
	const [receta, setReceta] = useState()
	const [ingredientes, setIngredientes] = useState()
	const [recetas, setRecetas] = useState([])
	const sectionLetraRef = useRef()
	const mostrarRecetas = (e) => {
		setLoading(true)
		setReceta()
		setIngredientes()

		setLoading(false)
		/* setTimeout(() => {
			if (sectionLetraRef.current) {
				sectionLetraRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		}, 500) */
	}

	function buscadorRecetas(e) {
		mostrarRecetas(e)
	}

	function mostrarBuscados(e) {
		setBuscado(e)
	}
	/*   function cerrarReceta() {
		setError()
		setReceta()
		setIngredientes()
	} */
	return (
		<>
			{/* {recetas?.length > 0 ? (
					<ContenedorRecetas>
						{recetas?.map((receta, i) => {
							return (
								<div className={styles.divnumeroReceta} key={i}>
									<small className={styles.numeroReceta}>
										{i + 1}/{recetas.length}
									</small>
									<Receta
										manejoError={manejoError}
										mostrarReceta={mostrarReceta}
										receta={receta}
									/>
								</div>
							)
						})}
					</ContenedorRecetas>
				) : (
					<h2 className={styles.subTitulo}>
						Realiza Una Busqueda
					</h2>} */}
			<BuscadorDePalabras
				buscadorRecetas={buscadorRecetas}
				setBuscados={mostrarBuscados}
			/>
		</>
	)
}

export default PlatoLetra
