var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// start
router.get('/contacts', function(req, res){





var pg = require('pg');
var conString = "postgres://bash@localhost/bash";
var results = [];
pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
  var query = client.query('SELECT * FROM contacts');
   // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
  });


});





// end




module.exports = router;
