import { useEffect, type FC } from 'react';
import { LoginSection } from '../components/login-section/LoginSection';
import { useAppStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';

const LoginPage: FC = () => {
  const userName = useAppStore(store => store.userName);
  const navigate = useNavigate()
  useEffect(() => {
    if(userName) {
      navigate('/')
    }
  }, [navigate, userName])

  return (
    <>
      <LoginSection />
      <button onClick={() => navigate('/')}>asd</button>
    </>
  );
};

export { LoginPage };
