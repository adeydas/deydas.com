import styled from '@emotion/styled';

import { COLOR_PRIMARY, CUBIC_BEZIER_TRANSITION } from '../utils/theme';

const MenuButton = styled('menu')(props => ({
    display: 'flex',
    fontSize: '14px',
	alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
	borderRadius: props.circular ? '10%' : 4,
	background: 'transparent',
	border: `1px solid ${props.theme.borderColor}`,
	padding: props.circular ? 8 : '8px 8px',
	transition: CUBIC_BEZIER_TRANSITION,
	cursor: 'pointer',
	color: 'inherit',
	'&:hover, &:focus': {
		outline: 0,
		color: COLOR_PRIMARY,
		boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)',
		borderColor: props.theme.borderHoverColor,
	},
}));

export default MenuButton;
