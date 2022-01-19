const {Client} = require('ts-postgres');
let dbClient: any;
exports.dbSetup = async () => {
	try {
	dbClient = new Client({user: 'postgres', password: 'postgres', port: 5438});
	await dbClient.connect();
	console.log('Server connected to DB');
	}
	catch (error) {
		throw error;
	}
};

exports.getClient = async () => dbClient;
