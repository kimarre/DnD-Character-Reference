var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

/* GET users listing. */
router.get('/:name', function(req, res, next) {
   var db = new sqlite3.Database('dnd.db');

   db.serialize(function() {
      db.get("SELECT * from characters WHERE name = ?", req.params.name, function(err, row) {
         res.render('character', {
            character: row
         });
      });
   });

   db.close();
});

module.exports = router;
