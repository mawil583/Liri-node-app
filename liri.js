// globals and dependencies
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
let fs = require("fs");
// Personal note: the "Spotify on line 8 should match the new "Spotify" on line 9
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
let command = process.argv[2];
let value = process.argv[3];
// userInput is used for when appending user entries to log.txt
// it contains both user arguments
let userInput = `Command: ${command}; ` +
`Value: ${value};
`;

function switchStatement() {
    switch (command) {
        case 'spotify-this-song':
            spotifySearch(value);
            appendEntries(userInput);
            break;
        case 'concert-this':
            bandsSearch(value);
            appendEntries(userInput);
            break;
        case 'movie-this':
            omdbSearch(value);
            appendEntries(userInput);
            break;
        case 'do-what-it-says':
            readRandom();
            appendEntries(userInput);
            break;
        default:
            appendEntries(userInput);
            console.log(`Invalid Input. For proper functioning, enter 'node liri.js '
                 into the command line and then a command from the switch statment.`);
    };
};
switchStatement();

function appendEntries(userInput) {
    fs.appendFile("log.txt", userInput, function (err) {
        if (err) throw err;
    });
}

function spotifySearch(song) {
    spotify.search({ type: 'track', query: song || "the sign" }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        };
        if (song == null) {
            console.log("You did not input a song name.");
            console.log(`Here is an example of the result you would have gotten if you typed "node liri.js spotify-this-song 'the sign'": `);
            console.log("Artist name: " + data.tracks.items[4].artists[0].name);
            console.log("Album name: " + data.tracks.items[4].album.name);
            console.log("Song name: " + data.tracks.items[4].name);
            console.log("Preview URL: " + data.tracks.items[4].preview_url);
        } else {
            console.log("Artist name: " + data.tracks.items[0].artists[0].name);
            console.log("Album name: " + data.tracks.items[0].album.name);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
        };
    });
};

function bandsSearch(bandName) { 
    let BandsInTownID = keys.BandsInTown.key;
    let bandsQueryUrl = `https://rest.bandsintown.com/artists/${bandName}/events?app_id=${BandsInTownID}`;
    axios.get(bandsQueryUrl).then(
        function (response, err) {
            if (err) throw err;
            for (let i = 0; i < response.data.length; i++) {
                console.log(`Venue Name: ${response.data[i].venue.name}`);
                console.log(`Location: ${response.data[i].venue.city} ` + `${response.data[i].venue.region}, ` + response.data[i].venue.country);
                console.log(`Event Date: ${moment(response.data[i].datetime).format("MM/DD/YYYY")}`);
            };
        });
};

function omdbSearch(movieName) {
    let omdbID = keys.omdb.key;
    if (movieName == null) {
        movieName = "Mr. Nobody";
    }
    let omdbQueryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=${omdbID}`;
    axios.get(omdbQueryUrl)
        .then(function (response, err) {
            if (err) throw err;
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Released);
            console.log("IMDB rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country where movie was produced: " + response.data.Country);
            console.log("Language of original movie: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        });
};

function readRandom() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        };
        let randomArr = data.split(", ");
        command = randomArr[0];
        value = randomArr[1];
        switchStatement();
    });
};