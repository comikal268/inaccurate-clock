exports.auth = async (req: any, res: any, next: any) => {
  try {
    const {getClient} = require('../setup');
    const client = await getClient();
    const result = await client.query('SELECT * from public."user" where token = $1', [req.body.token]);
    if (result.rows.length > 0) {
      //do something
    }
    next();
  }
  catch (error)
  {
    const err = new Error("Not authorized! Go back!");
    return next(error);
  }
};
