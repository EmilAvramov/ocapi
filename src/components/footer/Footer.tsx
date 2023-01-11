import { Flex } from '@chakra-ui/react';
import { useGetContent } from '../../hooks/useGetContent';
import DOMPurity from 'dompurify';
import parse from 'html-react-parser';

export const Footer: React.FC = (): JSX.Element => {
	const { dataSet } = useGetContent();

	const links = () => {
		const cleanHTML = DOMPurity.sanitize(dataSet.c_body, {
			USE_PROFILES: { html: true },
		});
		const html = parse(cleanHTML, {
			trim: true,
		});
		return html;
	};

	return (
		<Flex
			as='div'
			width='90%'
			height='11vh'
			margin='0 auto'
			align='center'
			justify='space-between'
			bg='gray.500'
			direction='column'
			color='white'
			padding='5px'>
			{dataSet && links()}
		</Flex>
	);
};
