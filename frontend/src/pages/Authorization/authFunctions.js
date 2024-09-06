export const handleLogin = async (email, username, password, login, navigate, setError, setLoginAttempts) => {
  try {
    const response = await fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username || null, email: email || null, password }),
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      const userData = {
        id: data.user_id,
        email: data.email,
        // Другие поля пользователя
      };
      login(userData, data.token);
      navigate('/');
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'Неверный логин или пароль');
      setLoginAttempts((prevAttempts) => prevAttempts + 1);
    }
  } catch (error) {
    console.error('Ошибка входа:', error);
    setError('Ошибка входа');
    setLoginAttempts((prevAttempts) => prevAttempts + 1);
  }
};


export const handleRegistration = async (password, confirmPassword, username, email, setError, setModalMessage, setIsModalOpen, login, navigate) => {
  if (password !== confirmPassword) {
    setError('Пароли не совпадают');
    setIsModalOpen(true);
    setModalMessage('Пароли не совпадают');
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Успешная регистрация
      setModalMessage('Регистрация успешна! Выполняется вход...');
      setIsModalOpen(true);

      // Автоматический вход пользователя
      login({ id: data.user_id, email: data.email }, data.token);

      setIsModalOpen(false);
      navigate('/');
    } else {
      setError(data.error || JSON.stringify(data) || 'Ошибка регистрации');
      setIsModalOpen(true);
      setModalMessage(data.error || JSON.stringify(data) || 'Ошибка регистрации');
    }
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    setError('Ошибка регистрации');
    setIsModalOpen(true);
    setModalMessage('Ошибка регистрации');
  }
};

export const handleResetPassword = async (e, email, setError, setModalMessage, setIsModalOpen, setMode) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8000/api/reset-password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setModalMessage('Проверьте ваш email для инструкций по сбросу пароля.');
      setIsModalOpen(true); // Открываем модальное окно
      setMode('login');
    } else {
      setError('Ошибка при сбросе пароля');
    }
  } catch (error) {
    console.error('Ошибка при сбросе пароля:', error);
    setError('Ошибка при сбросе пароля');
  }
};