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
				<label htmlFor='selectBuscar'>Una Letra</label>

				<select
					className={styles.inputForm}
					id='selectBuscar'
					title='Buscar Por Una Letra'
					onChange={handleInputChange}>
					<option value=''></option>
					<option value='A'>A</option>
					<option value='B'>B</option>
					<option value='C'>C</option>
					<option value='D'>D</option>
					<option value='E'>E</option>
					<option value='F'>F</option>
					<option value='G'>G</option>
					<option value='H'>H</option>
					<option value='I'>I</option>
					<option value='J'>J</option>
					<option value='K'>K</option>
					<option value='L'>L</option>
					<option value='M'>M</option>
					<option value='N'>N</option>
					<option value='O'>O</option>
					<option value='P'>P</option>
					<option value='Q'>Q</option>
					<option value='R'>R</option>
					<option value='S'>S</option>
					<option value='T'>T</option>
					<option value='U'>U</option>
					<option value='V'>V</option>
					<option value='W'>W</option>
					<option value='X'>X</option>
					<option value='Y'>Y</option>
					<option value='Z'>Z</option>
				</select>
				<button className={styles.btnForm} onClick={fetchRecetasLetra}>
					<MdSend className={styles.btnFormSvg} />
				</button>
			</form>
			{error ? <small>Error De Red Intente Nuevamente</small> : null}
		</div>
	)
}

export default BuscadorDeLetras
