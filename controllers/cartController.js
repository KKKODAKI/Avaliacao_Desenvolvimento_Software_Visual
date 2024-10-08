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
        const { userId, productId } = req.query; // Capturando os parâmetros da query string
        console.log("User ID recebido:", userId, "Product ID recebido:", productId); // Log para verificação
        try {
            const cart = await this.cartService.removeProduct(userId, productId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    

    // Método para listar os produtos da cesta
    async getCart(req, res) {
        // Captura o userId da query string ou do corpo, conforme necessário
        const userId = req.query.userId
        console.log("User ID recebido:", userId); // Log para verificação
        try {
            const cart = await this.cartService.getCart(userId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CartController;
