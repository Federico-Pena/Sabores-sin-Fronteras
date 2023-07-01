import './App.css'
import Navegacion from './components/Navegacion/Navegacion'
import { Routes, Route } from 'react-router-dom'
import PlatoRandom from './pages/PlatoRandom/'
import PlatoPais from './pages/PlatoPais'
import Index from './pages/Index'

function App() {
	return (
		<>
			<div className='divApp'>
				<Navegacion />

				<Routes>
					<Route index path='/' element={<Index />} exact />

					<Route path='/PlatoRandom' element={<PlatoRandom />} exact />
					<Route path='/PlatoPais' element={<PlatoPais exact />} />
					<Route path='*' element={<PlatoRandom />} />
				</Routes>
			</div>
		</>
	)
}

export default App
