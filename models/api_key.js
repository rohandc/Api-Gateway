//Nasa API Key
const express = require('express');
const requestify = require('requestify');
router = express.Router();




exports.nasa = function () {

    const nasa_url = "https://api.nasa.gov/planetary/apod?api_key=d7n1gyMnhxslwSuN7P9H5OWXsFyZ8HlxjkSjEDjs";
    //return nasa_url;

    return requestify.get(nasa_url);
}


//Twitter Api


exports.twitter = function () {

    const Twitter = require('twitter');

    const client = new Twitter({
        consumer_key:'mXzXPPjrWVRasOzytFLgRINkD',
        consumer_secret:'syVdqE3EhZYgCFsWXIolsV65popMbvh9YYFohWR57W5W27zmSz',
        access_token_key: '403960700-LeUPQTxWf6A6XPiV8TdMNMeARC1Sj8oOz8TSBdCi',
        access_token_secret: 'boDpqOqbhZIHgMdU5JKfQWdJDP10EEe5ba12cExh6BAT6'
    });
   return client.get('statuses/user_timeline',{screen_name: ' Craw1_'});
}

//OMDBAPI Api
exports.omdbapi = function (title) {
    const url = 'http://www.omdbapi.com/?s=' + title;

    return requestify.get(url);
}


