const validateBuyCarInputs = () => {
    return function (request, response, next) {
        try {
            if (!request.body.carId)
                throw new Error("Car ID is required");

            if (!request.body.dealerId)
                throw new Error("Dealer ID is required");

            if (!request.body.buyerName)
                throw new Error("Buyer name is required");

            if (!request.body.buyerPhone)
                throw new Error("Buyer phone is required");

            if (!request.body.buyerEmail)
                throw new Error("Buyer email is required");

            if (!request.body.paymentMethod)
                throw new Error("Payment method is required");

            if (!request.body.salePrice)
                throw new Error("Sale price is required");

            next();
        } catch (error) {
            response.status(400).send({ error: error.message });
        }
    };
};

module.exports = { validateBuyCarInputs };