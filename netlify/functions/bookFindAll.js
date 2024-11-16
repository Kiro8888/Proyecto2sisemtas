"use strict";

const redis = require('./redisDB');
const headers = require('./headersCORS');

function toJson(item) {
  return JSON.parse(item);
}

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    
    redis.on("connect", function() {
      console.log("You are now connected");
    });

    // Inicializa un arreglo para las claves
    let keys = [];
    // Obtén el número de libros almacenados
    let n = await redis.get('book_N');
    
    // Si 'book_N' no está definido o es 0, responde sin libros
    if (!n || isNaN(n)) {
      return { statusCode: 200, headers, body: JSON.stringify([]) }; // Sin libros
    }

    // Genera las claves para cada libro
    for (let i = 1; i <= n; i++) {
      keys.push('book_' + i);
    }

    // Obtén los valores de las claves
    const books = await redis.mget(keys);

    // Convierte los libros a objetos JSON
    const parsedBooks = books.map(toJson);
    
    // Retorna los libros como respuesta
    return { statusCode: 200, headers, body: JSON.stringify(parsedBooks) };

  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
