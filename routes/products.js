// ./routes/products.js
const express = require('express');
const router = express.Router();

// Implementar as dependencias para o funcionamento da classe Cart
const db = require('../models'); 

// Carregando as clases service e controller do product
const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

// Contruir os objetos a partir das classes
const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

// Rota para criar um novo produto
router.post('/novoproduto', async (req, res) => {
    productController.createProduct(req, res);
});

// Rota para listar todos os produtos
router.get('/allproducts', async (req, res) => {
    productController.findAllProducts(req, res);
});

// Rota para atualizar um produto pelo id
router.put('/updateProduto', async (req, res) => {
    await productController.updateProduct(req, res);
});

// Rota para deletar um produto pelo id
router.delete('/deleteProduct', async (req, res) => {
    productController.deleteProduct(req, res);
});

module.exports = router;
