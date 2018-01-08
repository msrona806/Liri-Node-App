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

//variables to store input
var nodeArg = process.argv;
var command = process.argv[2];

//var to determine what user wants to do, user input goes here
var input = "";
var song = process.argv[3];

//holds multiple word titles
for (var i = 3; i < nodeArg.length; i++) {
  if (i>3 && i<nodeArg.length) {
    input = input + "+" + nodeArg[i];
  } else {
    input = input + nodeArg[i];
  }
}

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
  spotify.search({ type: 'track', query: song || 'dancing in the moonlight'}, function(err, data) {
    
    // If there was an error reading the file, we log it and return immediately
    if (err) {
      return console.log('Error occurred: ' + err);
    }

      //code for user to input song

      // logs 
       console.log("* Artist(s): " + data.tracks.items[0].album.artists[0].name); 
       console.log("* Song Title: " + data.tracks.items[0].name);
       console.log("* Album Title: " + data.tracks.items[0].album.name);
       console.log("* Track Preview: " + data.tracks.items[0].href);
    });
}

//-----------OMDB----------
function movieThis() {

  // console.log('movieThis')
  if (input === undefined){
    input = "Mr Nobody";
  }
    
  var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
 
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
    }

  // ----------Do What It Says ----------
  function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(err, data) {
      //If there was an error reading the file, we log it and return immediately
      if (err) {
        return console.log(err);
      }
      //add text to random.txt file
      fs.appendFile("random.txt", "Hello Kitty", function(err) {
    
      console.log("doWhatItSays");
      })
    })
  }

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
//log directions for user to enter a command if none entered
else { 
  console.log(">>>>>>>>>You have to enter one of the following commands: my-tweets, spotify-this-song, movie-this, do-what-it-says<<<<<<<");
}



