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

router.get('/:name/new-ability', async function(req, res, next) {
   res.render('new-ability', {
      characterName: req.params.name
   });
});

router.post('/:name/new-ability', async function(req, res) {
   var body = req.body;

   try {
      const db = await dbPromise;

      await db.run("INSERT INTO abilities (character_name, ability_name, description) VALUES (?, ?, ?)",
       body.character_name, body.ability_name, body.description);
   } catch (err) {
      next(err);
   }

   res.end();
});


module.exports = router;
