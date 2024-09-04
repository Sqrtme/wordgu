import React, { ChangeEvent, useState } from 'react';
import { registerUser, loginUser, destroySession } from 'src/api';
import 'src/styles.scss';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'src/api/storage';

const PageLogin = () => {
  const [inputData, setInputData] = useState<{ login: string; password: string }>({ login: '', password: '' })
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setInputData((prev) => ({
      ...prev,
      [field]: e.target.value
    }))
  };
  const onRegistration = () => {
    registerUser(inputData);
  }
  const onLogin = async () => {
    const response = await loginUser(inputData);
    if (response.status === 200) {
      navigate('/profile')
    }
  }

  const onLogout = () => {
    destroySession();
    navigate('/');
  }

  if (getToken()) {
    return (
      <div className="layout">
        <div className="login_centered">
          Вы уже авторизованы
          <div className="btn" onClick={onLogout}>Выйти</div>
        </div>
      </div>
    )
  }
  return (
    <div className="layout">
      <div className="login_centered">
        <input type="text" value={inputData.login} onChange={(e) => onChange(e, 'login')} />
        <input type="password" value={inputData.password} onChange={(e) => onChange(e, 'password')} />
        <div className="btn" onClick={onLogin} tabIndex={0}>Войти</div>
        <div className="btn-register" onClick={onRegistration} tabIndex={0}>Зарегистрироваться</div>
      </div>
    </div>
  );
}

export default PageLogin;
