var express = require('express');
var router = express.Router();
var sqlite = require('sqlite');

var dbPromise = sqlite.open('dnd.db');

/* GET users listing. */
router.get('/:name', async function(req, res, next) {
   try {
      const db = await dbPromise;
      const [character, abilities] = await Promise.all([
         db.get("SELECT * FROM characters WHERE name = ?", req.params.name),
         db.all("SELECT * FROM abilities WHERE character_name = ?", req.params.name)
      ]);

      if(!character) {
         var err = new Error(`Character ${req.params.name} not found`);
         err.status = 404;
         next(err);
      }

      res.render('character', {
         character: character,
         abilities: abilities
      });
   } catch (err) {
      next(err);
   }

});

module.exports = router;
