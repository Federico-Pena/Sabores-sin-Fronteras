import { useState } from 'react'
import { MdSend } from 'react-icons/md'

import './BuscadorDePalabras.css'
const BuscadorDePalabras = ({ buscadorRecetas }) => {
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
		<div className='divFormInputBuscar'>
			<form className='formInputBuscar'>
				<label htmlFor='inputBuscar'>
					<span>Una Letra</span>
					<input
						title='Buscar Por Una Letra'
						autoComplete='off'
						id='inputBuscar'
						maxLength={1}
						type='text'
						value={inputValue}
						onChange={handleInputChange}
					/>
				</label>
				<button className='formInputBuscarBtn' onClick={fetchRecetasLetra}>
					<MdSend />
				</button>
				{error ? <small>Ocurrió Un Error Al Buscar La imagen</small> : null}
			</form>
		</div>
	)
}

export default BuscadorDePalabras
