import { isAxiosError } from 'axios';

interface ApiErrorBody {
  error?: { description?: string };
}

export const getApiErrorMessage = (error: unknown, fallback: string): string =>
  isAxiosError(error)
    ? ((error.response?.data as ApiErrorBody | undefined)?.error?.description ??
      fallback)
    : fallback;
