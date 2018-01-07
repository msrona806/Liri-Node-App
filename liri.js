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

//var to determine what user wants to do, user input goes here
var command = process.argv[2];
var input = "";


//FUNCTIONS

//------------Twitter----------------
function myTweets() {
  
    //grabs twitter information, shows the 
    var params = {screen_name: 'sharonay2015', count: 10};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    
    // If there was an error reading the file, log it
      if (!error) {   
      }

      //log tweets and details on when it was tweeted
      for (i=0; i < tweets.length; i++){
        console.log("**********");
        console.log(tweets[i].text),
        console.log('created at: ' + tweets[i].created_at);
      }
    });  
  }

//------------Spotify----------
function spotifyThisSong() {

  //code to grab information from spotify
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    
    // If there was an error reading the file, we log it and return immediately
    if (err) {
      return console.log('Error occurred: ' + err);
    }

      // logs 
       console.log("* Artist(s): " + data.tracks.items[0].album.artists[0].name); 
       console.log("* Song Title: " + data.tracks.items[0].name);
       console.log("* Album Title: " + data.tracks.items[0].album.name);
       console.log("* Track Preview: " + data.tracks.items[0].href);
    });
}

function movieThis() {
  // console.log('movieThis')
  if (movieName === undefined){
    movieName = "Mr Nobody";
  }
    
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
 
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var jsonData = JSON.parse(body); 
      var movieData = 

        "* Title: " + jsonData.Title+"\n"+ 
        "* Year: " + jsonData.Year+"\n"+
            "* Imdb Rating: " + jsonData.imdbRating+"\n"+
            "* Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value+"\n"+
        "* Country: " + jsonData.Country+"\n"+
        "* Language: " + jsonData.Language+"\n"+
        "* Plot: " + jsonData.Plot+"\n"+
        "Actors: " + jsonData.Actors+"\n";            
        }
        console.log(movieData);
      });


//variable to store the arguments in an array
var nodeArgs = process.argv;

//variable to create an empty array for holding the movie name
var movieName = "";

for (var i = 2; i < nodeArgs.length; i++) {

  if ( i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
   
  else {
    movieThis += nodeArgs[i];
  }
}
}


// function doWhatItSays() {

//   fs.readFile(command, "utf8", function(err, data) {
//     // If there was an error reading the file, we log it and return immediately
//     if (err) {
//       return console.log(err);
//     }

//     fs.appendFile("random.txt", "Hello Kitty", function(err) {
  
//     console.log("doWhatItSays");
//   })
// })

// logic used to run functions, based on what command user types in
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



