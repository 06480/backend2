//importation de Sauce.js
const Sauce = require('../models/Sauce');
//importation du package "fs" de Node
const fs = require('fs');

//export de la fonction permettant la création d'une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(req.file.filename
    )
    sauce.likes = 0;
    sauce.dislikes = 0;
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

//export de la fonction permettant la modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    { 
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ... req.body };
    console.log('newimg', req.file.filename)
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
   console.log(Sauce.find()
   .then(sauces => res.status(200).json(sauces))) 
};

//export de la fonction permettant la suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(thing => {
        console.log(thing)
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`,() => {
          Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }))
        });
      })
      .catch(error => res.status(500).json({ error })); 
};

//export de la fonction permettant d'afficher une sauce en particulier
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

//export de la fonction permettant d'afficher toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error: error }));
  };

//export de la fonction permettant l'ajout d'un like ou d'un dislike
exports.createLike =(req, res) => {
  Sauce.findOne({
    _id: req.params.id
  })
  .then(sauce => { 
    if (req.body.like == -1) {
      sauce.dislikes++;
      sauce.usersDisliked.push(req.body.userId);
      sauce.save();
    }
    if (req.body.like == 1) {
      sauce.likes++;
      sauce.usersLiked.push(req.body.userId);
      sauce.save();
    }
    if (req.body.like == 0){
      if (sauce.usersLiked.indexOf(req.body.userId) != -1){
        sauce.likes--;
        sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId), 1);
      }else{
        sauce.dislikes--;
        sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId), 1);
      }
      sauce.save();
    }
    res.status(200).json({ message: 'like réussi'})
  })
  .catch(error => {res.status(500).json({ error })});
};