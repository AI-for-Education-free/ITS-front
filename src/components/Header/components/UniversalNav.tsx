// @ts-nocheck
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link as RLink } from "react-router-dom";

import './Universal-Nav.css';

import { Link, SkeletonSprite } from '../../helpers';
import MenuButton from './MenuButton';
import NavLinks from './NavLinks';
import { login, userSelector } from '../../../redux/reducers/user';

export interface UniversalNavProps {
	displayMenu?: boolean;
	fetchState?: { pending: boolean };
	menuButtonRef?: React.RefObject<unknown> | React.Ref<HTMLButtonElement> | undefined;
	toggleDisplayMenu?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	user?: Record<string, unknown>;
}


export const UniversalNav = ({
	displayMenu,
	toggleDisplayMenu,
	menuButtonRef,
	user,
	fetchState
}: UniversalNavProps): JSX.Element => {
	const pending: boolean = false;
	const { t } = useTranslation();
	const { login } = useSelector(userSelector);
	const dispatch = useDispatch();

	return (<nav
		aria-label={t('aria.primary-nav')}
		className={'universal-nav' + (displayMenu ? ' expand-nav' : '')}
		id='universal-nav'
	>
		<div className='universal-nav-middle'>
			<Link to='/learn' style={{ "color": "white", "fontSize": "22px", "marginLeft": "20px" }}>
				USTC
			</Link>
		</div>
		<div className='universal-nav-right main-nav'>
			{pending ? (
				<div className='nav-skeleton'>
					<SkeletonSprite />
				</div>
			) : (login ? (
				<MenuButton
					displayMenu={displayMenu}
					innerRef={menuButtonRef}
					onClick={toggleDisplayMenu}
					user={user}
				/>
			) : (

				<RLink to="/login" className='signin'>{t('buttons.sign-in')}</RLink>

			))}
		</div>

		<NavLinks
			displayMenu={displayMenu}
			fetchState={fetchState}
			toggleDisplayMenu={toggleDisplayMenu}
			user={user}
		/>
	</nav>);
}


UniversalNav.displayName = 'UniversalNav';
export default UniversalNav;