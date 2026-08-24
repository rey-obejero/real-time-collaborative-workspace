import { authenticationApi } from '../api/authentication-api';
import { getApiErrorMessage } from '@/lib/api-error';
import { useAuthenticationStore } from '../stores/authentication-store';
import type {
  LoginRequest,
  SignUpRequest,
} from '../types/authentication.types';

export const useAuthentication = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setAuthentication: setAuth,
    setLoading,
    setError,
  } = useAuthenticationStore();

  const signUp = async (data: SignUpRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authenticationApi.signUp(data);
      const user = response.user;
      const accessToken = response.accessToken;

      setAuth(user, accessToken);

      return {
        success: true,
      };
    } catch (error) {
      const message = getApiErrorMessage(error, 'Sign up failed');
      setLoading(false);
      setError(message);
    }
  };

  const signIn = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authenticationApi.login(data);
      const user = response.user;
      const accessToken = response.accessToken;

      setAuth(user, accessToken);

      return {
        success: true,
      };
    } catch (error) {
      const message = getApiErrorMessage(error, 'Sign in failed');
      setLoading(false);
      setError(message);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signUp,
    signIn,
  };
};
