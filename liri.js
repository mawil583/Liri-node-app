require("dotenv").config();

var keys = require("./keys.js")
// var random = require("./random.txt");

var axios = require("axios");
// console.log(keys);
var moment = require("moment");

let fs = require("fs");

// console.log(spotify);

// the "Spotify on line 11 should match the new "Spotify" on line 12
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// console.log(Spotify)

let command = process.argv[2];
let value = process.argv[3];

function switchStatement() {

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
        case 'do-what-it-says':
            fs.readFile("random.txt", "utf8", function (err, data) {
                if (err) {
                    return console.log(err);
                };
                let randomArr = data.split(", ")
                command = randomArr[0];
                value = randomArr[1];
                switchStatement();
            })
            //     let randomFileContent = random;
            //     // command = random[0];
            //     // value = random[1];
            //     console.log(randomFileContent);
            //     // console.log(command);
            //     // console.log(value);
            //     // spotifySearch(randomFileContent);
            break;
        default:
            console.log("Invalid Input. For proper functioning, enter 'node liri.js ' into the command line and then a command from the switch statment.");
    }
}
switchStatement();

function spotifySearch(song) {

    spotify.search({ type: 'track', query: song || "the sign" }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data); 
        // console.log("items at index 0 = " + JSON.stringify(data.tracks.items[0], null, 3));
        // console.log(data.tracks.items[0].album.artists[0].name);
        // let artistsWithSongName = [];
        // i < data.tracks.items[i].album.artists.length
        // console.log(data.tracks)
        console.log("Artist name: " + data.tracks.items[0].artists[0].name);
        console.log("Album name: " + data.tracks.items[0].album.name);
        console.log("Song name: " + data.tracks.items[0].name)
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
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
    console.log(BandsInTownID);
    let bandsQueryUrl = `https://rest.bandsintown.com/artists/${bandName}/events?app_id=${BandsInTownID}`;
    //"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"; 

    axios.get(bandsQueryUrl).then(
        function (response, err) {
            if (err) throw err;
            // console.log(response.data)
            // console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                // name of venue
                console.log(`Venue Name: ${response.data[i].venue.name}`);
                // venue location (city, region, country)
                console.log(`Location: ${response.data[i].venue.city} ` + `${response.data[i].venue.region}, ` + response.data[i].venue.country);
                // date of event as MM/DD/YYYY
                console.log(`Event Date: ${moment(response.data.datetime).format("MM/DD/YYYY")}`);
            }
        })
};

function omdbSearch(movieName) { // bandname = michael jackson
    let omdbID = keys.omdb.key;
    //let bandsQueryUrl = `https://rest.bandsintown.com/artists/${bandName}/events?app_id=${BandsInTownID}`;
    //let omdbQueryUrl = `http://www.omdbapi.com/?t=${movieName}&apikey=${omdbID}`;
    console.log(omdbID);
    if (movieName == null) {
        movieName = "Mr. Nobody";
    }

    let omdbQueryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=${omdbID}`;
    // aef99ca1


    // this one works
    // let omdbQueryUrl =`http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;
    // axios.get(`http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=477e5877`)


    //"http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    //"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"; 
    axios.get(omdbQueryUrl)
        .then(function (response) {
            // if (err) throw err;
            // console.log(response.data)


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

            //console.log(moment(response.data.datetime).format("DD MM YYYY"));
        })
        .catch(function (err) {
            console.log(err);
        });
};