// routes/carts.js
var express = require('express');
var router = express.Router();

// Implementar as dependencias para o funcionamento da classe Cart
const db = require('../models');

// Carregando as clases service e controller do cart
const CartService = require('../services/cartService');
const CartController = require('../controllers/cartController');

// Contruir os objetos a partir das classes
const cartService = new CartService(db.Cart, db.Product);
const cartController = new CartController(cartService);

// Rota para adicionar um produto na cesta
router.post('/addProduct', async (req, res) => {
    cartController.addProduct(req, res);
});

// Rota para remover um produto da cesta pelo id
router.delete('/removeProduct', async (req, res) => {
    cartController.removeProduct(req, res);
});

// Rota para visualizar os itens na cesta de um usuário pelo id dele
router.get('/userCarts', async (req, res) => {
    cartController.getCart(req, res);
});

module.exports = router;
