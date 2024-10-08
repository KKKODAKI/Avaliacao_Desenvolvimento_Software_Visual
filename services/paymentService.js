// services/paymentService.js
class PaymentService {
    constructor(TransactionModel) {
        this.Transaction = TransactionModel;
    }

    // Método para pagamento com cartão de crédito
    async processCreditCardPayment(userId, valorTotal) {
        try {
            const transaction = await this.Transaction.create({
                userId,
                valorTotal,
                metodoPagamento: 'cartão de crédito',
                status: 'pendente'
            });

            transaction.status = 'concluído';
            await transaction.save();

            return transaction;
        } catch (error) {
            throw error;
        }
    }

    // Método para pagamento com PIX
    async processPixPayment(userId, valorTotal) {
        try {
            const transaction = await this.Transaction.create({
                userId,
                valorTotal,
                metodoPagamento: 'PIX',
                status: 'pendente'
            });

            transaction.status = 'concluído';
            await transaction.save();

            return transaction;
        } catch (error) {
            throw error;
        }
    }

    // Método para consultar transação pelo id
    async getTransactionStatus(transactionId) {
        try {
            const transaction = await this.Transaction.findByPk(transactionId);
            if (!transaction) {
                throw new Error('Transação não encontrada.');
            }
            return transaction;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaymentService;
