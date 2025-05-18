import React, { createContext, useContext, useState, ReactNode } from 'react';
import { VoiceSample, CloneJob } from 'shared-types';

/**
 * Interface defining the structure of our application state
 */
interface AppState {
  /** Current voice sample being processed */
  currentSample: VoiceSample | null;
  /** Current clone job being processed */
  currentJob: CloneJob | null;
  /** Loading state indicator */
  isLoading: boolean;
  /** Global error message */
  error: string | null;
  /** Set the current voice sample */
  setCurrentSample: (sample: VoiceSample | null) => void;
  /** Set the current clone job */
  setCurrentJob: (job: CloneJob | null) => void;
  /** Set the loading state */
  setIsLoading: (isLoading: boolean) => void;
  /** Set an error message */
  setError: (error: string | null) => void;
  /** Clear all state (reset) */
  resetState: () => void;
}

/**
 * Initial state for the application context
 */
const initialState: Omit<AppState, 'setCurrentSample' | 'setCurrentJob' | 'setIsLoading' | 'setError' | 'resetState'> = {
  currentSample: null,
  currentJob: null,
  isLoading: false,
  error: null,
};

/**
 * Create the context with a default undefined value
 * We'll provide the actual value in the AppProvider
 */
const AppContext = createContext<AppState | undefined>(undefined);

/**
 * Props for the AppProvider component
 */
interface AppProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps the application and provides the context
 * 
 * @param props - Component props
 * @returns Provider component with context value
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentSample, setCurrentSample] = useState<VoiceSample | null>(initialState.currentSample);
  const [currentJob, setCurrentJob] = useState<CloneJob | null>(initialState.currentJob);
  const [isLoading, setIsLoading] = useState<boolean>(initialState.isLoading);
  const [error, setError] = useState<string | null>(initialState.error);

  /**
   * Resets the state to initial values
   */
  const resetState = () => {
    setCurrentSample(null);
    setCurrentJob(null);
    setIsLoading(false);
    setError(null);
  };

  // Create the context value object with all state and functions
  const value: AppState = {
    currentSample,
    currentJob,
    isLoading,
    error,
    setCurrentSample,
    setCurrentJob,
    setIsLoading,
    setError,
    resetState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Custom hook to use the app context
 * @returns The app context
 * @throws Error if used outside of AppProvider
 */
export const useAppContext = (): AppState => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
