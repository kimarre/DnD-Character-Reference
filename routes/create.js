var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('dnd.db');

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.render('create', {
      inputLabels: ["name", "class", "race"]
   });

});

router.post('/', function(req, res) {
   var body = req.body;

   db.run("INSERT INTO characters (name, class, race) VALUES (?, ?, ?)",
   body.name, body["class"], body.race);

   res.redirect('/character/' + body.name);
   res.end();
});

module.exports = router;
