import { useEffect, useRef } from 'react'

const IngredinteLoader = ({ ingrediente, buscarRecetaPorIngrediente }) => {
	const liRef = useRef(null)
	const { current } = liRef

	useEffect(() => {
		const opciones = {
			rootMargin: '0px 0px 0px 0px',
			threshold: 0,
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					liRef.current.classList.add('ulLiIComponent')
					liRef.current.children[0].src = ingrediente.foto
					console.log(liRef.current.children)
					observer.unobserve(entry.target)
				}
			})
		}, opciones)

		observer.observe(liRef.current)
		return () => {
			current && observer.unobserve(current)
		}
	}, [ingrediente, current])

	return (
		<li
			ref={liRef}
			className=''
			onClick={() => buscarRecetaPorIngrediente(ingrediente.strIngredient)}>
			<img
				className='ulLiImgIComponent'
				src={ingrediente.foto ? ingrediente.foto : 'placeholder.svg'}
				alt={ingrediente.strIngredient}
			/>
			<span className='ulLiImgInglesIComponent'>
				{ingrediente.strIngredient}
			</span>
			<span className='ulLiImgEspañolIComponent'>
				{ingrediente.nombreEspañol}
			</span>
		</li>
	)
}

export default IngredinteLoader
