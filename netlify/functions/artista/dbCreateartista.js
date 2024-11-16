"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

const artistas = [
  {
    "id": 1,
    "slug": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "birthYear": "1452",
    "nationality": "Italiano",
    "biography": "Un polímata italiano del Renacimiento, cuyas áreas de interés incluían la invención, la pintura, la escultura, la arquitectura, la ciencia, la música y las matemáticas.",
    "famousWorks": [
      "Mona Lisa",
      "La Última Cena"
    ],
    "image": "/src/images/artista/leonardo-da-vinci.jpg",
    "paintings": [
      1,
      3
    ]
  },
  {
    "id": 2,
    "slug": "vincent-van-gogh",
    "name": "Vincent van Gogh",
    "birthYear": "1853",
    "nationality": "Neerlandés",
    "biography": "Un pintor postimpresionista neerlandés que está entre las figuras más famosas e influyentes en la historia del arte occidental.",
    "famousWorks": [
      "Noche Estrellada",
      "Los Girasoles"
    ],
    "image": "/src/images/artista/vincent-van-gogh.jpg",
    "paintings": [
      2,
      4,
      7,
      8
    ]
  },
  {
    "id": 3,
    "slug": "pablo-picasso",
    "name": "Pablo Picasso",
    "birthYear": "1881",
    "nationality": "Español",
    "biography": "Un pintor, escultor, grabador, ceramista y diseñador de teatro español. Picasso es considerado uno de los artistas más influyentes del siglo XX.",
    "famousWorks": [
      "Guernica",
      "La Mujer que Llora"
    ],
    "image": "/src/images/artista/pablo-picasso.jpg",
    "paintings": [
      5,
      7
    ]
  },
  {
    "id": 4,
    "slug": "claude-monet",
    "name": "Claude Monet",
    "birthYear": "1840",
    "nationality": "Francés",
    "biography": "Fundador de la pintura impresionista francesa, Monet fue el practicante más constante y prolífico de la filosofía del movimiento: expresar las percepciones de la naturaleza.",
    "famousWorks": [
      "Nenúfares",
      "Impresión, Sol Naciente"
    ],
    "image": "/src/images/artista/claude-monet.jpg",
    "paintings": [
      6,
      8
    ]
  },
  {
    "id": 5,
    "slug": "rembrandt-van-rijn",
    "name": "Rembrandt van Rijn",
    "birthYear": "1606",
    "nationality": "Neerlandés",
    "biography": "Pintor del Siglo de Oro neerlandés, Rembrandt es considerado uno de los más grandes artistas visuales en la historia del arte, y el más importante en la historia del arte neerlandés.",
    "famousWorks": [
      "La Ronda de Noche",
      "Autorretrato"
    ],
    "image": "/src/images/artista/rembrandt-van-rijn.jpg",
    "paintings": [
      8
    ]
  },
  {
    "id": 6,
    "slug": "frida-kahlo",
    "name": "Frida Kahlo",
    "birthYear": "1907",
    "nationality": "Mexicana",
    "biography": "Una pintora mexicana conocida por sus numerosos retratos, autorretratos y obras inspiradas en la naturaleza y los artefactos de México.",
    "famousWorks": [
      "Las Dos Fridas",
      "Autorretrato con Collar de Espinas"
    ],
    "image": "/src/images/artista/frida-kahlo.jpg",
    "paintings": []
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
    
	 const n = artistas.length;
		
   for(let i = 1; i<=n; i++)
     await redis.set('artista_'+i,JSON.stringify(artistas[i-1]));
	 
   await redis.set('artista_N',n);
    
   return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
