exports.createUser = async (req: any, res: any) => {
	try {
		const {getClient} = require('../setup');
		const client = await getClient();
		const {role, token} = req.body;
		const result = await client.query(`INSERT INTO public.user 
		(role, token) values ($1, $2)`,
			[role, token]);
		if (result) {
			res.status(200);
		}
	}
	catch (e) {
		res.status(400).send(JSON.stringify(e));
	}
};
exports.deleteUser = async (req: any, res: any) => {
	try {
		const {getClient} = require('../setup');
		const client = await getClient();
		const {user_id} = req.body;
		const result = await client.query(`DELETE FROM public.user WHERE user_id = $1`,
			[user_id]);
		if (result) {
			res.status(200);
		}
	}
	catch (e) {
		res.status(400).send(JSON.stringify(e));
	}
};
exports.updateUser = async (req: any, res: any) => {
	//TODO
};
