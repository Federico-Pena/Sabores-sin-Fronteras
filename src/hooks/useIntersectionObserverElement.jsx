import { useEffect, useState } from 'react'

export const useIntersectionObserverElement = (
	elementRef,
	root,
	rootMargin,
	threshold
) => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const { current } = elementRef
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
			threshold: threshold ? threshold : 1,
		}

		const observer = new IntersectionObserver(estaEnPantalla, opciones)

		if (elementRef.current) {
			observer.observe(elementRef.current)
		}

		return () => {
			if (current) {
				observer.unobserve(current)
			}
		}
	}, [elementRef, root, rootMargin, threshold])

	return visible
}
