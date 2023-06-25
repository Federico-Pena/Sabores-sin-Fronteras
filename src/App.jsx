import './App.css'
import Navegacion from './components/Navegacion'
import { Routes, Route } from 'react-router-dom'
import PlatoRandom from './pages/PlatoRandom'
import PlatoPais from './pages/PlatoPais'

function App() {
	return (
		<>
			<div className='divApp'>
				<Routes>
					<Route index path='/' element={<PlatoRandom />} exact />
					<Route path='/PlatoPais' element={<PlatoPais />} />
					<Route path='*' element={<PlatoRandom />} />
				</Routes>
			</div>
			<Navegacion />
		</>
	)
}

export default App
