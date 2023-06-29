import { useEffect, useState } from 'react'

export const IntersectionObserverElement = (elementRef, root, rootMargin) => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const estaEnPantalla = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setVisible(entry.isIntersecting)
				} else {
					setVisible(false)
				}
			})
		}

		const opciones = {
			root: root ? root.current : null,
			rootMargin: rootMargin ? rootMargin : '0px',
			threshold: 1,
		}

		const observer = new IntersectionObserver(estaEnPantalla, opciones)

		if (elementRef.current) {
			observer.observe(elementRef.current)
		}

		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current)
			}
		}
	}, [elementRef, root])

	return visible
}
