//
// Ejemplos de 7 métodos de arrays
//
const posts = [{
    id: 1,
    title: 'Mi primer post',
    imagen: 'https://img.com/1',
    tags: ['javascript', 'webdevelopment']
}, {
    id: 2,
    title: 'Mi experiencia con React',
    imagen: 'https://img.com/2',
    tags: ['javascript', 'webdevelopment', 'react']
}, {
    id: 3,
    title: 'Por qué dejé Angular',
    imagen: 'https://img.com/3',
    tags: ['javascript', 'webdevelopment', 'angular']
}];

//
// find: buscar un elemento que contenga lo que estamos buscando
//
console.log(posts.find( post => post.title == 'Mi primer post'));
console.log(posts.find( post => post.id === 3));

//
// some: nos va a devolver true o false dependiendo de si existe o no existe lo que estamos buscando 'hay alguno que cumpla....'
//
console.log(posts.some( post => post.id === 3));
console.log(posts.some( post => post.id === 4));

//
// includes: nos permite mirar si dentro de un array existe una palabra o elemento
//
// Hay algun post en cuyas tags se incluya 'vue'
console.log(posts.some( post => post.tags.includes('vue')));
console.log(posts.some( post => post.tags.includes('react')));

//
// every: (contrario a some) comprueba no solo si hay alguno sino si se cumple en todas
//
// En todos los post los tags incluyen la etiqueta 'react'
console.log(posts.every( post => post.tags.includes('react')));
console.log(posts.every( post => post.tags.includes('javascript')));

//
// map: transformar un array de un tipo de elemento en otro array de otro tipo de elemento
//
// Formar un array solo con los títulos de los post
console.log(posts.map(post => post.title));

//
// filter: para filtrar elementos que cumplan una condicion
//
// Formar un array solo con los títulos de los post
console.log(posts.filter(post => post.tags.includes('angular')));
// Imaginate que un post no tiene el atributo imagen
console.log(posts.filter(post => post.imagen !== undefined));
// Equivalente al de arriba, usando el operador nulis collection ?
console.log(posts.filter(post => post?.imagen));

//
// reduce
//
// Crear un array que incluya todos los tags de los posts, allTags es el acumumulador
console.log(posts.reduce((allTags, post) => {
    return [...allTags, ...post.tags];
}, []));
// Para eliminar las repetidas se puede emplear el nuevo operador de javascripts Set, estructura que no tiene elementos repetidos
console.log(posts.reduce((allTags, post) => {
    return Array.from(new Set([...allTags, ...post.tags]));
}, []));
// Empleando filter
console.log(posts.reduce((allTags, post) => {
    return [...allTags, ...post.tags];
}, []).filter((post, index, self) => index === self.indexOf(post)));
