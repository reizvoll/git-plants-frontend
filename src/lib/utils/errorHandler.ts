import { ERROR_MESSAGES } from "@/lib/constants/constants";
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
    const serverMessage = error.response?.data?.message;
    const statusCode = error.response?.status;

    if (serverMessage && statusCode) {
      const errorCategory = ERROR_MESSAGES[statusCode as keyof typeof ERROR_MESSAGES];
      if (errorCategory) {
        const errorEntry = Object.values(errorCategory).find((err) => err.label === serverMessage);
        if (errorEntry) {
          return errorEntry.message;
        }
      }
    }

    return serverMessage || defaultMessage;
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback for unknown error types
  return defaultMessage;
};
