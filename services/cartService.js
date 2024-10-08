// services/cartService.js
class CartService {
    constructor(CartModel, ProductModel) {
        this.Cart = CartModel;
        this.Product = ProductModel;
    }

    // Adicionar um produto à cesta
    async addProduct(userId, productId, quantity) {
    try {
        const product = await this.Product.findByPk(productId);
        if (!product) {
            throw new Error('Produto não encontrado.');
        }

        let cart = await this.Cart.findOne({ where: { userId } });
        if (!cart) {
            cart = await this.Cart.create({ userId, items: [] });
        }

        // Garantir que o campo items é um array
        let items = cart.items || [];

        // Encontrar o índice do produto na cesta
        const itemIndex = items.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
            // Atualizar a quantidade e o preço total se o item já existir
            items[itemIndex].quantity += quantity;
            items[itemIndex].totalPrice = items[itemIndex].quantity * product.preco; // Corrigir o preço do produto
        } else {
            // Adicionar novo item à cesta
            items.push({
                productId: product.id,
                name: product.nome, // Corrigir para o nome do produto
                quantity,
                totalPrice: product.preco * quantity // Corrigir o preço do produto
            });
        }

        // Atualizar o campo items com o array modificado
        cart.items = items; // Não precisa serializar para JSON, pois o Sequelize lida com isso
        await cart.save();
        return cart;
    } catch (error) {
        throw error;
    }
}


    // Remover um produto da cesta
    async removeProduct(userId, productId) {
        try {
            let cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {
                throw new Error('Cesta de compras não encontrada.');
            }

            let items = cart.items || [];
            items = items.filter(item => item.productId !== productId);

            cart.items = items;
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Visualizar o conteúdo da cesta
    async getCart(userId) {
        try {
            const cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {
                throw new Error('Cesta de compras não encontrada.');
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartService;
