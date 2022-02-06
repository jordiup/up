import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '../../utils/up-client';
import { upClient } from '../../utils/api';
import { getSession } from '@auth0/nextjs-auth0';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// const authRes = await getSession(req, res);

	// if (!user)
	// 	return res
	// 		.status(500)
	// 		.json({ statusCode: 500, message: 'User not found' });

	/** Consider making this a next js middle ware
	 * so there is not as much boilerplate/re-usability
	 * https://nextjs.org/docs/api-routes/api-middlewares
	 */
	const client = await upClient().init<Client>();

	if (req.method === 'GET') {
		try {
			const resp = await client.getAccounts();
			// const transactionsOnly = resp.data.data.filter(
			// 	(el) => el.attributes.accountType === 'TRANSACTIONAL'
			// );
			console.log(1);
			res.status(200).json(resp.data.data);
		} catch (error) {
			console.log(2);
			res.status(500).json({ statusCode: 500, message: error });
		}
	} else {
		console.log(3);
		res.status(404).json(new Error('user not found'));
	}
	return res.end();
};

export default handler;
