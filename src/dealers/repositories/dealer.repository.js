/* Student Name: Arun Varadharajalu
Student Number: 8896434 */

/* Student Name: James Boby Vempala
Student Number: 8941304 */

/* Student Name: Fenil Moradiya
Student Number: 8941920 */

const Dealer = require("./dealer.model");

function DealerRepository() {
	return {
		getAll: async function () {
			const dealers = await Dealer.find({});

			const dearlerEntities = dealers.map(dealer => formatDealer(dealer));

			return dearlerEntities;
		},
		get: async function (id) {
			const dealer = await Dealer.findOne({ _id: id });

			if (!dealer) throw new Error("Dealer not found");

			return formatDealer(dealer);
		}
	};
}

function formatDealer(dealer) {
	return {
		id: dealer._id,
		name: dealer.name,
		location: dealer.location,
		phone: dealer.phone,
		email: dealer.email
	};
}

module.exports = { DealerRepository };