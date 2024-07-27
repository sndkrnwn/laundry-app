// hooks/useHistory.js
import { useRouter } from 'next/navigation';

const useHistory = () => {
  const router = useRouter();

  const push = (url) => {
    router.push(url);
  };

  const replace = (url) => {
    router.replace(url);
  };

  const goBack = () => {
    router.back();
  };

  const getQuery = () => {
    return router.query;
  };

  return {
    push,
    replace,
    goBack,
    getQuery,
    pathname: router.pathname,
    route: router.route,
    asPath: router.asPath,
  };
};

export default useHistory;