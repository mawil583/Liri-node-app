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
    }
};
switchStatement();

function appendEntries(userInput) {
    fs.appendFile("log.txt", userInput, function (err) {
        if (err) throw err;
    })
}

function spotifySearch(song) {
    spotify.search({ type: 'track', query: song || "the sign" }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        };
        if (song == null) {
            console.log("You did not input a song name.");
            console.log(`Here is an example of the result you would have gotten if you typed "node liri.js spotify-this-song 'the sign'": 
                artist name: ${data.tracks.items[4].album.artists[0].name} ${data.tracks.items[4].artists[0].name} album name: ${data.tracks.items[4].album.name}`);
            // spotifyDefaultData();
            console.log("Artist name: " + data.tracks.items[4].artists[0].name);
            console.log("Album name: " + data.tracks.items[4].album.name);
            console.log("Song name: " + data.tracks.items[4].name);
            console.log("Preview URL: " + data.tracks.items[4].preview_url);
        } else {
            // spotifyData();
            console.log("Artist name: " + data.tracks.items[0].artists[0].name);
            console.log("Album name: " + data.tracks.items[0].album.name);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
        }
        // console.log("Artist name: " + data.tracks.items[0].artists[0].name);
        // console.log("Album name: " + data.tracks.items[0].album.name);
        // console.log("Song name: " + data.tracks.items[0].name);
        // console.log("Preview URL: " + data.tracks.items[0].preview_url);
    });
};

// function spotifyData() {
//     console.log("Artist name: " + data.tracks.items[0].artists[0].name);
//     console.log("Album name: " + data.tracks.items[0].album.name);
//     console.log("Song name: " + data.tracks.items[0].name);
//     console.log("Preview URL: " + data.tracks.items[0].preview_url);
// }

// function spotifyDefaultData() {
//     console.log("Artist name: " + data.tracks.items[4].artists[0].name);
//     console.log("Album name: " + data.tracks.items[4].album.name);
//     console.log("Song name: " + data.tracks.items[4].name);
//     console.log("Preview URL: " + data.tracks.items[4].preview_url);
// }

function bandsSearch(bandName) { // bandname = michael jackson
    let BandsInTownID = keys.BandsInTown;
    let bandsQueryUrl = `https://rest.bandsintown.com/artists/${bandName}/events?app_id=${BandsInTownID}`;
    axios.get(bandsQueryUrl).then(
        function (response, err) {
            if (err) throw err;
            for (let i = 0; i < response.data.length; i++) {
                // name of venue
                console.log(`Venue Name: ${response.data[i].venue.name}`);
                // venue location (city, region, country)
                console.log(`Location: ${response.data[i].venue.city} ` + `${response.data[i].venue.region}, ` + response.data[i].venue.country);
                // date of event as MM/DD/YYYY
                console.log(`Event Date: ${moment(response.data[i].datetime).format("MM/DD/YYYY")}`);
            };
        })
};

function omdbSearch(movieName) {
    let omdbID = keys.omdb.key;
    // let omdbID = keys.omdb; doesn't work
    console.log(omdbID);
    if (movieName == null) {
        movieName = "Mr. Nobody";
    }
    let omdbQueryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=${omdbID}`;
    axios.get(omdbQueryUrl)
        .then(function (response, err) {
            if (err) throw err;
            // movie title
            console.log("Movie Title: " + response.data.Title);
            // release year
            console.log("Release Year: " + response.data.Released);
            // IMDB Rating
            console.log("IMDB rating: " + response.data.Ratings[0].Value);
            // rotten tomatoes rating
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            // country where movie was produced
            console.log("Country where movie was produced: " + response.data.Country);
            // language of the movie
            console.log("Language of original movie: " + response.data.Language);
            // plot
            console.log("Plot: " + response.data.Plot);
            // actors
            console.log("Actors: " + response.data.Actors);
        })
};

function readRandom() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        };
        let randomArr = data.split(", ");
        command = randomArr[0];
        console.log(command)
        value = randomArr[1];
        console.log(value);
        switchStatement();
    });
};