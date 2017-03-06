var express = require('express');
var router = express.Router();
const Graph = require('graphology');
const hits = require('graphology-hits');


const randomGraph = generateDummyGraph(10000);

const {hubs, authorities} = hits(randomGraph);

console.log("I'm done xD");



function generateDummyGraph(numberOfNodes) {
    const graph = new Graph();
    // nodes
    for(var i = 0; i < numberOfNodes; i++) {
        graph.addNode(i);
    }
    // edges
    for(var i = 0; i < numberOfNodes / 4; i++) {
        const random1 = Math.floor(Math.random() * numberOfNodes);
        const random2 = Math.floor(Math.random() * numberOfNodes);

        const key = random1 + '->' + random2;
        // add only if not already found:
        if(!(graph.edges(random1, random2).includes(key))) {
            graph.addEdgeWithKey(key, random1, random2);
        }
    }
    return graph;
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send(authorities);
});

module.exports = router;
