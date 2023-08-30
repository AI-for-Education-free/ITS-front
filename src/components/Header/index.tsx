// @ts-nocheck

import React, { useState, useEffect, useRef } from 'react';

import UniversalNav from './components/UniversalNav';

import './Header.css';

export interface HeaderProps {
	fetchState: { pending: boolean };
	user: Record<string, any>;
}


export const Header = ({ fetchState, user }: HeaderProps): JSX.Element => {
	const menuButtonRef = useRef();
	const [displayMenu, setDisplayMenu] = useState(false);
	const clickOutsideEventListener = (event) => handleClickOutside(event, displayMenu);

	// 切换菜单栏的显示状态
	const toggleDisplayMenu = () => {
		// 另一种方法：参数是最新的状态，不会等渲染完这个状态就会更新
		// setDisplayMenu((preState) => { return !preState;})
		setDisplayMenu(!displayMenu);
	}

	// 当点击搜索框和菜单栏以外的地方时，隐藏菜单栏和搜索框
	const handleClickOutside = (event: globalThis.MouseEvent): void => {
		if (
			displayMenu &&
			// menuButtonRef.current 指向菜单按钮对应的dom对象
			menuButtonRef.current &&
			// 如果点击的不是菜单按钮
			!menuButtonRef.current.contains(event.target) &&
			!(event.target instanceof HTMLSelectElement)
		) {
			toggleDisplayMenu();
		}
	}

	// 对应componentDidMount
	useEffect(() => {
		document.addEventListener('click',  clickOutsideEventListener);
	}, []);  // eslint-disable-line react-hooks/exhaustive-deps

	// 对应componentWillUnmount
	useEffect(() => {
		// 返回一个函数，这个函数会在组件卸载前被调用
		return () => {
			document.removeEventListener('click', clickOutsideEventListener);
		}
	}, []);  // eslint-disable-line react-hooks/exhaustive-deps


	return (
		<>
			<header>
				<UniversalNav
					displayMenu={displayMenu}
					fetchState={fetchState}
					menuButtonRef={menuButtonRef}
					toggleDisplayMenu={toggleDisplayMenu}
					user={user}
				/>
			</header>
		</>
	);
}

Header.displayName = 'Header';

export default Header;