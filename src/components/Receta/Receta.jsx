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
import { IntersectionObserverElement } from '../../hooks/IntersectionObserverElement'
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
	irArriba,
}) {
	const [flip, setFlip] = useState(false)
	const ulInstRef = useRef(null)
	const divref = useRef(null)
	const visible = IntersectionObserverElement(ulInstRef)

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
			onClick={() => {
				if (ingredientes) {
					return
				} else {
					obtenerReceta()
				}
			}}>
			{ingredientes && <h1>No Sabes Que Cocinar?</h1>}
			{cerrarReceta && (
				<button
					className='btnCerrarReceta'
					onClick={() => {
						cerrarReceta()
					}}
					title='Cerrar Receta'>
					<MdClose />
				</button>
			)}
			<div className='divNombreFoto'>
				{receta.strMealThumb && (
					<img
						className='imgReceta'
						src={`${receta.strMealThumb}`}
						alt={receta.strMeal}
					/>
				)}
				{receta.idMeal && (
					<small className='divNombreFotoSmall'>
						Receta N° {receta.idMeal}
					</small>
				)}
				{receta.strMeal && (
					<h2 className='divNombreFotoH2'>{receta.strMeal}</h2>
				)}
			</div>
			{flip ? (
				<div className='divInstrucciones'>
					<h3>Instructiones</h3>
					<ul className='ulInstructions'>
						{receta?.strInstructions.split('.').map((e, i) => {
							return e.trim() && e.trim().length >= 2 ? (
								<li className='ulLiInstructions' key={e}>
									<span className='spanInstructionsNumero'>
										{'# ' + (i + 1)}
									</span>
									<span className='spanInstructionsContenido' ref={ulInstRef}>
										{e}
									</span>
								</li>
							) : null
						})}
					</ul>
					<button
						className='btnVerIngredientes'
						title='Ver Ingredientes'
						onClick={() => {
							fliping()
						}}>
						<strong>Volver</strong>
						<MdOutlineArrowBack />
					</button>
				</div>
			) : ingredientes ? (
				<div className='frente'>
					<div className='divCategoriasInfo'>
						{receta.strTags && (
							<div className='divSCategoriasInfo'>
								<small className='divCategoriasInfoSmall'>Tags</small>
								<MdOutlineSell />
								<ul className='divCategoriasInfoUl'>
									{receta.strTags.split(',').map((tag) => (
										<li className='divCategoriasInfoUlLi' key={tag}>
											{tag}
										</li>
									))}
								</ul>
							</div>
						)}
						{receta.strCategory && (
							<div className='divSCategoriasInfo'>
								<small className='divCategoriasInfoSmall'>Categoria</small>
								<MdOutlineCategory />
								<small className='divCategoriasInfoSmall'>
									{receta.strCategory}
								</small>
							</div>
						)}
						{receta.strArea && (
							<div className='divSCategoriasInfo'>
								<small className='divCategoriasInfoSmall'>Pais</small>
								<MdOutlinePublic />
								<small className='divCategoriasInfoSmall'>
									{receta.strArea}
								</small>
							</div>
						)}
					</div>
					<div className='divEnlaces'>
						{receta.strYoutube && (
							<a className='enlaces' href={receta.strYoutube} target='_blanck'>
								<MdVideocam />
								Video
							</a>
						)}
						{receta.strSource && (
							<a className='enlaces' href={receta.strSource} target='_blanck'>
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
								onClick={() => {
									fliping()
								}}>
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
