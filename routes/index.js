var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://bash@localhost/bash";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// Get Contacts Endpoint
router.get('/contacts', function(req, res, next){


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
// end of Get Contacts endpoint



// POST - Create New Contact
router.post('/contacts', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {firstname: 'hi', lastname:'bye', phone: 123, email:'hi@bye.com'};
    // var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO contacts (firstname, lastname, phone, email) values($1, $2, $3, $4)", [data.firstname, data.lastname, data.phone, data.email]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM contacts");

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

// end of POST - Create New Contact

module.exports = router;
