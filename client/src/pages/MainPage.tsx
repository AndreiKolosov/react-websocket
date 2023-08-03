import { type FC } from 'react';
import { EditorSection } from '../components/editor-section/EditorSection';
import { useAuth } from '../hooks';

const MainPage: FC = () => {
  const { isAuth } = useAuth();

  return (
    <>
      {isAuth && <EditorSection />}
    </>
  );
};

export { MainPage };