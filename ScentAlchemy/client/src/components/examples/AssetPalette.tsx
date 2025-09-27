import AssetPalette from '../AssetPalette';
import { DualityProvider } from '@/contexts/DualityContext';

export default function AssetPaletteExample() {
  return (
    <DualityProvider>
      <div className="w-80 h-96 bg-background">
        <AssetPalette />
      </div>
    </DualityProvider>
  );
}