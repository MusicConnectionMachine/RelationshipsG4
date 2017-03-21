var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const StanfordCoreNLPClient = require('../relationship/StanfordCoreNLPClient');

const client = new StanfordCoreNLPClient(
    undefined,
    'openie, coref',
    {
        'openie.resolve_coref': 'true'
    }
);

var data = '';

getFileContent('chaconne.txt')
    .catch(function (error) {
        console.log('error: reading file');
    }).then(function (data) {
        return client.annotate(data);
    }).catch(function (error) {
        console.log('error: coreNLP processing');
    }).then(function (result) {
        data = result;
    });


function getFileContent(filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.join(__dirname, '../resources') + '/' + filename, 'utf-8', function read(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(data);
});

module.exports = router;
