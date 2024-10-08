class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    // Método para criar um novo produto
    async create(nome, descricao, preco, estoque) {
        try {
            const newProduct = await this.Product.create({
                nome:nome,
                descricao:descricao,
                preco:preco,
                estoque:estoque
            });
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    // Método para retornar todos os produtos
    async findAll() {
        try {
            const products = await this.Product.findAll();
            return products;
        } catch (error) {
            throw error;
        }
    }

    // Método para retornar um produto pelo id
    async findById(id) {
        try {
            const product = await this.Product.findByPk(id);
            return product ? product : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para atualizar um produto pelo id
    async updateProduct(id, updatedData) {
        try {
            const product = await this.Product.findByPk(id);
            if (!product) {
                throw new Error('Produto não encontrado');
            }

            // Atualizando os dados do produto
            const updatedProduct = await product.update(updatedData);
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    // Método para deletar um produto pelo id
    async delete(id) {
        try {
            const product = await this.Product.findByPk(id);
            if (product) {
                await product.destroy();
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;
