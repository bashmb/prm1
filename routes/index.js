var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://bash@localhost/bash";

// Routes:
//   * GET  /
//   * GET  /calls
//   * GET  /count/calls/
//   * GET  /count/calls/:contact
//   * GET  /contacts
//   * GET  /count/contacts
//   * GET  /callcount
//   * POST /calls
//   * POST /contacts

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get all calls
router.get('/calls/:contact', function(req, res, next){

  var results = [];
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    var query = client.query('SELECT * FROM calls where contact = $1', [req.params.contact]);
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
})

// Get all calls to contact
router.get('/calls', function(req, res, next){

  var results = [];
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    var query = client.query('SELECT * FROM calls');
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
})

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

// Get Count of Contacts Endpoint
router.get('/count/contacts', function(req, res, next){
var results = [];
pg.connect(conString, function(err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
  var query = client.query('SELECT count(*) FROM contacts');
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



// GET Call Count
router.get('/count/calls', function(req, res, next){
var results = [];
pg.connect(conString, function(err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
  var query = client.query('SELECT count(*) FROM calls');
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

// GET Call Count to Contact
router.get('/count/calls/:contact', function(req, res, next){
var results = [];
pg.connect(conString, function(err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
  var query = client.query('SELECT count(*) FROM calls WHERE contact = $1', [req.params.contact]);
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


// POST Calls endpoint
router.post('/calls', function(req, res, next){

  var data = {contactId: req.body.callId, callDate: req.body.callDate, callNotes: req.body.callNotes};
  pg.connect(conString, function(err, client, done){
    var results = [];
    if(err){
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    client.query("INSERT INTO calls(contact, date, notes, type) values ($1, $2, $3, $4)", [data.contactId, data.callDate, data.callNotes, 1]);
    var query = client.query("SELECT * FROM calls")
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

// POST contacts:  Create New Contact
router.post('/contacts', function(req, res, next) {
    // Grab data from http request
    // var data = {firstname: 'hi', lastname:'bye', phone: 123, email:'hi@bye.com'};
    var data = {firstname: req.body.firstname, lastname: req.body.lastname, phone: req.body.phone, email: req.body.email};
    // var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        var results = [];
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
