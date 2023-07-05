import { useState } from 'react'
import { MdSend } from 'react-icons/md'

import styles from './BuscadorDeLetras.module.css'
import Modal from '../Modal/Modal'
const BuscadorDeLetras = ({ buscadorRecetas, refParent, setBuscados }) => {
	const [inputValue, setInputValue] = useState('')
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	const fetchRecetasLetra = async (e) => {
		e.preventDefault()
		setLoading(true)
		if (inputValue) {
			try {
				const result = await fetch(
					`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`
				)
				const data = await result.json()
				buscadorRecetas(data.meals)
				setBuscados(inputValue)
				setTimeout(() => {
					if (refParent.current) {
						refParent.current.scrollIntoView({ behavior: 'smooth' })
					}
				}, 500)
			} catch (error) {
				setError(error)
			}
		}
		setInputValue('')
		setLoading(false)
	}
	const handleInputChange = (event) => {
		const value = event.target.value
		setInputValue(value)
	}

	return (
		<div className={styles.divFormInputBuscar}>
			{loading ? <Modal loading={loading} /> : null}
			<form
				className={styles.formBuscador}
				onSubmit={fetchRecetasLetra}
				lang='ES'>
				<label htmlFor='selectBuscar'>Una Letra</label>
				<select
					value={inputValue}
					className={styles.inputForm}
					id='selectBuscar'
					title='Buscar Por Una Letra'
					onChange={handleInputChange}>
					<option value=''></option>
					<option value='A'>A.</option>
					<option value='B'>B.</option>
					<option value='C'>C.</option>
					<option value='D'>D.</option>
					<option value='E'>E.</option>
					<option value='F'>F.</option>
					<option value='G'>G.</option>
					<option value='H'>H.</option>
					<option value='I'>I.</option>
					<option value='J'>J.</option>
					<option value='K'>K.</option>
					<option value='L'>L.</option>
					<option value='M'>M.</option>
					<option value='N'>N.</option>
					<option value='O'>O.</option>
					<option value='P'>P.</option>
					<option value='R'>R.</option>
					<option value='S'>S.</option>
					<option value='T'>T.</option>
					<option value='U'>U.</option>
					<option value='V'>V.</option>
					<option value='W'>W.</option>
					<option value='X'>X.</option>
					<option value='Y'>Y.</option>
					<option value='Z'>Z.</option>
				</select>
				<button className={styles.btnForm}>
					<MdSend className={styles.btnFormSvg} />
				</button>
			</form>
			{error ? <small>Error De Red Intente Nuevamente.</small> : null}
		</div>
	)
}

export default BuscadorDeLetras
