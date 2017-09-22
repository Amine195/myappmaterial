var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var villeSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Ville', villeSchema);