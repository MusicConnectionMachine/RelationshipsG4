const apiLocation = "../../api/"

const api = require(apiLocation + "index.js");

getComposers();

function getComposers() {
    api.connect(function(context) {
        console.log(context);
        var inst = context.component('models').module('instruments');
        inst.sync().then(function() {
            inst.create({
                name: 'Tuba'
            });
            var allI = inst.findAll().then(function(instrument) {
                console.log(instrument);
            });
        });
        //context.sequelize.sync().then(function () {

        //});
    });

}