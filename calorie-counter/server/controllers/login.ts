exports.login = async (req: any, res: any) => {
	if (req.body && req.body.token) {
		const {getClient} = require('../setup');
		const client = await getClient();
		const result = await client.query('SELECT * from public."user" where token = $1', [req.body.token]);
		if (result.rows.length > 0) {
			const [userId, role, token] = result.rows[0];
			res.status(200).send(JSON.stringify({user_id: userId, token}));
		}
	}
	else {
		console.log('no body');
		res.status(400);
	}
};
