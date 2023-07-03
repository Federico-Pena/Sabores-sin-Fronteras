import styles from './Ingredientes.module.css'

import { MdReadMore } from 'react-icons/md'

function Ingredientes({ ingredientes, fliping }) {
	return (
		<div className={styles.Ingredientes}>
			<h3 className={styles.titulo}>Ingredientes</h3>
			<ul className={styles.Ul}>
				{ingredientes?.map((entry, i) => {
					return (
						<li className={styles.Li} key={entry + i}>
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
