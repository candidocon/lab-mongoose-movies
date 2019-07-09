const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.js");
const Celebrity = require("../models/Celebrity.js");

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render("movies/index", { movies });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.get("/movies/:movieId", (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then(oneMovie => {
      Celebrity.findById(oneMovie.actor).then(oneCeleb => {
        res.render("movies/show", { movie: oneMovie, movieActor: oneCeleb });
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});
router.get("/movies/new/add-new", (req, res, next) => {
  Celebrity.find()
    .then(allTheCelebrities => {
      res.render("movies/new", { celebrities: allTheCelebrities });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.post("/movies/new/add-new", (req, res, next) => {
  // const { title, genre, plot, actor } = req.body;
  // let newMovie = { title: title, genre: genre, plot: plot, actor: actor };

  Movie.create(req.body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(err => {
      next(err);
    });
});

router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(err => {
      next(err);
    });
});
router.get("/movies/:movieId/edit", (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then(movie => {
      Celebrity.find()
        .then(allTheCelebrities => {
          allTheCelebrities.forEach(celeb => {
            if (celeb.id == movie.actor) {
              celeb.selected = true;
            }
          });
          res.render("movies/edit", {
            movie: movie,
            celebrities: allTheCelebrities
          });
        })
        .catch(err => {
          console.log(err);
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/movies/:movieId/edit", (req, res, next) => {
  let theId = req.params.movieId;
  // const { title, genre, plot, actor } = req.body;
  // let newMovie = { title: title, genre: genre, plot: plot, actor: actor };
  Movie.findByIdAndUpdate(theId, req.body)
    .then(() => {
      res.redirect("/movies/" + theId);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
