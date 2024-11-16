"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

const museos = [
  {
    "id": 1,
    "slug": "british-museum",
    "name": "Museo Británico",
    "location": "Londres, Inglaterra",
    "established": "1753",
    "description": "El Museo Británico alberga una colección de arte y artefactos de todo el mundo, que abarca más de 2 millones de años de historia.",
    "notableExhibits": "Piedra de Rosetta",
    "image": "/src/images/museos/british-museum.jpg",
    "artists": [
      1
    ]
  },
  {
    "id": 2,
    "slug": "vatican-museums",
    "name": "Museos Vaticanos",
    "location": "Ciudad del Vaticano",
    "established": "1506",
    "description": "Los Museos Vaticanos son un grupo de museos de arte y cristianos situados dentro de la Ciudad del Vaticano.",
    "notableExhibits": "Techo de la Capilla Sixtina",
    "image": "/src/images/museos/vatican-museums.jpg",
    "artists": [
      2
    ]
  },
  {
    "id": 3,
    "slug": "museum-of-modern-art",
    "name": "Museo de Arte Moderno",
    "location": "Nueva York, EE.UU.",
    "established": "1929",
    "description": "El Museo de Arte Moderno es conocido por su influyente colección de arte moderno y obras desde el siglo XIX hasta la actualidad.",
    "notableExhibits": "La noche estrellada",
    "image": "/src/images/museos/museum-of-modern-art.jpg",
    "artists": [
      2,
      3
    ]
  },
  {
    "id": 4,
    "slug": "state-hermitage-museum",
    "name": "Museo Estatal del Hermitage",
    "location": "San Petersburgo, Rusia",
    "established": "1764",
    "description": "El Museo Estatal del Hermitage es uno de los museos más grandes y antiguos del mundo, ubicado en San Petersburgo.",
    "notableExhibits": "Colección del Palacio de Invierno",
    "image": "/src/images/museos/state-hermitage-museum.jpg",
    "artists": []
  },
  {
    "id": 5,
    "slug": "nyc-historical-society",
    "name": "Sociedad Histórica de Nueva York",
    "location": "Nueva York, EE.UU.",
    "established": "1804",
    "description": "La Sociedad Histórica de Nueva York es un museo que muestra la historia estadounidense a través del arte, artefactos y documentos.",
    "notableExhibits": "Cuarteles de Washington",
    "image": "/src/images/museos/nyc-historical-society.jpg",
    "artists": []
  },
  {
    "id": 6,
    "slug": "louvre-museum",
    "name": "Museo del Louvre",
    "location": "París, Francia",
    "established": "1793",
    "description": "El Louvre es el museo de arte más grande del mundo y un monumento histórico en París, conocido por albergar la Mona Lisa.",
    "notableExhibits": "Mona Lisa",
    "image": "/src/images/museos/louvre-museum.jpg",
    "artists": [
      1
    ]
  },
  {
    "id": 7,
    "slug": "tate-modern",
    "name": "Tate Modern",
    "location": "Londres, Inglaterra",
    "established": "2000",
    "description": "El Tate Modern es una galería de arte moderno en Londres y uno de los museos de arte moderno y contemporáneo más grandes del mundo.",
    "notableExhibits": "La Fuente de Marcel Duchamp",
    "image": "/src/images/museos/tate-modern.jpg",
    "artists": []
  },
  {
    "id": 8,
    "slug": "national-gallery",
    "name": "Galería Nacional",
    "location": "Londres, Inglaterra",
    "established": "1824",
    "description": "La Galería Nacional alberga una rica colección de pinturas de Europa Occidental, desde el siglo XIII hasta el XIX.",
    "notableExhibits": "El retrato de Arnolfini",
    "image": "/src/images/museos/national-gallery.jpeg",
    "artists": []
  },
  {
    "id": 9,
    "slug": "metropolitan-museum-of-art",
    "name": "Museo Metropolitano de Arte",
    "location": "Nueva York, EE.UU.",
    "established": "1870",
    "description": "El Met presenta más de 5,000 años de arte de cada rincón del mundo y es uno de los museos más grandes y prestigiosos del mundo.",
    "notableExhibits": "Washington cruzando el Delaware",
    "image": "/src/images/museos/metropolitan-museum-of-art.jpg",
    "artists": []
  },
  {
    "id": 10,
    "slug": "prado-museum",
    "name": "Museo del Prado",
    "location": "Madrid, España",
    "established": "1819",
    "description": "El Museo del Prado es el principal museo de arte nacional de España, que muestra arte europeo del siglo XII al siglo XX.",
    "notableExhibits": "Las Meninas",
    "image": "/src/images/museos/prado-museum.jpg",
    "artists": []
  },
  {
    "id": 11,
    "slug": "uffizi-gallery",
    "name": "Galería Uffizi",
    "location": "Florencia, Italia",
    "established": "1581",
    "description": "La Galería Uffizi es uno de los museos de arte más famosos de Italia y alberga una colección de obras maestras del Renacimiento.",
    "notableExhibits": "El nacimiento de Venus",
    "image": "/src/images/museos/uffizi-gallery.jpg",
    "artists": []
  },
  {
    "id": 12,
    "slug": "art-institute-of-chicago",
    "name": "Instituto de Arte de Chicago",
    "location": "Chicago, EE.UU.",
    "established": "1879",
    "description": "El Instituto de Arte de Chicago es conocido por sus esfuerzos curatoriales y su colección, que incluye obras famosas como Gótico Americano.",
    "notableExhibits": "Gótico Americano",
    "image": "/src/images/museos/art-institute-of-chicago.jpg",
    "artists": []
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
    
	 const n = museos.length;
		
   for(let i = 1; i<=n; i++)
     await redis.set('museo_'+i,JSON.stringify(museos[i-1]));
	 
   await redis.set('museo_N',n);
    
   return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
