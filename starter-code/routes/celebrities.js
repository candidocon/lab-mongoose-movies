const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.js");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then(allTheCelebrities => {
      res.render("celebrities/index", { celebrities: allTheCelebrities });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});
router.get("/celebrities/:idOfCeleb", (req, res, next) => {
  Celebrity.findById(req.params.idOfCeleb)
    .then(oneCeleb => {
      res.render("celebrities/show", { celebrity: oneCeleb });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});
router.get("/celebrities/new/add-new", (req, res, next) => {
  res.render("celebrities/new");
});

router.post("/celebrities/new/add-new", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  // this is like saying
  // const title = req.body.title;
  // const descrtiption = req.body.descrition;
  // etc.
  let newCeleb = { name, occupation, catchPhrase };

  Celebrity.create(newCeleb)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(err => {
      next(err);
    });
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(err => {
      next(err);
    });
});

router.get("/celebrities/:celebId/edit", (req, res, next) => {
  Celebrity.findById(req.params.celebId)
    .then(celebrity => {
      res.render("celebrities/edit", { celebrity });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/celebrities/:celebId/edit", (req, res, next) => {
  let theId = req.params.celebId;
  Celebrity.findByIdAndUpdate(theId, req.body)
    .then(() => {
      res.redirect("/celebrities/" + theId);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
