var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

/* GET users listing. */
router.get('/', function(req, res, next) {
   var db = new sqlite3.Database('dnd.db');

   res.render('create', {
      inputLabels: ["name", "class", "race"]
   });

});

module.exports = router;
