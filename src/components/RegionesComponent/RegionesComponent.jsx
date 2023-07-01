function RegionesComponent({ regiones, elegirFiltroPais }) {
	return (
		<ul className='regionesUl'>
			{regiones?.map((region) => {
				return (
					<li
						className='regionesUlLi'
						onClick={() => {
							elegirFiltroPais(region.strArea)
						}}
						key={region.strArea}
						title={region.strArea}>
						<img
							src={region.foto}
							alt={region.strArea}
							className='regionesUlLiImg'
						/>
					</li>
				)
			})}
		</ul>
	)
}

export default RegionesComponent
