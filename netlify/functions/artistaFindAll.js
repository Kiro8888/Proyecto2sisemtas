"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    
    redis.on("connect", function() {
      console.log("You are now connected");
    });
    
   let keys = [];
   let n = await redis.get('artista_N');
	  
   for(let i = 1; i<=n; i++)
     keys.push('artista_'+i);

   const artistas = await redis.mget(keys);
	  
   artistas.forEach(toJson);
		
    return { statusCode: 200, headers, body: JSON.stringify(artistas)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
