const express = require('express');
const app = express();
const palindromeUnitRoutes = express.Router();

// Requiring PalindromeUnit model
let PalindromeUnit = require('../models/PalindromeUnit');

// Defining store route
palindromeUnitRoutes.route('/post').post(function (req, res) {
  let palindromeUnit = new PalindromeUnit(req.body);
  // Checking if string posted is a palindrome
  if (isPalindrome(palindromeUnit.palindrome)) {
    palindromeUnit.save()
    .then(result => {
      res.status(200).json({ success: true, message: 'Palindrome stored successfully' });
    })
    .catch(error => {
      res.status(400).send("Unable to save to database\n" + error);
    });
  } else {
    res.status(200).json({ success: false, message: 'Not a palindrome!'});
  }
});

// Function to check if a given string is a palindrome
function isPalindrome(string) {
  // Regular expression with unwanted characters
  var re = /[\W_]/g; // Equivalent alternative: /[^A-Za-z0-9]/g;
  
  // Lowercasing the string and removing unwanted characters
  var processedStr = string.toLowerCase().replace(re, '');
     
  // Reversing the string by chaining methods
  var reverseStr = processedStr.split('').reverse().join(''); 
   
  // Checking if reverseStr is equal to processedStr
  return reverseStr === processedStr;
}

// Defining get data route
palindromeUnitRoutes.route('/get').get(function (req, res) {
  PalindromeUnit.find(function (err, palindromeUnits) {
    if (err) {
      console.log(err);
    }
    else {
      // Returning ten most recent elements
      res.json(palindromeUnits.reverse().slice(0, 10));
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
          res.status(400).send("Unable to update database\n" + err);
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