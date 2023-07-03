import Navegacion from './components/Navegacion/Navegacion'
import { Routes, Route } from 'react-router-dom'
import PlatoRandom from './pages/PlatoRandom/PlatoRandom/'
import PlatoPais from './pages/PlatoPais/PlatoPais'
import Index from './pages/Index/Index'

function App() {
	return (
		<>
			<Navegacion />
			<Routes>
				<Route index path='/' element={<Index />} exact />
				<Route path='/PlatoRandom' element={<PlatoRandom />} exact />
				<Route path='/PlatoPais' element={<PlatoPais exact />} />
				<Route path='*' element={<PlatoRandom />} />
			</Routes>
		</>
	)
}

export default App
