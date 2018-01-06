require("dotenv").config(); //pulls in .env file

//Goes into locked files to the keys needed
//pulls in keys.js file info
var keys = require("./keys"); 

//node packages required
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

//FUNCTIONS
function myTweets() {
  var params = {screen_name: 'sharonay2015', count: 10};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      // console.log(tweets);
    }
    for (i=0; i < tweets.length; i++){
      console.log(tweets[i].text);
    }
  });
  
}
function spotifyThisSong() {
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
       console.log(data); 
    });

  console.log("spotifyThisSong");
}
function movieThis() {
  console.log("movieThis");
}
function doWhatItSays() {
  console.log("doWhatItSays");
}

//var to determine what user wants to do, user input goes hear
var command = process.argv[2];

if (command === "my-tweets") {
 
  myTweets();
}
else if (command === "spotify-this-song") {
  spotifyThisSong ();
}
else if (command === "movie-this") {
  movieThis();
}
else if (command === "do-what-it-says") {
  doWhatItSays();
}
else { 
  console.log("WRONG!!! Check your spelling!")
}


