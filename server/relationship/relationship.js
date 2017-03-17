var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const StanfordCoreNLPClient = require('../middelwares/StanfordCoreNLPClient');

const client = new StanfordCoreNLPClient(undefined, 'openie, coref', {"openie.resolve_coref": "true"});

var data = "";


fs.readFile(path.join(__dirname, '../resources') + '/testInput.txt',  "utf-8", function read(err, data) {
    if (err) {
        throw err;
    }

    // Invoke the next step here however you like
    console.log(data);   // Put all of the code here (not the best solution)
    processFile(data);          // Or put the next step in a function and invoke it
});

function processFile(phrase){
    client.annotate(phrase)
        .then(function(result){
            data = result;
        });
}



/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(data);
});


module.exports = router;

