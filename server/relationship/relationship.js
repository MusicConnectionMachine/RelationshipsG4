var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const StanfordCoreNLPClient = require('../relationship/StanfordCoreNLPClient');

const filter = require("../relationship/relationship.filter.js");

const useLocalJson = false;

const client = new StanfordCoreNLPClient(
    undefined,
    'tokenize, ssplit, pos, depparse, relation, openie, coref, ner',
    {
        'openie.resolve_coref': 'true'
    }
);

var data = '';


if (useLocalJson) {
    getFileContent('relationships-testData.json')
        .catch(function (error) {
            console.log('error: reading file');
        }).then(function (data) {
            data = JSON.parse(data);
            filter.filterOpenIE(data);
        });
} else {
    getFileContent('mozart.txt')
        .catch(function (error) {
            console.log('error: reading file');
        }).then(function (data) {
            console.log("got data from wet");
            // for wet
            // var contentFirst = splitWet(data);
            // for txt
            var contentFirst = data;
            console.log("Content: " + contentFirst);
            return client.annotate(contentFirst);
        }).catch(function (error) {
            console.error(error);
            console.log('error: coreNLP processing');
        }).then(function (result) {
            console.log("got data from nlp");
            console.log(JSON.stringify(result));
            // TODO: save everything in DB
            // DB connection missing at the moment

            var openie = filter.filterOpenIE(result);
            console.log(JSON.stringify(openie));
            // TODO: filter data
            //filter.filterOpenIE(result);
            //filter.filterCorefs(result);

            // TODO: save filtered data in DB
            // DB connection missing at the moment

            data = result;
        });
}

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

function splitWet(data) {
    // get websites from wet
    data = data.split("\n\n\n");

    // filter out warc info, TODO: we may need that data later
    // TODO: use more than one website (still testing)
    var content = data[0].split("\n\n")[1];

    // TODO: delete this later, just try to prevent timeout
    content = content.substring(0, 100);

    return content;
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(data);
});

module.exports = router;
