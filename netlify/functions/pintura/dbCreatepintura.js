"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

const pinturas = [
    {
      "id": 1,
      "slug": "mona-lisa",
      "title": "La Mona Lisa",
      "artist": 1,
      "year": "1503",
      "description": "Un retrato pintado por el artista renacentista italiano Leonardo da Vinci.",
      "museum": 1,
      "image": "/src/images/pinturas/mona-lisa.jpg"
    },
    {
      "id": 2,
      "slug": "starry-night",
      "title": "La Noche Estrellada",
      "artist": 2,
      "year": "1889",
      "description": "Un óleo sobre lienzo pintado por el postimpresionista neerlandés Vincent van Gogh.",
      "museum": 3,
      "image": "/src/images/pinturas/starry-night.jpg"
    },
    {
      "id": 3,
      "slug": "the-last-supper",
      "title": "La Última Cena",
      "artist": 1,
      "year": "1498",
      "description": "Un mural pintado por Leonardo da Vinci.",
      "museum": 1,
      "image": "/src/images/pinturas/the-last-supper.jpeg"
    },
    {
      "id": 4,
      "slug": "sunflowers",
      "title": "Los Girasoles",
      "artist": 2,
      "year": "1888",
      "description": "Una serie de pinturas realizadas por Vincent van Gogh.",
      "museum": 2,
      "image": "/src/images/pinturas/sunflowers.jpeg"
    },
    {
      "id": 5,
      "slug": "guernica",
      "title": "Guernica",
      "artist": 3,
      "year": "1937",
      "description": "Un mural de gran tamaño al óleo sobre lienzo del artista español Pablo Picasso.",
      "museum": 3,
      "image": "/src/images/pinturas/guernica.jpg"
    },
    {
      "id": 6,
      "slug": "water-lilies",
      "title": "Los Nenúfares",
      "artist": 4,
      "year": "1919",
      "description": "Una serie de aproximadamente 250 óleos del impresionista francés Claude Monet.",
      "museum": 4,
      "image": "/src/images/pinturas/water-lilies.jpg"
    }
  ];

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    
    redis.on("connect", function() {
      console.log("You are now connected");
    });
    
	 const n = pinturas.length;
		
   for(let i = 1; i<=n; i++)
     await redis.set('pintura_'+i,JSON.stringify(pinturas[i-1]));
	 
   await redis.set('pintura_N',n);
    
   return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
