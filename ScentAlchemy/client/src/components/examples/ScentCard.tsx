import ScentCard from '../ScentCard';
import { DualityProvider } from '@/contexts/DualityContext';
import { scentAssets } from '@/data/seedData';

export default function ScentCardExample() {
  return (
    <DualityProvider>
      <div className="w-64 bg-background p-4">
        <ScentCard scent={scentAssets[0]} />
      </div>
    </DualityProvider>
  );
}