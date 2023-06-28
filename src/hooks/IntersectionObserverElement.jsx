import { useEffect, useState } from 'react'

function IntersectionObserverElement(visorRef, root, rootMargin, threshold) {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const { current } = visorRef
		const estaVisible = (entries) => {
			if (current.children.length > 574) {
				observer.unobserve(current.lastChild)
				console.log('unobserve')
			}
			const [entry] = entries
			setVisible(entry.isIntersecting)
		}
		const options = {
			root: root.current || null,
			rootMargin: rootMargin || '0px',
			threshold: threshold || 0,
		}
		const observer = new IntersectionObserver(estaVisible, options)
		if (current) {
			observer.observe(current.lastChild)
		}
		return () => {
			if (current) {
				observer.disconnect()
			}
		}
	}, [visorRef, root, rootMargin, threshold])
	return { visible, visorRef }
}

export default IntersectionObserverElement
