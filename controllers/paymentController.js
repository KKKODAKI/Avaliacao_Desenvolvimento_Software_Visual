// controllers/paymentController.js
class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }

    // Método para processar pagamento com cartão de crédito
    async processCreditCardPayment(req, res) {
        const { userId, valorTotal } = req.body;
        try {
            const transaction = await this.paymentService.processCreditCardPayment(userId, valorTotal);
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para pagamento com PIX
    async processPixPayment(req, res) {
        const { userId, valorTotal } = req.body;
        try {
            const transaction = await this.paymentService.processPixPayment(userId, valorTotal);
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para consultar status da transação
    async getTransactionStatus(req, res) {
        const { transactionId } = req.query;
        try {
            const transaction = await this.paymentService.getTransactionStatus(transactionId);
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PaymentController;
