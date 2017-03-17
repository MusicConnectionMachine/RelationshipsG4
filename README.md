# RelationshipsG4 [![Join the chat at https://gitter.im/MusicConnectionMachine/RelationshipsG4](https://badges.gitter.im/MusicConnectionMachine/RelationshipsG4.svg)](https://gitter.im/MusicConnectionMachine/RelationshipsG4?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

In this repository we will try to build and determine [relationships](https://raw.githubusercontent.com/MusicConnectionMachine/RelationshipsG4/develop/documents/Relationships.txt) between composers

![Architecture Overview](https://raw.githubusercontent.com/MusicConnectionMachine/RelationshipsG4/develop/documents/Architecture%20Overview.png)

## Setup

### [Docker](https://www.docker.com)
1. navigate to server folder (in a new console)
2. run `docker-compose up`
3. go to http://localhost:3000/relationships or http://localhost:3000/reputability in order to see respective JSON file

### Manually

#### 1. Stanford CoreNLP
1. [download the latest Version](http://stanfordnlp.github.io/CoreNLP/#download)
2. run `java -mx4g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer` in the extracted folder to start the magic on localhost:9000

#### 2. Express Project
1. navigate to server folder (in a new console)
2. in config.json, change the `core_nlp_server_url` to `http://localhost:9000`
3. run `npm install` to install dependencies
4. run `npm run start` to start the server on localhost:3000, or alternatively run the ./bin/www file in WebStorm
5. go to http://localhost:3000/relationships or http://localhost:3000/reputability in order to see respective JSON file

For Mac: In case you don't have [wget](https://www.gnu.org/software/wget) installed, you can get it via [homebrew](https://brew.sh) by running `brew install wget`
