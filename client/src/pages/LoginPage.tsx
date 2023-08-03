import { useEffect, type FC } from 'react';
import { LoginSection } from '../components/login-section/LoginSection';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTS } from '../router/app-routs';
import { useAuth } from '../hooks';

const LoginPage: FC = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(APP_ROUTS.ROOT, { replace: true });
    }
  }, [navigate, isAuth]);

  return (
    <>
      <LoginSection />
    </>
  );
};

export { LoginPage };
