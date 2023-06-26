import { useState, useEffect } from 'react'
import Receta from '../components/Receta'
import './PlatoRandom.css'
import { TfiReload } from 'react-icons/tfi'
import Modal from '../components/Modal'
import { fetchRecetas } from '../helpers/fetchRecetas'
function PlatoRandom() {
	const [receta, setReceta] = useState('')
	const [ingredientes, setIngredientes] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()

	useEffect(() => {
		pintarRecetas()
	}, [])

	const pintarRecetas = async () => {
		setLoading(true)
		try {
			const data = await fetchRecetas()
			setReceta(...data.data[0].meals)
			setIngredientes(data.ingredientes)
		} catch (error) {
			setError(error)
		}

		setLoading(false)
	}

	function cerrarModal() {
		setError()
	}

	return (
		<div className='divPlatoRandom'>
			{error ? (
				<Modal
					cerrarModal={cerrarModal}
					manejoError={error}
					error={error}
					titulo={'Ocurrió Un Error'}
				/>
			) : loading ? (
				<Modal loading={loading} />
			) : receta ? (
				<>
					<h1>Sorpresa Culinaria</h1>
					<button className='btnAleatoria' onClick={pintarRecetas}>
						<TfiReload />
					</button>
					<Receta
						manejoError={error}
						ingredientes={ingredientes}
						receta={receta}
						loading={loading}
					/>
				</>
			) : (
				<>
					<h1>Ocurrió Un Error</h1>
					<h2>Intenta Recargando La Página</h2>
				</>
			)}
		</div>
	)
}

export default PlatoRandom
