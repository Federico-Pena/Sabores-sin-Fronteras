import Navegacion from './components/Navegacion/Navegacion'
import { Routes, Route } from 'react-router-dom'
import PlatoRandom from './pages/PlatoRandom/PlatoRandom/'
import PlatoPais from './pages/PlatoPais/PlatoPais'
import Index from './pages/Index/Index'
import PlatoLetra from './pages/PlatoLetra/PlatoLetra'
import RecetasGuardadas from './pages/RecetasGuardadas/RecetasGuardadas'

function App() {
	return (
		<>
			<Navegacion />
			<Routes>
				<Route index path='/' element={<Index />} />
				<Route path='/PlatoRandom' element={<PlatoRandom />} />
				<Route path='/PlatoLetra' element={<PlatoLetra />} />
				<Route path='/PlatoPais' element={<PlatoPais />} />
				<Route path='/RecetasGuardadas' element={<RecetasGuardadas />} />
				<Route path='*' element={<Index />} />
			</Routes>
		</>
	)
}

export default App
