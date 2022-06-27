//importation du package "mongoose" de Node
const mongoose = require('mongoose');

//création du modèle de sauce
const sauceModel = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer : { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: Array },
  usersDisliked: { type: Array },
});

//export du modèle de sauce
module.exports = mongoose.model('Sauce', sauceModel);