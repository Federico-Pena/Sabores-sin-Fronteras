import './Modal.css'
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
		<div className='modalContainer'>
			{loading && (
				<div className='loaderContainer'>
					<p className='loader'></p>
				</div>
			)}
			{exito && (
				<div className='exitoContainer'>
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
				<div className='exitoContainer'>
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
				<div className='exitoContainer'>
					<div className='divTitulo'>
						{titulo ? <h2>{titulo}</h2> : null}
						{descripcion ? <p>{descripcion}</p> : null}
					</div>
					{contenido ? <div>{contenido}</div> : null}
					<div className='divBtnContenido'>
						{cerrarModal && <button onClick={cerrarModal}>Aceptar</button>}
					</div>
				</div>
			)}
		</div>
	)
}

export default Modal
