// ./routes/products.js
const express = require('express');
const router = express.Router();

// Carregar o serviço e controlador de produtos
const db = require('../models'); // Carregando o banco de dados
const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

// Criar instâncias dos serviços e controladores
const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('módulo de produtos rodando.');
});

// Rota para criar um novo produto
router.post('/novoproduto', async (req, res) => {
    productController.createProduct(req, res);
});

// Rota para listar todos os produtos
router.get('/', async (req, res) => {
    productController.findAllProducts(req, res);
});

// Rota para atualizar um produto existente
router.put('/:id', async (req, res) => {
    productController.updateProduct(req, res);
});

// Rota para deletar um produto existente
router.delete('/:id', async (req, res) => {
    productController.deleteProduct(req, res);
});

module.exports = router;
