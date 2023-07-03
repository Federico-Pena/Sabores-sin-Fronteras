import styles from './ContenedorRecetas.module.css'
function ContenedorRecetas({ children }) {
	return <section className={styles.contenedorRecetas}>{children}</section>
}

export default ContenedorRecetas
