import axios from "axios";

/**
 * Extract user-friendly error message from various error types
 * @param error - The error object (AxiosError, Error, or unknown)
 * @param defaultMessage - Fallback message if no specific message found
 * @returns User-friendly error message string
 */
export const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  // Handle AxiosError with server response message
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || defaultMessage;
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback for unknown error types
  return defaultMessage;
};
