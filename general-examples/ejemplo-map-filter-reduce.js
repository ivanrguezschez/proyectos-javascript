//
// Ejemplos de 'map'
//
const numerosMap = [3, 10, 20, 50]; 
const dobles = numerosMap.map(function(numero) {
    return numero * 2;
});
// En forma de arrow function
// const dobles = numerosMap.map(numero => numero * 2);
console.log(`map->dobles: ${dobles}`);

const productos = [
    { id: '11A', nombre: 'Camiseta', precio: 500 },
    { id: '22B', nombre: 'Zapatillas', precio: 2000 },
    { id: '33C', nombre: 'Pantalón', precio: 1500 },
];
// Aplicar un descuento a aquellos productos cuyo precio sea superior a 1000
const productosConDescuento = productos.map(function(producto) {
    if (producto.precio < 1000) {
        return producto;
    }
    return {
        ...producto,
        precio: producto.precio * 0.9
    };
});
console.log(`map->productosConDescuento: ${productosConDescuento}`);
// Extraer los ids de los productos
const idProductos = productos.map(({ id }) => id);
console.log(`map->idProductos: ${idProductos}`);

//
// Ejemplos de 'filter'
//
const productosBaratos = productos.filter(producto => producto.precio < 1000);
// En forma de arrow function reducidas
//const esBarato = producto => producto.precio < 1000;
//const esCaro = producto => !esBarato(producto);
//const productosBaratos = productos.filter(esBarato);
//const productosCaros = productos.filter(esCaro  );
console.log(`filter->productosBaratos: ${productosBaratos}`);

// Eliminar los numeros (elementos) repeditos de un array
const numerosFilter = [1, 2, 3, 4, 3, 1];
const numerosUnicos = numerosFilter.filter((numero, posicion, numerosFilter) => {
    return posicion === numerosFilter.indexOf(numero);
});
console.log(`filter->numerosUnicos: ${numerosUnicos}`);

//
// Ejemplos de 'reduce'
//
const numerosReduce = [3, 10, 20, 50];
let total = numerosReduce.reduce((acumulador, numero) => acumulador + numero, 0);
// En forma reducida
//const acumular = (acumulador, numero) => acumulador + numero;
//let total = numerosReduce.reduce(acumular, 0);
console.log(`reduce->total: ${total}`);

// Dado un array de numeros obtener un nuevo array con el doble de los numeros empleando reduce
const numerosReduce2 = [71, 41, 19, 88, 3, 65];
const acumularDobles = (acumulador, numero) => [...acumulador, numero * 2];
const doblesReduce = numerosReduce2.reduce(acumularDobles, []);
console.log(`reduce->doblesReduce: ${doblesReduce}`);
