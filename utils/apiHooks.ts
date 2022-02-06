import { AccountSnapshot } from 'binance-api-node';
import useSWR from 'swr';
import { Components } from './up-client';

// @ts-ignore @ts-nocheck
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useBinance = () =>
	useSWR<AccountSnapshot>('/api/binance', fetcher);

export const useTransactions = () =>
	useSWR<Components.Schemas.TransactionResource[]>(
		'/api/transactions',
		fetcher
	);

export const useAccounts = () =>
	useSWR<Components.Schemas.AccountResource[]>('/api/accounts', fetcher);

export const useHello = () => useSWR<string>('/api/test');
