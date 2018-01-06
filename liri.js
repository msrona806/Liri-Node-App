require("dotenv").config(); //pulls in .env file

//Goes into locked files to the keys needed
var keys = require("./keys"); //pulls in keys.js file info
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//FUNCTIONS
function myTweets() {
  console.log(myTweets);
}
function spotifyThisSong() {
  console.log(spotifyThisSong);
}
function movieThis() {
  console.log(movieThis);
}
function doWhatItSays() {
  console.log(doWhatItSays);
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
else if (command === "do-what-it says") {
  doWhatItSays();
}


)