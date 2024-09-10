// Ejemplo de promesas y de async y await en java script
const datos = [
	{ id: 1, title: 'Iron Man', year: 2008 },
	{ id: 2, title: 'Spiderman: Homecoming', year: 2017 },
	{ id: 3, title: 'Avengers: Endgame', year: 2019 }
];
// Tenemos una función que devuelve los datos
//const getDatos = () => {
//	return datos;
//};

// Simulamos que tarda unos segundos con setTimeout
const getDatos = () => {
	setTimeout(() => {
		return datos;
	}, 1500);
};

// Convertimos la función en un promesa
const getDatos = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(datos);
		}, 1500);
	});
};

// Hacemos uso de async y await en la llamada
const getDatos = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(datos);
		}, 1500);
	});
};

// Ejecutamos 1: nos muestra los datos
console.log(getDatos());

// Ejecutamos 2: nos muestra undefined porque los datos no son devueltos al ejecutarse console.log sino 1'5 segundos despues
console.log(getDatos());

// Ejecutamos 3: ahora pasa el 1,5 segundos y nos muestra los datos por consola
getDatos()
	.then((datos) => console.log(datos));

// El async await nos permite escribir esto mismo pero sin los then y catch sino de una forma mas limpia, mas lineal, las secuencial.
async function fetchingData() {
	try {
		const data = await getDatos();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}
fetchingData();


