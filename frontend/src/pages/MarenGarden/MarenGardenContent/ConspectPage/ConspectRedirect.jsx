// ConspectRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConspectRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/conspects');
  }, [navigate]);

  return null;
};

export default ConspectRedirect;
