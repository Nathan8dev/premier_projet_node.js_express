const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/Product')

mongoose.connect('mongodb+srv://nathanpichele:nath_mongo8@nathan0.nmyvsmx.mongodb.net/?retryWrites=true&w=majority&appName=Nathan0',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
      .then(() => console.log('Connexion à MongoDB réussie !'))
      .catch(() => console.log('Connexion à MongoDB échouée !')
);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Mes 5 routes commencent ici
//Création du produit dans la base de données
app.post('/api/products', ( req,res, next ) => {
    const product = new Product({
        ...req.body
    });
    product.save()
      .then(product => res.status(201).json({ product }))
      .catch(error => res.status(400).json({ error }));
});

//Modification du produit
app.put('/api/products/:id', ( req, res, next ) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Modified!' }))
      .catch(error => res.status(400).json({ error }));
});

//Suppression d'un Produit
app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Deleted!' }))
      .catch(error => res.status(400).json({ error }));
});

//recupération de tout les produits
app.get('/api/products', (req, res, next) => {
    Product.find()
      .then(products => res.status(200).json({ products }))
      .catch(error => res.status(400).json({ error }));
});

//Récupération d'un élément par son id
app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
      .then(product => res.status(200).json({ product }))
      .catch(error => res.status(404).json({ error }));
});



module.exports = app;