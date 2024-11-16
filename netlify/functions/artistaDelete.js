"use strict";

const redis = require('./redisDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    redis.on("connect", function() {
      console.log("You are now connected");
    });

    const id = event.path.split("/").reverse()[0]; // Obtiene el id directamente sin agregar prefijo

    await redis.del(id); // Elimina la clave usando el id directamente
    await redis.decr('artista_N'); // Decrementa el contador total

    return { statusCode: 200, headers, body: 'OK' };
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
