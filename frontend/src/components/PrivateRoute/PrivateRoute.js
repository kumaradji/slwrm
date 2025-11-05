// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ element, requiredGroup }) => {
  const { isLoggedIn, user } = useAuth();

  console.log('🔐 PrivateRoute проверка:', {
    path: window.location.pathname,
    isLoggedIn,
    requiredGroup,
    user: user, // ПОЛНЫЙ объект пользователя
    userGroups: user?.groups, // текущие группы
    allUserKeys: user ? Object.keys(user) : [] // все ключи
  });

  if (!isLoggedIn) {
    console.log('❌ Не авторизован - редирект на /auth');
    return <Navigate to="/auth" />;
  }

  if (requiredGroup) {
    // Поддержка нескольких групп через запятую: "VIP,VIP2"
    const requiredGroups = requiredGroup.split(',').map(group => group.trim());

    console.log('📋 Требуемые группы:', requiredGroups);
    console.log('👤 Группы пользователя:', user?.groups);

    // Проверяем, есть ли у пользователя хотя бы одна из требуемых групп
    const hasAccess = requiredGroups.some(group =>
      user.groups && user.groups.includes(group)
    );

    console.log('✅ Доступ разрешен?', hasAccess);

    if (!hasAccess) {
      console.log(`❌ Нет группы ${requiredGroup} - редирект на /auth`);
      return <Navigate to="/auth" />;
    }
  }

  console.log('🎉 Доступ разрешен!');
  return element;
};

export default PrivateRoute;