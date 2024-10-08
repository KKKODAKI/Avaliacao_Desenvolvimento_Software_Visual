// services/cartService.js
class CartService {
    constructor(CartModel, ProductModel) {
        this.Cart = CartModel;
        this.Product = ProductModel;
    }

    // Adicionar um produto à cesta
    async addProduct(userId, productId, quantity) {
        try {
            // Busca o carrinho pelo userId
            let cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {
                // Se o carrinho não existir, cria um novo com uma lista vazia de items
                cart = await this.Cart.create({ userId, items: [] });
            }
        
            // Garante que items seja um array
            let items = cart.items || [];
            if (typeof items === 'string') {
                items = JSON.parse(items);
            }
        
            // Busca o produto pelo ID
            const product = await this.Product.findOne({ where: { id: productId } });
            if (!product) {
                throw new Error('Produto não encontrado.');
            }
        
            // Verifica se o produto já existe no carrinho
            const itemIndex = items.findIndex(item => item.productId === productId);
        
            if (itemIndex > -1) {
                // Atualiza a quantidade e o preço total se o produto já estiver na cesta
                items[itemIndex].quantity += quantity;
                items[itemIndex].totalPrice = items[itemIndex].quantity * product.preco;
            } else {
                // Adiciona um novo produto ao carrinho
                items.push({
                    productId: product.id,
                    name: product.nome,
                    quantity,
                    estoque: product.estoque,
                    totalPrice: product.preco * quantity
                });
            }
        
            // Atualiza o campo items no carrinho e salva no banco de dados
            cart.items = items;
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
    

    // Remover um produto da cesta
    async removeProduct(userId, productId) {
        try {
            // Busca o carrinho pelo userId
            let cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {
                throw new Error('Cesta de compras não encontrada.');
            }
    
            // Garante que items seja um array
            let items = cart.items || [];
            if (typeof items === 'string') {
                items = JSON.parse(items);
            }
            if (!Array.isArray(items)) {
                items = [];
            }
    
            // Filtrar para remover o produto específico da cesta
            items = items.filter(item => item.productId !== parseInt(productId));
    
            // Atualizar o carrinho com os produtos restantes e salvar no banco de dados
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
            // Busca o carrinho pelo userId
            const cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {
                throw new Error('Cesta de compras não encontrada.');
            }
            
            // Garante que os itens sejam um array válido
            let items = cart.items || [];
            if (typeof items === 'string') {
                items = JSON.parse(items);
            }
    
            // Retornar o carrinho com todos os detalhes
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
