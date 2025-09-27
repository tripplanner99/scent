import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import ScentCard from './ScentCard';
import { useScents } from '@/hooks/useScents';
import type { ScentAsset } from '@shared/schema';

interface AssetPaletteProps {
  onDragStart?: (scent: ScentAsset) => void;
  onDragEnd?: () => void;
}

export default function AssetPalette({ onDragStart, onDragEnd }: AssetPaletteProps) {
  const { data: scentAssets, isLoading, error } = useScents();

  if (isLoading) {
    return (
      <Card className="h-full" data-testid="asset-palette">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Scent Collection</CardTitle>
          <p className="text-sm text-muted-foreground">Loading scents...</p>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error || !scentAssets) {
    return (
      <Card className="h-full" data-testid="asset-palette">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Scent Collection</CardTitle>
          <p className="text-sm text-destructive">Failed to load scent collection</p>
        </CardHeader>
      </Card>
    );
  }

  const groupedAssets = scentAssets.reduce((groups, asset) => {
    const category = asset.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(asset);
    return groups;
  }, {} as Record<string, ScentAsset[]>);

  return (
    <Card className="h-full" data-testid="asset-palette">
      <CardHeader>
        <CardTitle className="font-serif text-lg">Scent Collection</CardTitle>
        <p className="text-sm text-muted-foreground">Drag scents into rooms to create your perfect ambience</p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-4 space-y-6">
            {Object.entries(groupedAssets).map(([category, assets]) => (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{category}</h3>
                  <Separator className="flex-1" />
                </div>
                <div className="space-y-3">
                  {assets.map((asset) => (
                    <ScentCard 
                      key={asset.id} 
                      scent={asset} 
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}