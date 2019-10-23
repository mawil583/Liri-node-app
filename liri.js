require("dotenv").config();

var keys = require("./keys.js")

var axios = require("axios");
console.log(keys);
var moment = require("moment");

console.log(spotify);

// the "Spotify on line 11 should match the new "Spotify" on line 12
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
console.log(Spotify)

let command = process.argv[2];
let value = process.argv[3];

switch (command) {
    case 'spotify-this-song':
        spotifySearch(value);
        break;
    case 'concert-this':
        bandsSearch(value);
        break;
    case 'movie-this':
        omdbSearch(value);
        break;
}

function spotifySearch(song) {

    spotify.search({ type: 'track', query: song || "the sign" }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data); 
        // console.log("items at index 0 = " + JSON.stringify(data.tracks.items[0], null, 3));
        // console.log(data.tracks.items[0].album.artists[0].name);
        // let artistsWithSongName = [];
        // i < data.tracks.items[i].album.artists.length
        console.log("artist name: " + data.tracks.items[0].artists[0].name);
        // for (let i = 0; i < data.tracks.items.length; i++) {
            // console.log("artist name at index [i]: " + data.tracks.items[i].album.artists[0].name);
            // console.log("artist name at index [i] stringified: " + JSON.stringify(data.tracks.items[i].album.artists[0].name));

            // artistsWithSongName.push(data.tracks.items[i].album.artists[0].name)
            // console.log("after pushing to artists array " + artistsWithSongName);
            
            // if (!artistsWithSongName.includes(data.tracks.items[i].album.artists[0].name)) {}
        //     console.log(`artist with songtitle ${song}: ${data.tracks.items[i].album.artists[0].name}`)
            
        // }

        // console.log(`artists with that song title: ${JSON.stringify(data.tracks.items[0].album.artists, null, 5)}`)
        // console.log(data.tracks.items[0].album.artists[4].name[0])

        if (song == null) {
            console.log("song is null");
            console.log("since the query was empty I'm going to return the song 'the sign' by " + data.tracks.items[4].album.artists[0].name);
        }
        // console.log(data.tracks.items[1].album.artists.name);
    });
}


function bandsSearch(bandName) { // bandname = michael jackson
    let BandsInTownID = keys.BandsInTown;
    let bandsQueryUrl = `https://rest.bandsintown.com/artists/${bandName}/events?app_id=${BandsInTownID}`;
    //"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"; 
    axios.get(bandsQueryUrl).then(
        function(response, err){
            if (err) throw err;
            console.log(response.data)

            //console.log(moment(response.data.datetime).format("DD MM YYYY"));
    })
};

function omdbSearch(movieName) { // bandname = michael jackson
    let omdbID = keys.omdb;
    //let bandsQueryUrl = `https://rest.bandsintown.com/artists/${bandName}/events?app_id=${BandsInTownID}`;
    //let omdbQueryUrl = `http://www.omdbapi.com/?t=${movieName}&apikey=${omdbID}`;
    let omdbQueryUrl =`http://www.omdbapi.com/?t=${movieName}&apikey=${omdbID}`;
    // axios.get(`http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=477e5877`)
    

    //"http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    
    //"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"; 
    axios.get(omdbQueryUrl).then(
        function(response){
            // if (err) throw err;
            console.log(response.data)

            //console.log(moment(response.data.datetime).format("DD MM YYYY"));
    })
    .catch(function(err) {
        console.log(err);
    })
}