import DualitySwitcher from '../DualitySwitcher';
import { DualityProvider } from '@/contexts/DualityContext';

export default function DualitySwitcherExample() {
  return (
    <DualityProvider>
      <div className="relative h-32 bg-background">
        <DualitySwitcher />
      </div>
    </DualityProvider>
  );
}