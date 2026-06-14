import React, { createContext, useContext, useRef, useCallback } from 'react';

export interface EmergenceState {
  id: string;
  intensity: number;
  phase: 'presence' | 'acceleration' | 'travel' | 'arrival' | 'settlement' | 'idle';
  progress: number; // 0 to 1
  x: number; // relative to viewport
  y: number; // relative to viewport
  width: number;
  height: number;
}

export interface PulseState {
  id: string;
  x: number;
  y: number;
  color: string;
  startTime: number;
  duration: number;
}

interface EmergenceContextType {
  emergencesRef: React.MutableRefObject<Record<string, EmergenceState>>;
  pulsesRef: React.MutableRefObject<PulseState[]>;
  registerEmergence: (id: string, intensity: number) => void;
  updateEmergence: (id: string, updates: Partial<Omit<EmergenceState, 'id'>>) => void;
  unregisterEmergence: (id: string) => void;
  triggerPulse: (x: number, y: number, color?: string) => void;
}

const EmergenceContext = createContext<EmergenceContextType | undefined>(undefined);

export const useEmergence = () => {
  const context = useContext(EmergenceContext);
  if (!context) {
    throw new Error('useEmergence must be used within an EmergenceProvider');
  }
  return context;
};

export const EmergenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const emergencesRef = useRef<Record<string, EmergenceState>>({});
  const pulsesRef = useRef<PulseState[]>([]);

  const registerEmergence = useCallback((id: string, intensity: number) => {
    emergencesRef.current[id] = {
      id,
      intensity,
      phase: 'presence',
      progress: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    window.dispatchEvent(new CustomEvent('emergence-render-needed'));
  }, []);

  const updateEmergence = useCallback((id: string, updates: Partial<Omit<EmergenceState, 'id'>>) => {
    if (emergencesRef.current[id]) {
      emergencesRef.current[id] = {
        ...emergencesRef.current[id],
        ...updates,
      };
    }
  }, []);

  const unregisterEmergence = useCallback((id: string) => {
    delete emergencesRef.current[id];
    window.dispatchEvent(new CustomEvent('emergence-render-needed'));
  }, []);

  const triggerPulse = useCallback((x: number, y: number, color = '#00C8FF') => {
    const pulseId = `${Date.now()}-${Math.random()}`;
    pulsesRef.current.push({
      id: pulseId,
      x,
      y,
      color,
      startTime: performance.now(),
      duration: 1000, // 1 second expansion ripple
    });
    window.dispatchEvent(new CustomEvent('emergence-render-needed'));
  }, []);

  return (
    <EmergenceContext.Provider
      value={{
        emergencesRef,
        pulsesRef,
        registerEmergence,
        updateEmergence,
        unregisterEmergence,
        triggerPulse,
      }}
    >
      {children}
    </EmergenceContext.Provider>
  );
};
