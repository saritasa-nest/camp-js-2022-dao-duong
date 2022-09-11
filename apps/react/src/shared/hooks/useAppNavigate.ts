import { useNavigate, useSearchParams } from 'react-router-dom';

export const useAppNavigate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const navigateWithSearchParams = (path: string) => {
    navigate({ pathname: path, search: searchParams.toString() });
  };
  return { navigateWithSearchParams };
};
