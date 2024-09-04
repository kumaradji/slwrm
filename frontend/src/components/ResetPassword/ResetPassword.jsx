import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import styles from './ResetPassword.module.scss';
import Modal from '../../components/Modal/Modal';

const ResetPassword = () => {
  const {uid, token} = useParams(); // Получаем uid и token из URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Пароли не совпадают.');
      return;
    }

    try {
      // Отправляем запрос на сервер для сброса пароля
      const response = await fetch('http://localhost:8000/api/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({uid, token, password})
      });

      if (response.ok) {
        setMessage('Пароль успешно изменен.');
      } else {
        setMessage('Ошибка при изменении пароля.');
      }
    } catch (error) {
      setMessage('Произошла ошибка. Попробуйте позже.');
    }
  };

  return (
    <div className={styles.resetPassword}>
      <div> <h2>Сброс пароля</h2>
        <form onSubmit={handlePasswordReset}>
          <input
            type="text"
            placeholder="Новый пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Подтвердите новый пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className={styles.button_reset} type="submit">Изменить пароль</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;