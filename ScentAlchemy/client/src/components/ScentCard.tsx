import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Clock, Wind } from 'lucide-react';
import { useDuality } from '@/contexts/DualityContext';
import type { ScentAsset } from '@shared/schema';

interface ScentCardProps {
  scent: ScentAsset;
  isDragging?: boolean;
  onDragStart?: (scent: ScentAsset) => void;
  onDragEnd?: () => void;
}

export default function ScentCard({ scent, isDragging = false, onDragStart, onDragEnd }: ScentCardProps) {
  const { currentVariant } = useDuality();
  
  const image = currentVariant === 'A' ? scent.imageA : scent.imageB;

  const handleDragStart = (e: React.DragEvent) => {
    console.log('Drag started for:', scent.title);
    e.dataTransfer.setData('text/plain', scent.id);
    onDragStart?.(scent);
  };

  const handleDragEnd = () => {
    console.log('Drag ended for:', scent.title);
    onDragEnd?.();
  };

  return (
    <Card 
      className={`cursor-move transition-all hover-elevate ${isDragging ? 'opacity-60 scale-95' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      data-testid={`card-scent-${scent.id}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-serif">{scent.title}</CardTitle>
          <Badge variant="outline" data-testid={`badge-category-${scent.id}`}>
            {scent.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Product image placeholder */}
        <div className="w-full h-16 bg-muted rounded-md flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-muted-foreground" />
        </div>
        
        {/* Fragrance notes */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Top Notes</div>
          <div className="flex flex-wrap gap-1">
            {scent.notes.top.slice(0, 2).map((note) => (
              <Badge key={note} variant="secondary" className="text-xs">
                {note}
              </Badge>
            ))}
          </div>
        </div>

        {/* Intensity indicators */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{scent.intensityProfile.strength}/10</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{scent.intensityProfile.longevity}/10</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3" />
            <span>{scent.intensityProfile.sillage}/10</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}