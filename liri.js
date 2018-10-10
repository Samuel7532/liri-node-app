var axios = require("axios");
var Spotify = require("node-spotify-api");
require("dotenv").config();
var keys = require("./keys.js")
var spotify = new Spotify(keys.spotify);


// // 8. Add the code required to import the `keys.js` file and store it in a variable.
  

// // * You should then be able to access your keys information like so

  
//   var spotify = new Spotify(keys.spotify);
  

// 9. Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`

// ### What Each Command Should Do

// 1. `node liri.js concert-this <artist/band name here>`

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

//    * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

//    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

//    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

//    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

//    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.


// Spotify Section

// var keys = require("./keys.js");


// var songName = "";

// for (var i = 2; i < process.argv.length; i++) {
//   if (i > 2 && i < process.argv.length) {
//     songName = songName + " " + process.argv[i];
//   }
//   else {
//     songName += process.argv[i];
//   }
// }

// console.log(response)

// movie section


// Create an empty variable for holding the movie name


// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
function userInput(){
  var name = "";
  for (var i = 2; i < process.argv.length; i++) {
    if (i > 2 && i < process.argv.length) {
      name = (name + " " + process.argv[i]).trim();
    }
    else {
      action = process.argv[i];
    }
  }
  runCommand(action, name);
}
function getMovies(name){

  if (name == ""){
    name = "mr.nobody";
  }

// Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";
    
    axios.get(queryUrl).then(
      function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("Rated: " + response.data.Rated);
        console.log("IMDB Rating: " + response.data.imdbRating);
        if (response.data.Ratings[1]){
          console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value)
        }
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("Box Office: " + response.data.BoxOffice);
      }
    );
}






function getBands(){
// Then run a request to the OMDB API with the movie specified
var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Band);
   
  }
);
}
function getSongs(name){

  if (!name){
    name = "redbone";
  }

  spotify.search(
    {type: "track",
    query: name
    },
    function(error, response){
      if (error){
        console.log(error);
        return;
      }
      var songs = response.tracks.items;
      for (var i = 0; i < songs.length; i++){
        console.log("Song Name: " + songs[i].name);
        var artistArray = songs[i].artists;
        var artist = [];
        for (var j = 0; j < artistArray.length; j++){
          artist.push(artistArray[j].name);
        }
        console.log("artist: " + artist.join(", "));
        console.log("preview: " + songs[i].preview_url);
        console.log("Album Name: " + songs[i].album.name);

        console.log("-----------------");
      }
    }
  )
}

function getRandom(){
  console.log("inside Random");
}

function runCommand(action, name){
  switch (action){
    case "concert-this":
      getBands(name);
      break;
    case "spotify-this-song":
      getSongs(name);
      break;
    case "movie-this":
      getMovies(name);
      break;
    case "do-what-it-says":
      getRandom();
      break;
    default:
      console.log("please choose valid command");
  }
}
userInput();

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and my-tweets

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.

// ### Reminder: Submission on BCS

// * Please submit the link to the Github Repository!

