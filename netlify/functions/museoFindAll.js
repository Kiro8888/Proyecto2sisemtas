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
   let n = await redis.get('museo_N');
	  
   for(let i = 1; i<=n; i++)
     keys.push('museo_'+i);

   const museos = await redis.mget(keys);
	  
   museos.forEach(toJson);
		
    return { statusCode: 200, headers, body: JSON.stringify(museos)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
