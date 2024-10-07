class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

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

    async findAll() {
        try {
            const products = await this.Product.findAll();
            return products;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const product = await this.Product.findByPk(id);
            return product ? product : null;
        } catch (error) {
            throw error;
        }
    }

    async update(id, updatedFields) {
        try {
            const product = await this.Product.findByPk(id);
            if (product) {
                await product.update(updatedFields);
                return product;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

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
