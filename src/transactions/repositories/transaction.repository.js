const { DealerRepository } = require("../../dealers/repositories/dealer.repository");
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

            return formatTransaction(transaction);
        },
		getAll: async function () {
			const transactionsDoc = await Transaction.find({}).lean();

			const transactions = transactionsDoc.map(transaction => formatTransaction(transaction));

			const transactionPromises = transactions.map(async (transaction) => {
				const transactionDate = new Date(transaction.transactionDate);

				transaction.dealer = await DealerRepository().get(transaction.dealer);
				transaction.transactionDate = `${transactionDate.getFullYear()}-${(transactionDate.getMonth()+1).toString().padStart(2, "0")}-${(transactionDate.getDate()).toString().padStart(2, "0")}`;
			});

			await Promise.all(transactionPromises);

			return transactions;
		}
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