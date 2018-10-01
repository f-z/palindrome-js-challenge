const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let PalindromeUnit = new Schema({
  palindrome: {
    type: String
  },
  date: {
    type: Number
  }
}, {
    collection: 'palindromeunits'
  });

module.exports = mongoose.model('PalindromeUnit', PalindromeUnit);
