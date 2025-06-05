import type { UserProfile } from "./api";

export type Session = {
  id: string;
  githubId: string;
  username: string;
  image?: string;
};

export type AuthError = {
  message: string;
  status: number;
};

export interface AuthState {
  user: UserProfile | null;
  isPending: boolean;
  error: string | null;
  login: () => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface SyncState {
  isSyncing: boolean;
  setSyncing: (syncing: boolean) => void;
  lastSyncTime: Date | null;
  setLastSyncTime: (time: Date) => void;
}
