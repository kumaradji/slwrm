// Profile.jsx - УЛУЧШЕННАЯ ВЕРСИЯ
import React, {useState, useEffect, useCallback} from 'react';
import {useAuth} from '../../context/AuthContext';
import {useNavigate, Link} from 'react-router-dom';
import styles from './Profile.module.scss';
import Modal from '../../components/Modal/Modal.jsx';
import defaultAvatar from '../../assets/default_user_icon.png';
import {logToServer} from "../../services/logger";
import {Helmet} from 'react-helmet';

const Profile = () => {
  const {user, fetchUserData, logout} = useAuth();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const [isAvatarSelected, setIsAvatarSelected] = useState(false);

  // ✅ Состояние для мастер-классов
  const [masterclasses, setMasterclasses] = useState([]);
  const [masterclassesLoading, setMasterclassesLoading] = useState(true);

  const fetchUserDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetchUserData();

      // ✅ Добавлена проверка на наличие пользователя
      if (!user) {
        logToServer('Пользователь не авторизован при получении данных', 'error');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден');
      }

      const avatarResponse = await fetch('/api/profile/avatar/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (avatarResponse.ok) {
        const data = await avatarResponse.json();
        setAvatarUrl(`${data.avatar}`);
      } else {
        logToServer(`Ошибка при получении аватара: ${avatarResponse.statusText}`, 'error');
      }
    } catch (error) {
      logToServer(`Ошибка при получении данных пользователя: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserData, user]);

  // ✅ Улучшенная функция получения мастер-классов
  const fetchMasterclasses = useCallback(async () => {
    setMasterclassesLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден');
      }

      const response = await fetch('/api/masterclass/list/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMasterclasses(data.masterclasses || []);
    } catch (error) {
      logToServer(`Ошибка при получении мастер-классов: ${error.message}`, 'error');
      setMasterclasses([]);
    } finally {
      setMasterclassesLoading(false);
    }
  }, []);

  // ✅ Исправленный useEffect без бесконечного рендеринга
  useEffect(() => {
    if (!isProfileFetched) {
      const fetchData = async () => {
        await fetchUserDetails();
        await fetchMasterclasses();
        setIsProfileFetched(true);
      };
      fetchData();
    }
  }, [isProfileFetched]); // Убраны зависимости функций

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // ✅ Улучшенная функция перехода на мастер-класс
  const handleMasterclassClick = (masterclass) => {
    if (masterclass.has_access) {
      // Специальная обработка для существующих мастер-классов
      if (masterclass.slug === 'marena-garden') {
        navigate('/masterclass');
      } else if (masterclass.slug === 'graphica') {
        navigate('/graphica');
      } else {
        navigate(`/masterclass/${masterclass.slug}`);
      }
    } else {
      setModalMessage(
        `Доступ к мастер-классу "${masterclass.title}" закрыт.\n\n` +
        `Для получения доступа необходимо быть в группе ${masterclass.required_group || 'VIP'}.\n\n` +
        `Стоимость: ${masterclass.price || 'не указана'} ₽`
      );
      setIsModalOpen(true);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ✅ Проверка типа файла
      if (!file.type.startsWith('image/')) {
        setModalMessage('Пожалуйста, выберите файл изображения');
        setIsModalOpen(true);
        return;
      }

      // ✅ Проверка размера файла (например, до 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setModalMessage('Размер файла не должен превышать 5MB');
        setIsModalOpen(true);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
        setAvatar(file);
        setIsAvatarSelected(true);
      };
      reader.onerror = () => {
        setModalMessage('Ошибка при чтении файла');
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatar) return;

    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден');
      }

      const response = await fetch('/api/profile/avatar/', {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setModalMessage('Аватар успешно загружен');
        setIsAvatarSelected(false);
        // ✅ Перезагружаем данные пользователя для обновления аватара
        await fetchUserDetails();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setModalMessage('Ошибка при загрузке аватара');
      setIsModalOpen(true);
      logToServer(`Ошибка при загрузке аватара: ${error.message}`, 'error');
    }
  };

  // ✅ Улучшенная обработка состояний загрузки
  if (isLoading) {
    return (
      <div className={styles.profile}>
        <div className={styles.loading}>Загрузка профиля...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.profile}>
        <div className={styles.error}>
          Пользователь не найден. Пожалуйста, <Link to="/auth">войдите в систему</Link>.
        </div>
      </div>
    );
  }

  // ✅ Только доступные мастер-классы
  const availableMasterclasses = masterclasses.filter(mc => mc.has_access);

  return (
    <div className={styles.profile}>
      <Helmet>
        <title>ДушуГрею | Личный кабинет</title>
        <meta name="description" content="Личный кабинет пользователя сайта ДушуГрею"/>
        <meta name="keywords" content="экопринт, личный кабинет, профиль, ДушуГрею"/>
      </Helmet>

      <div className={styles.cardProfile}>
        <h3>Профиль</h3>
        <div className={styles.profileInfo}>
          <img
            src={avatarUrl || defaultAvatar}
            alt="Аватар пользователя"
            className={styles.userIcon}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />
          <div className={styles.userInfo}>
            <p className={styles.userName}><strong>Имя пользователя:</strong> {user.username}</p>
            <br/>
            <p className={styles.userName}><strong>Email:</strong> {user.email}</p>
          </div>
        </div>

        {/* ✅ Убран дублирующий input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{display: 'none'}}
          id="avatarUpload"
        />

        <div className={styles.textAvatarAddBlock}>
          {!avatarUrl && !isAvatarSelected ? (
            <label htmlFor="avatarUpload" className={styles.customFileUpload}>
              Выберите файл
            </label>
          ) : isAvatarSelected ? (
            <div className={styles.profile__addButton} onClick={handleAvatarUpload}>
              Загрузить аватар
            </div>
          ) : (
            <label htmlFor="avatarUpload" className={styles.customFileUpload}>
              Изменить аватар
            </label>
          )}

          <Link to="/change-password" className={styles.profile__link}>Изменить пароль</Link>
          <div onClick={handleLogout} className={styles.profile__logoutButton}>
            Выйти
          </div>
        </div>
      </div>

      {/* ✅ ОБНОВЛЕННЫЙ БЛОК: Только доступные мастер-классы (просто названия) */}
      <div className={styles.cardMasterClasses}>
        <h3>Мастер-классы</h3>

        {masterclassesLoading ? (
          <p className={styles.loading}>Загрузка мастер-классов...</p>
        ) : (
          <>
            {/* Только доступные мастер-классы - просто названия */}
            {availableMasterclasses.length > 0 ? (
              <div className={styles.availableMasterclasses}>
                <ul>
                  {availableMasterclasses.map((mc) => (
                    <li key={mc.slug}>
                      <button
                        className={`${styles.masterclass} ${styles.masterclassAvailable}`}
                        onClick={() => handleMasterclassClick(mc)}
                      >
                        {mc.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className={styles.noMasterclasses}>У вас пока нет доступных мастер-классов.</p>
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default Profile;