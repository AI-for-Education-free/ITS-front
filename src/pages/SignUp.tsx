import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";


import Message from '../components/Message';
import { checkPassword, checkEmail } from '../utils/check';
import { register } from "../utils/ajax/student";

const SignUp = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [account, setAccountl] = useState("");
  const [password, setPassword] = useState("");
  const [prompt, setPrompt] = useState("");


  return (
    <div className='login-container'>
      <form className='login-form' noValidate>
        <input type="text" placeholder={t("system.tip-name")} onChange={(e) => {
          setName(e.target.value);
        }} />
        <input type="text" placeholder={t("system.tip-account")} onChange={(e) => {
          setAccountl(e.target.value);
        }} />
        <input type="password" placeholder={t("system.tip-password")} onChange={(e) => {
          setPassword(e.target.value);
        }} />
        {prompt !== "" && <Message type={prompt === "注册成功，跳转登入界面中，请稍等······" ? "success" : "error"} msg={prompt} />}
        <div className='button' onClick={(): void => {
          if (name !== "" && checkEmail(account) && checkPassword(password)) {
            register({ "name": name, "email": account, "password": password })
              .then((response) => {
                const data = response.data;
                if (data.flag) {
                  setPrompt("注册成功，跳转登入界面中，请稍等······");
                  // 将该邮箱缓存到浏览器
                  let usedEmailsStr = localStorage.getItem("usedEmails");
                  if (usedEmailsStr !== null) {
                    // 之前有缓存
                    const usedEmails: Array<string> = JSON.parse(usedEmailsStr);
                    // 判断该邮箱是否已经存在
                    let emailExists: boolean = false;
                    for (let i = 0; i < usedEmails.length; i++) {
                      if (usedEmails[i] === account) {
                        emailExists = true;
                        break;
                      }
                    }
                    if (!emailExists) {
                      usedEmails.push(account);
                      usedEmailsStr = JSON.stringify(usedEmails);
                      localStorage.setItem("usedEmails", usedEmailsStr);
                    }
                  } else {
                    // 之前没缓存
                    const usedEmails: Array<string> = [];
                    usedEmails.push(account);
                    usedEmailsStr = JSON.stringify(usedEmails);
                    localStorage.setItem("usedEmails", usedEmailsStr);
                  }
                  setTimeout(() => {
                    navigate("/login");
                  }, 3000);
                } else {
                  setPrompt(data.msg);
                }
              });

          }
          if (name === "") {
            setPrompt("用户名不能为空");
            return;
          }
          if (!checkEmail(account)) {
            setPrompt("邮箱格式不对");
            return;
          }
          if (!checkPassword(password)) {
            setPrompt("密码格式不对");
            return;
          }
        }}>{t('system.sign-up-submit')}</div>
      </form>

    </div>
  )
};

SignUp.displayName = "SignUp";
export default SignUp;