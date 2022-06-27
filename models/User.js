//importation du package "mongoose" de Node
const mongoose = require('mongoose');
//importation du package "mongoose-unique-validator" de Node
const uniqueValidator = require('mongoose-unique-validator');

//création du modèle utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true }
});

//utilisation du plugin permettant un email unique
userSchema.plugin(uniqueValidator);

//export du modèle utilisateur
module.exports = mongoose.model('User', userSchema);