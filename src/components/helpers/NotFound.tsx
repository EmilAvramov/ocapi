import { Flex } from '@chakra-ui/react';
import { IError } from '@component-types';

export const NotFound: React.FC<IError> = ({ error }): JSX.Element => {
	return (
		<Flex
			justifyContent='center'
			alignItems='center'
			minHeight='70vh'
			textAlign='center'
			margin='0 auto'
			width='90%'>
			{error}
		</Flex>
	);
};
