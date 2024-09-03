import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.scss';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch('/api/reset-password-confirm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Ошибка при сбросе пароля');
      }
    } catch (error) {
      console.error('Ошибка при сбросе пароля:', error);
      setError('Произошла ошибка при попытке сброса пароля');
    }
  };

  return (
    <div className={styles.resetPassword}>
      <h2>Сброс пароля</h2>
      {error && <div className={styles.error}>{error}</div>}
      {success ? (
        <div className={styles.success}>
          Пароль успешно изменен. Вы будете перенаправлены на страницу входа.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Новый пароль:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Подтвердите пароль:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Сбросить пароль</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;