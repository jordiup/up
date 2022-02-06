import {
	Box,
	chakra,
	Heading,
	Text,
	useInterval,
	Flex,
	VStack,
	Stack,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';
import Accounts from '../components/Accounts';
import TransactionItem from '../components/TransactionItem';
import styles from '../styles/Home.module.css';
import {
	useAccounts,
	useBinance,
	useHello,
	useTransactions,
} from '../utils/apiHooks';

const Home = () => {
	const { data, isValidating, ...rest } = useTransactions();

	const [icon, setIcon] = useState('🌱');

	useInterval(() => {
		const icons = ['🌏', '💗', '🌞'];
		let i = icons.findIndex((key) => key === icon);
		i = (i + 1) % icons.length;
		setIcon(icons[i]);
	}, 1000);

	const { data: accountData, isValidating: accountsIsValidating } =
		useAccounts();

	return (
		<div className={styles.container}>
			<Head>
				<title>Wallet</title>
				<meta name="description" content="Wallet" />
				{/* add og:image */}
				<meta property="og:image" content="/meta.png" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<br />
				<br />
				<Text>
					{/* This website displays the crypto balances of DaoTzus binance account */}
				</Text>
				<br />
				<br />
				<Stack dir="column" maxW="160px">
					{/* @ts-ignore */}
					<Accounts />
				</Stack>
				<Text>
					<em>{/* {JSON.stringify(data)} */}</em>
				</Text>
				<VStack spacing={4}>
					{/* {data && data.length > 0
						? data.map((el, i) => <TransactionItem transaction={el} key={i} />)
						: 'be patient, let your muddy water settle...'} */}
					{JSON.stringify(accountData)}
					{/* {accountData && accountData.length > 0
						? accountData.map((el, i) => <TransactionItem transaction={el} key={i} />)
						: 'be patient, let your muddy water settle...'} */}
				</VStack>
			</main>

			<br />
			<br />
			<footer>
				<br />
				<chakra.a target="_blank" rel="noopener noreferrer">
					Built by Dao Tzu {icon}
				</chakra.a>
			</footer>
		</div>
	);
};

export default Home;
