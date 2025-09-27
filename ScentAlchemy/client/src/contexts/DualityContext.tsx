import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dualityPresets } from '@/data/seedData';
import type { DualityPreset } from '@shared/schema';

interface DualityContextType {
  currentDuality: DualityPreset;
  currentVariant: 'A' | 'B';
  toggleDuality: () => void;
  setDualityPreset: (presetId: string) => void;
  availablePresets: DualityPreset[];
}

const DualityContext = createContext<DualityContextType | undefined>(undefined);

export function DualityProvider({ children }: { children: ReactNode }) {
  const [currentPresetId, setCurrentPresetId] = useState('day-night');
  const [currentVariant, setCurrentVariant] = useState<'A' | 'B'>('A');

  const currentDuality = dualityPresets.find(p => p.id === currentPresetId) || dualityPresets[0];

  const toggleDuality = () => {
    console.log('Duality toggled:', currentVariant === 'A' ? 'B' : 'A');
    setCurrentVariant(prev => prev === 'A' ? 'B' : 'A');
  };

  const setDualityPreset = (presetId: string) => {
    console.log('Duality preset changed to:', presetId);
    setCurrentPresetId(presetId);
  };

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (currentVariant === 'B') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [currentVariant]);

  return (
    <DualityContext.Provider value={{
      currentDuality,
      currentVariant,
      toggleDuality,
      setDualityPreset,
      availablePresets: dualityPresets,
    }}>
      {children}
    </DualityContext.Provider>
  );
}

export function useDuality() {
  const context = useContext(DualityContext);
  if (context === undefined) {
    throw new Error('useDuality must be used within a DualityProvider');
  }
  return context;
}