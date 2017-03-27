var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const StanfordCoreNLPClient = require('../relationship/StanfordCoreNLPClient');

const filter = require("../relationship/relationship.filter.js");

const useLocalJson = true;

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
    getFileContent('test-data.wet')
        .catch(function (error) {
            console.log('error: reading file');
        }).then(function (data) {
            console.log("got data from wet");
            var contentFirst = splitWet(data);
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

            filter.filterOpenIE(result);
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

    content = "Chaconne, Italian Ciaccona, solo instrumental piece that forms the fifth and final movement of the Partita No. 2 in D Minor, BWV 1004, by Johann Sebastian Bach. Written for solo violin, the Chaconne is one of the longest and most challenging entirely solo pieces ever composed for that instrument.     Bach’s string compositions, including a half dozen partitas and sonatas for solo violin, were composed in the late 1710s and early 1720s, while Bach was employed at the court in Köthen, Germany. It was a period of great freedom and creativity for the composer.         The Chaconne forms the longest movement of the piece by far, making up roughly half of the entire partita. It draws upon the Baroque dance form known as a chaconne, in which a basic theme stated at the opening is then restated in several variations. In Bach’s Chaconne, the basic theme is four measures long, short and simple enough to allow for 64 variations. From a stern and commanding mood at the beginning, Bach gradually increases the complexity of his theme, mixing in various compositional effects. Some twists upon the theme are spacious and grand; others flow nimbly. Fast runs and large interval skips are frequent, requiring much dexterity from the performer. Bach also calls forth changes in emotional intensity, as some variations are dominated by long notes and others by many, more urgent short notes. Bach builds up his work over 256 measures, finally restating the theme at the end with new, even stronger harmonies.";
    return content;
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(data);
});

module.exports = router;
