import React from 'react';
import { useAccounts } from '../utils/apiHooks';
import {
	Box,
	Text,
	Stat,
	StatHelpText,
	StatNumber,
	Spinner,
	Flex,
} from '@chakra-ui/react';
import FlexCard from './FlexCard';
import MoneyBadge from './MoneyBadge';

interface Props {}

const Accounts = (props: Props) => {
	const { data, error } = useAccounts();

	/**
	 * @TODO: currently useSwr will not return error^ from the above api call,
	 * therefore we're handling error state a little differently.
	 *
	 * Error state: return
	 */
	//@ts-ignore
	const isErr = error || data?.statusCode === 500;

	return data && data.length > 0 ? (
		data.map((el, i) => (
			<FlexCard
				minHeight="80px"
				cursor={isErr ? 'not-allowed' : 'auto'}
				flexDir="column"
				key={i}
			>
				<Flex flexDir="column" key={i}>
					<Stat>
						<StatHelpText mb={0}>{el.attributes.displayName}</StatHelpText>
						<StatNumber>${el.attributes.balance.value}</StatNumber>
					</Stat>
				</Flex>
			</FlexCard>
		))
	) : isErr ? (
		<FlexCard
			minHeight="80px"
			cursor={isErr ? 'not-allowed' : 'auto'}
			flexDir="column"
		>
			<Flex flexDir="column">
				<Stat>
					<StatHelpText mb={0}>Account balance</StatHelpText>
					<StatNumber>$XXX.XX</StatNumber>
				</Stat>
			</Flex>
		</FlexCard>
	) : (
		<Spinner />
	);
};

export default Accounts;
