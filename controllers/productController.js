// ./controllers/productController.js
class ProductController {
    constructor(ProductService) {
        this.productService = ProductService;
    }

    async createProduct(req, res) {
        try {
            const { nome, descricao, preco, estoque } = req.body;
            const newProduct = await this.productService.create(nome, descricao, preco, estoque);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar o produto.' });
        }
    }

    async findAllProducts(req, res) {
        try {
            const products = await this.productService.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar os produtos.' });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const updatedProduct = await this.productService.update(id, req.body);
            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ error: 'Produto não encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar o produto.' });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const deletedProduct = await this.productService.delete(id);
            if (deletedProduct) {
                res.status(200).json({ message: 'Produto deletado com sucesso.' });
            } else {
                res.status(404).json({ error: 'Produto não encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o produto.' });
        }
    }
}

module.exports = ProductController;
