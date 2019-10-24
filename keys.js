// console.log('this is loaded');

// exports.spotify = {
//   id: process.env.SPOTIFY_ID,
//   secret: process.env.SPOTIFY_SECRET
// };

// exports.BandsInTown = {
//   key: process.env.BandsInTownID
// }

module.exports= {
  spotify: {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  },
  BandsInTown: {
    key: process.env.BandsInTownID
  },
  omdb: {
    key: process.env.omdbID
  }
  // ,
  // random: {
  //   fileCommand: process.txt
  // }
}
