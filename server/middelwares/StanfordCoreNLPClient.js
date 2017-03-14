/**
 * Created by Daniel on 14.03.2017.
 */
const rq=require('request-promise');

class StanfordCoreNLPClient {
    constructor(host="http://localhost:9000",annotators="tokenize,ssplit,pos", additionalProps = {}) {
        this.host=host;
        this.annotators=annotators;
        this.additionalProps = additionalProps;
        this.properties = "?properties={";
        for(var key in additionalProps){
            this.properties += '"' + key + '":' + '"' + additionalProps[key] + '",'
        }
        this.properties += '"annotators": "'+this.annotators+'", "outputFormat": "json"}'
    }

    annotate(text) {
        console.log(this.host+'/' + this.properties);
        return rq({
                method:'POST',
                uri: this.host+'/' + this.properties,
                body:text
            })
                .then(data => JSON.parse(data));

    }
}

module.exports=StanfordCoreNLPClient;