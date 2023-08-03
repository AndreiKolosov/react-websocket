import { useAppStore } from '../store/appStore'

const useAuth = () => {
  const userName = useAppStore(store => store.userName);

  const isAuth = userName ?? false;

  return { isAuth } 
}

export { useAuth }