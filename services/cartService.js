// services/cartService.js
class CartService {
    constructor(CartModel, ProductModel) {
        this.Cart = CartModel;
        this.Product = ProductModel;
    }

    // Método para adicionar um produto à cesta
    async addProduct(userId, productId, quantity) {
        try {
         
            let cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {

                cart = await this.Cart.create({ userId, items: [] });
            }
        
            let items = cart.items || [];
            if (typeof items === 'string') {
                items = JSON.parse(items);
            }
        
            // Busca o produto pelo ID
            const product = await this.Product.findOne({ where: { id: productId } });
            if (!product) {
                throw new Error('Produto não encontrado.');
            }
        
            const itemIndex = items.findIndex(item => item.productId === productId);
        
            if (itemIndex > -1) {
    
                items[itemIndex].quantity += quantity;
                items[itemIndex].totalPrice = items[itemIndex].quantity * product.preco;
            } else {

                items.push({
                    productId: product.id,
                    name: product.nome,
                    quantity,
                    estoque: product.estoque,
                    totalPrice: product.preco * quantity
                });
            }
        
            cart.items = items;
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
    

    // Método para remover um produto da cesta
    async removeProduct(userId, productId) {
        try {
            // Busca o carrinho pelo userId
            let cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {
                throw new Error('Cesta de compras não encontrada.');
            }
 
            let items = cart.items || [];
            if (typeof items === 'string') {
                items = JSON.parse(items);
            }
            if (!Array.isArray(items)) {
                items = [];
            }
    
            items = items.filter(item => item.productId !== parseInt(productId));
    
            cart.items = items;
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Método para listar o conteúdo da cesta
    async getCart(userId) {
        try {
            const cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {
                throw new Error('Cesta de compras não encontrada.');
            }
            
            let items = cart.items || [];
            if (typeof items === 'string') {
                items = JSON.parse(items);
            }
    
            return {
                id: cart.id,
                userId: cart.userId,
                items: items.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    quantity: item.quantity,
                    estoque: item.estoque,
                    totalPrice: item.totalPrice
                })),
                createdAt: cart.createdAt,
                updatedAt: cart.updatedAt
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartService;
