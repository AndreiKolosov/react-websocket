import { useEffect, type FC } from 'react';
import { LoginSection } from '../components/login-section/LoginSection';
import { useAppStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTS } from '../router/app-routs';

const LoginPage: FC = () => {
  const userName = useAppStore((store) => store.userName);
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      navigate(APP_ROUTS.ROOT, { replace: true });
    }
  }, [navigate, userName]);

  return (
    <>
      <LoginSection />
    </>
  );
};

export { LoginPage };
