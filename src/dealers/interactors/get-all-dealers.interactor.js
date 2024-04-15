const { DealerRepository } = require("../../dealers/repositories/dealer.repository");

async function getAllDealersInteractor() {
	const dealerRepository = DealerRepository();

	const dealers = await dealerRepository.getAll();

	return dealers;
}

module.exports = {
	getAllDealersInteractor
};
