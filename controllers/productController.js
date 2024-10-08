// ./controllers/productController.js
class ProductController {
    constructor(ProductService) {
        this.productService = ProductService;
    }

    // Método para adicionar um produto
    async createProduct(req, res) {
        try {
            const { nome, descricao, preco, estoque } = req.body;
            const newProduct = await this.productService.create(nome, descricao, preco, estoque);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar o produto.' });
        }
    }

    // Método para listar todos os produtos
    async findAllProducts(req, res) {
        try {
            const products = await this.productService.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar os produtos.' });
        }
    }

    // Método para atualizar um produto pelo id
    async updateProduct(req, res) {
        const { id, nome, descricao, preco, estoque } = req.body;

        try {
            const updatedProduct = await this.productService.updateProduct(id, {
                nome,
                descricao,
                preco,
                estoque,
            });

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Produto não encontrado.' });
            }

            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para deleta um produto pelo id
    async deleteProduct(req, res) {
        try {
            const { id } = req.query;
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
