import styles from './Ingredientes.module.css'

import { MdReadMore } from 'react-icons/md'

function Ingredientes({ ingredientes, fliping }) {
	return (
		<div className={styles.Ingredientes}>
			<h2 className={styles.titulo}>Ingredientes</h2>
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
				<strong>Ver Instrucciones</strong>
			</button>
		</div>
	)
}

export default Ingredientes
