var express = require('express');
var router = express.Router();
const corenlp=require('corenlp-js-interface');

const testPhrase = 'Born in Bonn,Beethoven was taught by his father Johann van Beethoven and by composer and conductor Christian Gottlob Neefe';

var result=corenlp(
    testPhrase,
    9000, /*port*/
    'openie', /*annotators*/
    'json' /*format*/
);

result = JSON.parse(result);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(result);
});


module.exports = router;

