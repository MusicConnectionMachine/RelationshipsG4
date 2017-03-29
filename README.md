# RelationshipsG4 [![Join the chat at https://gitter.im/MusicConnectionMachine/RelationshipsG4](https://badges.gitter.im/MusicConnectionMachine/RelationshipsG4.svg)](https://gitter.im/MusicConnectionMachine/RelationshipsG4?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/MusicConnectionMachine/RelationshipsG4.png?branch=develop)](https://travis-ci.org/MusicConnectionMachine/RelationshipsG4)

In this repository we will try to build and determine [relationships](https://raw.githubusercontent.com/MusicConnectionMachine/RelationshipsG4/develop/documents/Relationships.txt) between composers

## Setup

### [Docker](https://www.docker.com)
1. cd into server folder
2. run `docker build -t relationships .`
3. run `docker run -p 3000:3000  -d relationships`
4. go to http://localhost:3000/relationships or http://localhost:3000/reputability in order to see respective JSON file

This connects to Stanford CoreNLP running on the Azure Server.

### Manually

#### 1. Stanford CoreNLP locally
1. [download the latest Version](http://stanfordnlp.github.io/CoreNLP/#download)
2. run `java -mx4g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer` in the extracted folder to start the magic on localhost:9000

#### 2. Express Project
1. cd into server folder (in a new console)
2. in config.json, change the `core_nlp_server_url` to `http://localhost:9000`
3. run `npm install` to install dependencies
4. run `npm run start` to start the server on localhost:3000, or alternatively run the ./bin/www file in WebStorm
5. go to http://localhost:3000/relationships or http://localhost:3000/reputability in order to see respective JSON file

For Mac: In case you don't have [wget](https://www.gnu.org/software/wget) installed, you can get it via [homebrew](https://brew.sh) by running `brew install wget`
