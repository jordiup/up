import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '../../utils/up-client';
import { upClient } from '../../utils/api';
import { getSession } from '@auth0/nextjs-auth0';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// const prisma = PrismaInstance;
	// const authRes = await getSession(req, res);
	// const user = authRes?.user;

	/** Consider making this a next js middle ware
	 * so there is not as much boilerplate/re-usability
	 * https://nextjs.org/docs/api-routes/api-middlewares
	 */
	const client = await upClient().init<Client>();

	if (req.method === 'GET') {
		try {
			const resp = await client.getTransactions();
			let data = resp.data.data;
			// This is a work around to remove any sneak 1cent payments with silly descriptions
			data = [...data].filter(
				(transaction) => transaction.attributes.amount.valueInBaseUnits > 1
			);
			// If the user is authentication...
			if (!false)
				data = data.map((transaction) => {
					return {
						...transaction,
						attributes: {
							...transaction.attributes,
							// Used to mask transaction descriptions unless logged in
							// description: 'xxxxxx-xxxxxx',
							description: transaction.attributes.description,
							rawText: '',
						},
					};
				});
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ statusCode: 500, message: error });
		}
	} else {
		res.status(500).end('error');
	}
	return res;
};

export default handler;
