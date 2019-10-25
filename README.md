# Liri-node-app

# what this project hopes to solve:
    It allows you to search Spotify for songs, BandsInTown for concerts,
    and OMDB for movies, all in one command-line application. 

# How the code is set up:
    I have a hidden file called .gitignore which ignores the files
    that I reference within it so that I don't an excessive amount
    of files that are uploaded to gitHub. I have a keys.js file that
    holds all my API keys, and they reference my .env file which 
    actually holds my keys. I exported them from my keys.js file and
    imported them to my liri.js file to make them available for my 
    axios calls. I made sure to download all my dependencies using NPM
    packages, and I imported them using the require("") function. I also set up individual functions for each command the user puts in. I made sure to parse the data from the axios response to grab the relevant data. Then I set up a switch statment which references user inputs so that, depending on the user input, the results you're searching for will correspond. 

# How to use the app:
    * Open up gitbash (for windows) or terminal (for mac)
    * Navigate to the directory containing liri.js. 
    * Your first two commands will always be "node" and    "liri.js" and your commands will always be separated by a space. 
    * If you want to look up a song, your third command will be spotify-this-song, and your fourth command will be the song name. Then press "enter."
        *If the song name contains multiple words, they must be wrapped in quotes.
        *The result will return the artist's name, and the corresponding album name and song name. It will also display a preview URL that you can click (while holding down command button) and it will open up in a new tab in your browser and immediately start playing a 30 second clip.
    * If you want to look up a movie, your third command will be movie-this and your fourth command will be the movie name. 
        * If the movie name contains multiple words, they must be wrapped in quotes.
        * The result will return the movie title, release year, IMDB rating, Rotten Tomatoes Rating, Country where it was produced, a summary of the plot, and a list of the actors.
    * If you want to look up a band, your third command will be concert-this and your fourth command will be the name of a band.
        * If the band name contains multiple words, they must be wrapped in quotes.
        * The result will return a long list of events from the band, whose information contains the venue name, the event location, and the event date.
    * If no commands come to mind but you want to see the program run anyway, I have included a file called random.txt which contains both a command and a value for the command. So feel free to use the info from the file to run the program. You can do this by using do-what-it-says as your third argument and leaving your fourth argument blank. 

# Video of my app in action:
https://drive.google.com/file/d/1xTf5-2iwF4mqMEgHOqCt8fxH9H762a3k/view


# List of technologies used:
    * Javascript
    * Node.js
    * Moment.js
    * Axios
    * API's-
        * BandsInTown
        * Spotify
        * OMDB
    * NPM packages 

# My role in this development:
I completed this project by myself with minimal assistance by referencing learning material and using google to get unstuck when I encountered a problem. 

