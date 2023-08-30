// @ts-nocheck

import React, { useState, createRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import './Login.css';

import Message from '../components/Message';

import { checkPassword, checkEmail } from '../utils/check';
import { login } from '../utils/ajax/student';



const Login = (): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const ref = createRef();
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [prompt, setPrompt] = useState("");
    const [focusOnAccount, setFocusOnAccount] = useState(false);
    let usedEmailsStr = localStorage.getItem("usedEmails");

    const clickOutAccountEventListener = (event) => handleClickOutside(event);

	// 当点击账户输入框以外的地方时，关闭提示
	const handleClickOutside = (event: globalThis.MouseEvent): void => {
        if (event.target.id !== "login-account") {
            setFocusOnAccount(false);
        }
        
	}

	useEffect(() => {
		document.addEventListener('click',  clickOutAccountEventListener);
	}, []);  // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		return () => {
			document.removeEventListener('click', clickOutAccountEventListener);
		}
	}, []);  // eslint-disable-line react-hooks/exhaustive-deps




    return (
        <div className='login-container'>
            <form className='login-form prompt-position' noValidate>
                <input id="login-account" type="text" placeholder={t("system.tip-account")} value={account || ""}
                onChange={(e) => {
                    setAccount(e.target.value);
                }} onFocus={() => {
                    setFocusOnAccount(true);
                }} />
                {usedEmailsStr !== null &&
                    <div className='prompt-list' style={{ "display": (focusOnAccount && (account === "")) ? "block" : "none" }}>
                        {JSON.parse(usedEmailsStr).map((emailItem: string) => (
                            <div className='prompt-item' key={emailItem} onClick={(e) => {
                                setAccount(emailItem);
                            }}>
                                {emailItem}
                            </div>
                        ))}
                    </div>}
                <input type="password" placeholder={t("system.password")} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
                {prompt !== "" && <Message type={prompt === "登入成功，跳转首页中，请稍等······" ? "success" : "error"} msg={prompt} />}
                <div className='button' onClick={(): void => {
                    if (checkEmail(account) && checkPassword(password)) {
                        login({ "email": account, "password": password })
                            .then((response) => {
                                const data = response.data;
                                if (data.flag) {
                                    setPrompt("登入成功，跳转首页中，请稍等······");
                                    localStorage.setItem("token", data.data.token);
                                    setTimeout(() => {
                                        navigate("/home");
                                    }, 3000);
                                } else {
                                    setPrompt(data.msg);
                                }
                            });
                    }
                    if (!checkEmail(account)) {
                        setPrompt("邮箱格式不对")
                    }
                    if (!checkPassword(password)) {
                        setPrompt("密码格式不对")
                    }
                }}>{t('buttons.sign-in')}</div>
                <h3 className='separator'>
                    <span>{t('system.or')}</span>
                </h3>
                <Link to="/sign-up" className='button'>{t('system.sign-up')}</Link>
            </form>

        </div>
    )
};

Login.displayName = "Login";
export default Login;