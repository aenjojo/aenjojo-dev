import clsx from 'clsx';
import { TextLink } from '#components/Link';

export interface GenericTitlePropsType {
	children: string,
	withId?: boolean,
	withMargin?: boolean,
};

export function GenericTitle({ children, withId, withMargin }: GenericTitlePropsType) {
	const GenericTitleStyle = clsx([
		'text-lg font-semibold scroll-mt-16',
		withMargin && 'mb-2',
		withId && 'group',
	]);

	const id = withId ? encodeURIComponent(children.toLowerCase().replaceAll(/ +/g, '-')) : '';

	return (
		<h4
			className={GenericTitleStyle}
			id={id}
		>
			{children}
			{' '}
			{withId && (
				<TextLink
					href={`#${id}`}
					value='#'
					className='no-underline hidden group-hover:inline-block'
				/>
			)}
		</h4>
	);
};