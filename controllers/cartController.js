// controllers/cartController.js
class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }

    // Método para adicionar um produto na cesta
    async addProduct(req, res) {
        const { userId, productId, quantity } = req.body;
        try {
            const cart = await this.cartService.addProduct(userId, productId, quantity);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para remove o produto da cesta pelo id
    async removeProduct(req, res) {
        const { userId } = req.body;
        const { id: productId } = req.body;
        try {
            const cart = await this.cartService.removeProduct(userId, productId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: 'Cart não encontrado' });
        }
    }

    // Método para listar os produtos da cesta
    async getCart(req, res) {
        const { userId } = req.body;
        try {
            const cart = await this.cartService.getCart(userId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: 'Cart não encontrado' });
        }
    }
}

module.exports = CartController;
