var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

/* GET home page. */
router.get('/', function(req, res, next) {
   var db = new sqlite3.Database('dnd.db');

   db.serialize(function() {
      db.all("SELECT name FROM characters", function(err, rows) {
         res.render('index', {
            title: "Super Dungeons and Dragbois 2k18",
            characters: rows
         });
      });
   });

   db.close();
});

module.exports = router;
