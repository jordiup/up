import Binance from 'binance-api-node';
import { env } from 'process';

export const binanceClient = Binance({
	apiKey: env.APIKEY,
	apiSecret: env.APISECRET,
});
