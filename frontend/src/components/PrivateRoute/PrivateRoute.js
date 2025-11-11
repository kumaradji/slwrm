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
    return <Navigate to="/auth" />;
  }

  if (requiredGroup) {
    // Поддержка нескольких групп через запятую: "VIP,VIP2"
    const requiredGroups = requiredGroup.split(',').map(group => group.trim());
    const hasAccess = requiredGroups.some(group =>
      user.groups && user.groups.includes(group)
    );

    if (!hasAccess) {
      return <Navigate to="/auth" />;
    }
  }
  return element;
};

export default PrivateRoute;