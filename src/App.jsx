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
				<Route index path='/' element={<Index />} exact />
				<Route path='/PlatoRandom' element={<PlatoRandom />} exact />
				<Route path='/PlatoLetra' element={<PlatoLetra />} exact />
				<Route path='/PlatoPais' element={<PlatoPais exact />} />
				<Route path='/RecetasGuardadas' element={<RecetasGuardadas exact />} />
				<Route path='*' element={<Index />} />
			</Routes>
		</>
	)
}

export default App
