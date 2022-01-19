const {getClient} = require('../setup');
exports.autocomplete = async (req: any, res: any) => {
	const query = req.params.prefix;
	const fetch = require('fetch');
	try {
		fetch.fetchUrl(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, {
			method: 'GET',
			headers: {
				'x-app-id': '6d52b7c8',
				'x-app-key': '0529f087ef150bd4a45be97dc9adf0bc',
			}
		},(result: any) => {
			if (result) {
				res.status(200).send(result.json());
			}
			else {
				res.status(400);
			}
		});
	}
	catch (error) {
		//fallback in case API isn't working
		try {
			const client = await getClient();
			const result = await client.query(`SELECT * from product_entry where product_name like $1`,
				[query]);
			if (result) {
				res.status(200);
			}
		}
		catch (e) {
			res.status(400).send(JSON.stringify(e));
		}

	}
};
