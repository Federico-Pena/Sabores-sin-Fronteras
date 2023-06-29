import { useEffect, useRef } from 'react'

const ImageLoader = ({ src, altAttr }) => {
	const imageRef = useRef(null)

	useEffect(() => {
		const opciones = {
			rootMargin: '0px',
			threshold: 1,
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Cargar la imagen
					imageRef.current.src = src
					imageRef.current.classList.remove('invisible')
					observer.unobserve(entry.target)
				}
			})
		}, opciones)

		observer.observe(imageRef.current)
		return () => {
			imageRef.current && observer.unobserve(imageRef.current)
		}
	}, [src])

	return (
		<img className='ulLiImgIComponent invisible' ref={imageRef} alt={altAttr} />
	)
}

export default ImageLoader
