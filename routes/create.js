var express = require('express');
var router = express.Router();
var sqlite = require('sqlite');

var dbPromise = sqlite.open('dnd.db');

/* GET users listing. */
router.get('/', async function(req, res, next) {
   res.render('create', {
      inputLabels: ["name", "class", "race"]
   });

});

router.post('/', async function(req, res) {
   var body = req.body;

   try {
      const db = await dbPromise;

      await db.run("INSERT INTO characters (name, class, race) VALUES (?, ?, ?)",
       body.name, body["class"], body.race);
   } catch (err) {
      next(err);
   }

   res.end();
});

module.exports = router;
