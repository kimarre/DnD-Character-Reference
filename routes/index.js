var express = require('express');
var router = express.Router();
var sqlite = require('sqlite');

var dbPromise = sqlite.open('dnd.db');

/* GET home page. */
router.get('/', async function(req, res, next) {
   try {
      const db = await dbPromise;
      const characters = await db.all("SELECT name FROM characters ORDER BY name ASC");

      res.render('index', {
         title: "Super Dungeons and Dragbois 2k18",
         characters: characters
      });
   } catch (err) {
      next(err);
   }
});

module.exports = router;
