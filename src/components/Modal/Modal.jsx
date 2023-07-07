import styles from './Modal.module.css'
/**
 *
 * @param {*} loading
 * Boolean
 * @param {*} exito
 * Boolean
 * @param {*} error
 * Boolean
 * @param {*} cerrarModal
 * Function
 * @returns
 * JSXElement
 */
function Modal({
	loading,
	exito,
	error,
	cerrarModal,
	titulo,
	descripcion,
	contenido,
}) {
	return (
		<div className={styles.modalContainer}>
			{loading && (
				<div className={styles.loaderContainer}>
					<img src='./food.png' alt='' />
					<p className={styles.loader}></p>
				</div>
			)}
			{exito && (
				<div className={styles.exitoContainer}>
					{titulo ? <h2>{titulo}</h2> : null}
					<img
						src='https://res.cloudinary.com/fotoscloudinary/image/upload/v1687373808/exito_fjc1pe.png'
						alt='exito icono'
					/>
					{descripcion ? <p>{descripcion}</p> : null}
					{cerrarModal && <button onClick={cerrarModal}>Aceptar</button>}
				</div>
			)}
			{error && (
				<div className={styles.exitoContainer}>
					{titulo ? <h2>{titulo}</h2> : null}
					<img
						src='https://res.cloudinary.com/fotoscloudinary/image/upload/v1687373812/error_zdkoh9.png'
						alt='error icono'
					/>
					{descripcion ? <p>{descripcion}</p> : null}
					{cerrarModal && <button onClick={cerrarModal}>Aceptar</button>}
				</div>
			)}
			{contenido && (
				<div className={styles.exitoContainer}>
					<div className={styles.divTitulo}>
						{titulo ? <h2>{titulo}</h2> : null}
						{descripcion ? <p>{descripcion}</p> : null}
					</div>
					{contenido ? <div>{contenido}</div> : null}
					<div className={styles.divBtnContenido}>
						{cerrarModal && <button onClick={cerrarModal}>Aceptar</button>}
					</div>
				</div>
			)}
		</div>
	)
}

export default Modal
