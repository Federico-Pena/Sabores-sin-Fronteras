import eeuu from '../assets/images/eeuu.png'
import england from '../assets/images/england.png'
import canada from '../assets/images/canada.png'
import china from '../assets/images/china.png'
import croacia from '../assets/images/croacia.png'
import holanda from '../assets/images/holanda.png'
import egipto from '../assets/images/egipto.png'
import filipinas from '../assets/images/filipinas.png'
import francia from '../assets/images/francia.png'
import grecia from '../assets/images/grecia.png'
import india from '../assets/images/india.png'
import irlanda from '../assets/images/irlanda.png'
import italia from '../assets/images/italia.png'
import jamaica from '../assets/images/jamaica.png'
import japon from '../assets/images/japon.png'
import kenia from '../assets/images/kenia.png'
import malasia from '../assets/images/malasia.png'
import mexico from '../assets/images/mexico.png'
import marruecos from '../assets/images/marruecos.png'
import polonia from '../assets/images/polonia.png'
import portugal from '../assets/images/portugal.png'
import rusia from '../assets/images/rusia.png'
import españa from '../assets/images/españa.png'
import tailandia from '../assets/images/tailandia.png'
import tunez from '../assets/images/tunez.png'
import turquia from '../assets/images/turquia.png'
import desconocida from '../assets/images/desconocida.png'
import vietnam from '../assets/images/vietnam.png'
let arrayFotos = [
	eeuu,
	england,
	canada,
	china,
	croacia,
	holanda,
	egipto,
	filipinas,
	francia,
	grecia,
	india,
	irlanda,
	italia,
	jamaica,
	japon,
	kenia,
	malasia,
	mexico,
	marruecos,
	polonia,
	portugal,
	rusia,
	españa,
	tailandia,
	tunez,
	turquia,
	desconocida,
	vietnam,
]
import datosRegiones from '../../datosRegiones.json'
export const obtenerRegiones = async () => {
	datosRegiones.meals?.map((dataen, i) => {
		dataen.foto = arrayFotos[i]
	})
	return datosRegiones.meals
}
