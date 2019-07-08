const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity");

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

const fewCelebs = [
  {
    name: "Kevin lung",
    occupation: "Comedian",
    catchPhrase: "Say it with your pectorals!"
  },
  {
    name: "Duane the bulder Jhonson",
    occupation: "Wrestler",
    catchPhrase: "Can you smell what the bulder has in the oven?"
  },
  {
    name: "Vin Petrol",
    occupation: "Actor",
    catchPhrase: "Modelo time! with the FAMILY"
  }
];

Celebrity.create(fewCelebs)
  .then(() => {
    console.log("It worked");
  })
  .catch(() => {
    console.log("It didn't work");
  });
