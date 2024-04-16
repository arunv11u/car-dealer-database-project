/* Student Name: Arun Varadharajalu
Student Number: 8896434 */

const { dbConnect } = require("./src/utils");
const { Car, Dealer, Transaction } = require("./schema");

const cars = [
	{
		"_id": "66139a1260640410d10e5744",
		"make": "Toyota",
		"model": "Camry",
		"year": 2018,
		"price": 20000,
		"mileage": 35000,
		"color": "Silver",
		"condition": "Used"
	},
	{
		"_id": "66139a21398a4665fa9aa189",
		"make": "Honda",
		"model": "Accord",
		"year": 2020,
		"price": 25000,
		"mileage": 20000,
		"color": "White",
		"condition": "Used"
	},
	{
		"_id": "66139a34f9ad0d68f6215b91",
		"make": "Ford",
		"model": "Mustang",
		"year": 2019,
		"price": 35000,
		"mileage": 15000,
		"color": "Red",
		"condition": "Used"
	},
	{
		"_id": "66139a42c9b4bf8d371f5f3a",
		"make": "Chevrolet",
		"model": "Tahoe",
		"year": 2021,
		"price": 40000,
		"mileage": 10000,
		"color": "Black",
		"condition": "New"
	},
	{
		"_id": "66139a50c3e246442dfbb11f",
		"make": "BMW",
		"model": "X5",
		"year": 2022,
		"price": 60000,
		"mileage": 5000,
		"color": "Blue",
		"condition": "New"
	}
];

const dealers = [
	{
		"_id": "66139b0a20a045b83338f134",
		"name": "ABC Motors",
		"location": "123 Main Street, Cityville",
		"phone": "123-456-7890",
		"email": "abc@motors.com"
	},
	{
		"_id": "66139b1571476f48b087da9f",
		"name": "XYZ Auto",
		"location": "456 Elm Street, Townsville",
		"phone": "456-789-0123",
		"email": "xyz@auto.com"
	},
	{
		"_id": "66139b25fe1e6cf3d6e53450",
		"name": "Best Cars Inc.",
		"location": "789 Oak Street, Villagetown",
		"phone": "789-012-3456",
		"email": "best@cars.com"
	},
	{
		"_id": "66139b35a381e8a716c1c3ef",
		"name": "Superior Vehicles",
		"location": "321 Maple Street, Hamletville",
		"phone": "098-765-4321",
		"email": "superior@vehicles.com"
	},
	{
		"_id": "66139b4254f6ab5fc3331273",
		"name": "Premier Auto Group",
		"location": "654 Pine Street, Suburbia",
		"phone": "987-654-3210",
		"email": "premier@auto.com"
	}
];

const transactions = [
    {
        "car": "66139a1260640410d10e5744",
        "dealer": "66139b0a20a045b83338f134",
        "buyerName": "John Doe",
        "buyerPhone": "123-456-7890",
        "buyerEmail": "john@example.com",
        "buyerAddress": {
            "street": "123 Main St",
            "city": "Anytown",
            "state": "CA",
            "zip": "12345"
        },
        "paymentMethod": "Credit Card",
        "salePrice": 21000,
        "transactionDate": "2024-04-08T12:00:00Z"
    },
    {
        "car": "66139a21398a4665fa9aa189",
        "dealer": "66139b1571476f48b087da9f",
        "buyerName": "Jane Smith",
        "buyerPhone": "987-654-3210",
        "buyerEmail": "jane@example.com",
        "buyerAddress": {
            "street": "456 Oak St",
            "city": "Sometown",
            "state": "NY",
            "zip": "54321"
        },
        "paymentMethod": "Cash",
        "salePrice": 26000,
        "transactionDate": "2024-04-07T12:00:00Z"
    },
    {
        "car": "66139a34f9ad0d68f6215b91",
        "dealer": "66139b25fe1e6cf3d6e53450",
        "buyerName": "Alice Johnson",
        "buyerPhone": "555-123-4567",
        "buyerEmail": "alice@example.com",
        "buyerAddress": {
            "street": "789 Elm St",
            "city": "Othertown",
            "state": "TX",
            "zip": "67890"
        },
        "paymentMethod": "Bank Transfer",
        "salePrice": 37000,
        "transactionDate": "2024-04-06T12:00:00Z"
    },
    {
        "car": "66139a42c9b4bf8d371f5f3a",
        "dealer": "66139b35a381e8a716c1c3ef",
        "buyerName": "Bob Williams",
        "buyerPhone": "111-222-3333",
        "buyerEmail": "bob@example.com",
        "buyerAddress": {
            "street": "321 Pine St",
            "city": "Anothertown",
            "state": "FL",
            "zip": "45678"
        },
        "paymentMethod": "Financing",
        "salePrice": 41000,
        "transactionDate": "2024-04-05T12:00:00Z"
    },
    {
        "car": "66139a50c3e246442dfbb11f",
        "dealer": "66139b4254f6ab5fc3331273",
        "buyerName": "Emily Brown",
        "buyerPhone": "333-444-5555",
        "buyerEmail": "emily@example.com",
        "buyerAddress": {
            "street": "555 Maple St",
            "city": "Yetanothertown",
            "state": "WA",
            "zip": "56789"
        },
        "paymentMethod": "Cashier's Check",
        "salePrice": 62000,
        "transactionDate": "2024-04-04T12:00:00Z"
    }
];

async function loadData() {
	await dbConnect();

	await Car.insertMany(cars);
	await Dealer.insertMany(dealers);
	await Transaction.insertMany(transactions);
};

loadData().then(() => {
	console.log("Data loaded into the database!");

	process.exit();
}).catch(err => {
	console.log("Error in loading data :", err);
	
	process.exit();
});