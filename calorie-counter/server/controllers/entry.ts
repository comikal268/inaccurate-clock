exports.createEntry = async (req: any, res: any) => {
	try {
		const {getClient} = require('../setup');
		const client = await getClient();
		const {user_id} = req;
		const {time_taken,product_name,calories} = req.body;
		const result = await client.query(`INSERT INTO public.product_entry 
		(time_taken,product_name,calories, user_id) values ($1, $2, $3, $4)`,
			[time_taken,product_name,calories,user_id]);
		if (result) {
			res.status(200);
		}
	}
	catch (e) {
		res.status(400).send(JSON.stringify(e));
	}

};
exports.listEntries = async (req: any, res: any) => {
	try {
		const {getClient} = require('../setup');
		const client = await getClient();
		const {user_id} = req;
		const result = await client.query(`SELECT * from product_entry where user_id = $1`,
			[user_id]);
		if (result) {
			res.status(200).send(JSON.stringify(result.rows));
		}
	}
	catch (e) {
		res.status(400).send(JSON.stringify(e));
	}
};
exports.getEntry = async (req: any, res: any) => {
	const client = await getClient();
	//TODO
};
exports.updateEntry = async (req: any, res: any) => {
	const client = await getClient();
	//TODO
};
exports.deleteEntry = async (req: any, res: any) => {
	try {
		const {getClient} = require('../setup');
		const client = await getClient();
		const {user_id} = req;
		const {product_name} = req.body;
		const result = await client.query(`DELETE FROM public.product_entry WHERE product_name = $1 AND user_id = $2`,
			[product_name,user_id]);
		if (result) {
			res.status(200);
		}
	}
	catch (e) {
		res.status(400).send(JSON.stringify(e));
	}

};
