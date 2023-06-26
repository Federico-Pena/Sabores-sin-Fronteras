import { useEffect, useRef, useState } from 'react'
import {
	MdOutlinePublic,
	MdOutlineCategory,
	MdOutlineSell,
	MdVideocam,
	MdOutlineSource,
	MdReadMore,
	MdOutlineArrowBack,
	MdClose,
} from 'react-icons/md'

import './Receta.css'
/**
 * @param {*} reseta
 * Objeto - Receta a mostrar
 * @param {*} cerrarReceta
 * Funcion - Cerrar vista de recetas
 * @param {*} ingredientes
 * Objeto - Ingredientes a mostrar
 * @param {*} mostrarReceta
 * Funcion - Guarda la receta en el estado del padre
 */
function Receta({
	receta,
	cerrarReceta,
	ingredientes,
	mostrarReceta,
	manejoError,
}) {
	const [flip, setFlip] = useState(false)
	const ulInstruccionesRef = useRef()

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})
	const handleScroll = () => {
		const instucciones = ulInstruccionesRef.current?.childNodes

		instucciones?.forEach((element) => {
			if (element.getBoundingClientRect().y < 100 + window.innerHeight / 2) {
				element.classList.add('liAnimacion')
			}
			if (element.getBoundingClientRect().y > 100 + window.innerHeight) {
				element.classList.remove('liAnimacion')
			}
		})
	}
	function fliping() {
		setFlip(!flip)
	}

	const obtenerReceta = async () => {
		try {
			const response = await fetch(
				`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${receta.idMeal}`
			)
			const data = await response.json()
			mostrarReceta(data.meals[0])
		} catch (error) {
			manejoError(error)
		}
	}

	return (
		<div
			className='recetasContainer'
			onClick={ingredientes ? null : obtenerReceta}>
			{cerrarReceta && (
				<button
					className='btnCerrarReceta'
					onClick={cerrarReceta}
					title='Cerrar Receta'>
					<MdClose />
				</button>
			)}
			{ingredientes && <h1>No Sabes Que Cocinar?</h1>}
			<div className='divNombreFoto'>
				{receta.strMealThumb && (
					<img src={receta.strMealThumb} alt={receta.strMeal} />
				)}
				{receta.idMeal && <small>Receta N° {receta.idMeal}</small>}
				{receta.strMeal && <h2>{receta.strMeal}</h2>}
			</div>
			{flip ? (
				<div className='divInstrucciones'>
					<h3>Instructiones</h3>
					<ul className='ulInstructions' ref={ulInstruccionesRef}>
						{receta?.strInstructions.split('.').map((e, i) => {
							return e.trim() && e.trim().length >= 2 ? (
								<li key={e}>
									<span className='spanInstructionsNumero'>
										{'# ' + (i + 1)}
									</span>
									<span>{e}</span>
								</li>
							) : null
						})}
					</ul>
					<button
						className='btnVerIngredientes'
						title='Ver Ingredientes'
						onClick={fliping}>
						<strong>Volver</strong>
						<MdOutlineArrowBack />
					</button>
				</div>
			) : ingredientes ? (
				<div className='frente'>
					<div className='divCategoriasInfo'>
						{receta.strTags && (
							<div>
								<small>Tags</small>
								<MdOutlineSell />
								<ul>
									{receta.strTags.split(',').map((tag) => (
										<li key={tag}>{tag}</li>
									))}
								</ul>
							</div>
						)}
						{receta.strCategory && (
							<div>
								<small>Categoria</small>
								<MdOutlineCategory /> {receta.strCategory}
							</div>
						)}
						{receta.strArea && (
							<div>
								<small>Pais</small>
								<MdOutlinePublic /> {receta.strArea}
							</div>
						)}
					</div>
					<div className='divEnlaces'>
						{receta.strYoutube && (
							<a href={receta.strYoutube} target='_blanck'>
								<MdVideocam />
								Video
							</a>
						)}
						{receta.strSource && (
							<a href={receta.strSource} target='_blanck'>
								<MdOutlineSource />
								Fuente
							</a>
						)}
					</div>
					{ingredientes && (
						<>
							<div className='divIngredientes'>
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
							</div>
							<button
								className='btnVerIngredientes'
								title='Ver Ingredientes'
								onClick={fliping}>
								<strong>Ver Receta</strong> <MdReadMore />
							</button>
						</>
					)}
				</div>
			) : null}
		</div>
	)
}

export default Receta
