import styles from './Ingredientes.module.css'
import { MdReadMore } from 'react-icons/md'

function Ingredientes({ ingredientes, fliping }) {
	return (
		<div className={styles.containerInfo}>
			<h3>Ingredientes</h3>
			<ul>
				{ingredientes?.map((entry, i) => {
					return (
						<li key={entry + i}>
							<span>{entry}</span>
						</li>
					)
				})}
			</ul>
			<button
				className={styles.btnVerIngredientes}
				title='Ver Ingredientes'
				onClick={fliping}>
				<strong>Ver Receta</strong> <MdReadMore />
			</button>
		</div>
	)
}

export default Ingredientes
