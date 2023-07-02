import { useState } from 'react'
import { MdSend } from 'react-icons/md'

import styles from './BuscadorDeLetras.module.css'
const BuscadorDeLetras = ({ buscadorRecetas, refParent }) => {
	const [inputValue, setInputValue] = useState('')
	const [error, setError] = useState(false)
	const fetchRecetasLetra = async (e) => {
		e.preventDefault()
		if (inputValue) {
			try {
				const result = await fetch(
					`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`
				)
				const data = await result.json()
				buscadorRecetas(data.meals)
				refParent.current.scrollIntoView({ behavior: 'smooth' })
			} catch (error) {
				setError(error)
				setTimeout(() => {
					setError()
				}, 5000)
			}
		}
		setInputValue('')
	}
	const handleInputChange = (event) => {
		const value = event.target.value
		setInputValue(value)
	}

	return (
		<div className={styles.divFormInputBuscar}>
			<form className={styles.formBuscador}>
				<label htmlFor='inputBuscar'>
					<span>Una Letra</span>
					<input
						title='Buscar Por Una Letra'
						autoComplete='off'
						id='inputBuscar'
						className={styles.inputForm}
						maxLength={1}
						minLength={1}
						type='text'
						value={inputValue}
						onChange={handleInputChange}
					/>
				</label>
				<button className={styles.btnForm} onClick={fetchRecetasLetra}>
					<MdSend className={styles.btnFormSvg} />
				</button>
			</form>
			{error ? <small>Ocurrió Un Error Al Buscar La imagen</small> : null}
		</div>
	)
}

export default BuscadorDeLetras
