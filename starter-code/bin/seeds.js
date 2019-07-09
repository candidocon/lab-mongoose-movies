const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity");
const Movie = require("../models/movie");

mongoose
  .connect("mongodb://localhost/mongoose-movies", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// const fewCelebs = [
//   {
//     name: "Kevin lung",
//     occupation: "Comedian",
//     catchPhrase: "Say it with your pectorals!"
//   },
//   {
//     name: "Duane the bulder Jhonson",
//     occupation: "Wrestler",
//     catchPhrase: "Can you smell what the bulder has in the oven?"
//   },
//   {
//     name: "Vin Petrol",
//     occupation: "Actor",
//     catchPhrase: "Modelo time! with the FAMILY"
//   }
// ];

// Celebrity.create(fewCelebs)
//   .then(() => {
//     console.log("It worked");
//   })
//   .catch(() => {
//     console.log("It didn't work");
//   });

const fewMovies = [
  {
    title: "fat and furrious",
    genre: "action",
    plot: "fat lazy cats have to race each other for lasagna"
  },
  {
    title: "jumanji",
    genre: "adventure",
    plot: "something something animals and trapped IDK"
  },
  {
    title: "secret Service",
    genre: "action/comedy",
    plot: "the big guy is funny we swear"
  }
];

Movie.create(fewMovies)
  .then(() => {
    console.log("It worked");
  })
  .catch(() => {
    console.log("It didn't work");
  });
