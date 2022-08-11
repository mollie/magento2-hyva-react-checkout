import { useContext } from 'react';
import AppContext from '../../../../context/App/AppContext';

export default function useMollieAppContext() {
  const [, { dispatch: appDispatch, setErrorMessage, setPageLoader }] =
    useContext(AppContext);

  return {
    appDispatch,
    setErrorMessage,
    setPageLoader,
  };
}
