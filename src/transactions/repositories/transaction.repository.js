const Transaction = require("./transaction.model");

function TransactionRepository() {
    return {
        create: async function (transactionData) {
            const transaction = await new Transaction(transactionData).save();
            return formatTransaction(transaction);
        },

        findById: async function (transactionId) {
            const transaction = await Transaction.findById(transactionId);

            if (!transaction) {
                throw new Error("Transaction not found");
            }

            return transaction;
        },

    };
}

function formatTransaction(transaction) {
    return {
        id: transaction._id,
        car: transaction.car,
        dealer: transaction.dealer,
        buyerName: transaction.buyerName,
        buyerPhone: transaction.buyerPhone,
        buyerEmail: transaction.buyerEmail,
        buyerAddress: transaction.buyerAddress,
        paymentMethod: transaction.paymentMethod,
        salePrice: transaction.salePrice,
        transactionDate: transaction.transactionDate
    };
}

module.exports = { TransactionRepository };