const express = require('express');
const app = express();
const palindromeUnitRoutes = express.Router();

// Requiring PalindromeUnit model
let PalindromeUnit = require('../models/PalindromeUnit');

// Defining store route
palindromeUnitRoutes.route('/add').post(function (req, res) {
  let palindromeUnit = new PalindromeUnit(req.body);
  palindromeUnit.save()
    .then(game => {
      res.status(200).json({ 'palindromeUnit': 'PalindromeUnit added successfully' });
    })
    .catch(err => {
      res.status(400).send("Unable to save to database\n" + err);
    });
});

// Defining get data route
palindromeUnitRoutes.route('/').get(function (req, res) {
  PalindromeUnit.find(function (err, palindromeUnits) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(palindromeUnits);
    }
  });
});

// Defining edit route
palindromeUnitRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  PalindromeUnit.findById(id, function (err, palindromeUnit) {
    res.json(palindromeUnit);
  });
});

//  Defining update route
palindromeUnitRoutes.route('/update/:id').post(function (req, res) {
  PalindromeUnit.findById(req.params.id, function (err, palindromeUnit) {
    if (!palindromeUnit)
      return next(new Error('Could not load document'));
    else {
      palindromeUnit.term = req.body.term;
      palindromeUnit.date = req.body.date;
      palindromeUnit.count = req.body.term;

      palindromeUnit.save().then(palindromeUnit => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("Unable to update database");
        });
    }
  });
});

// Defined delete | remove | destroy route
palindromeUnitRoutes.route('/delete/:id').get(function (req, res) {
  PalindromeUnit.findByIdAndRemove({ _id: req.params.id }, function (err, palindromeUnit) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = palindromeUnitRoutes;