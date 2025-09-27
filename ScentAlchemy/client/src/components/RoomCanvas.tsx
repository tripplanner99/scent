import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Palette, ArrowLeft, Sparkles } from 'lucide-react';
import { useDuality } from '@/contexts/DualityContext';
import { usePlacedScents, usePlaceScent } from '@/hooks/useRooms';
import { useScent } from '@/hooks/useScents';
import { useToast } from '@/hooks/use-toast';
import DoodleBoard from './DoodleBoard';
import type { Room, ScentAsset } from '@shared/schema';

interface RoomCanvasProps {
  room: Room;
  onBack: () => void;
}

export default function RoomCanvas({ room, onBack }: RoomCanvasProps) {
  const { currentVariant } = useDuality();
  const [showDoodleBoard, setShowDoodleBoard] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  // Fetch placed scents for this room
  const { data: placedScents = [], refetch } = usePlacedScents(room.id);
  const placeScent = usePlaceScent(room.id);
  
  const currentDescription = currentVariant === 'A' ? room.descriptionA : room.descriptionB;
  const currentImage = currentVariant === 'A' ? room.imageA : room.imageB;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const scentId = e.dataTransfer.getData('text/plain');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    console.log('Scent dropped in room:', scentId, 'at position:', x, y);
    
    try {
      await placeScent.mutateAsync({ scentId, x, y });
      toast({
        title: "Scent placed!",
        description: `Successfully added scent to ${room.name}`,
      });
    } catch (error) {
      console.error('Failed to place scent:', error);
      toast({
        title: "Failed to place scent",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col" data-testid={`room-canvas-${room.id}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            data-testid="button-back-to-home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="font-serif text-2xl">{room.name}</h1>
            <p className="text-sm text-muted-foreground">{currentDescription}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" data-testid="text-current-variant">
            {currentVariant === 'A' ? 'Day Mode' : 'Night Mode'}
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowDoodleBoard(true)}
            data-testid="button-open-doodle"
          >
            <Palette className="w-4 h-4 mr-2" />
            Doodle & Express
          </Button>
        </div>
      </div>

      {/* Room Canvas */}
      <div className="flex-1 relative">
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isDragOver ? 'bg-accent/20 border-2 border-accent border-dashed' : 'bg-muted/10'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          data-testid="drop-zone-room"
        >
          {/* Room background - placeholder for room image */}
          <div className="absolute inset-0 bg-gradient-to-br from-background to-muted/50">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <div className="w-32 h-32 mx-auto bg-card rounded-lg flex items-center justify-center border-2 border-dashed">
                  <Sparkles className="w-8 h-8" />
                </div>
                <p className="text-sm">{room.name} Ambience</p>
                <p className="text-xs">Drag scents here to create your perfect atmosphere</p>
              </div>
            </div>
          </div>

          {/* Placed scents */}
          {placedScents.map((placed) => (
            <Tooltip key={placed.id}>
              <TooltipTrigger asChild>
                <div
                  className="absolute w-12 h-12 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center cursor-pointer hover-elevate"
                  style={{ left: `${placed.x}%`, top: `${placed.y}%` }}
                  data-testid={`placed-scent-${placed.id}`}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-semibold">{placed.scent.title}</p>
                  <p className="text-xs">{placed.scent.category}</p>
                  <p className="text-xs text-muted-foreground">
                    Perfect for {currentVariant === 'A' ? 'day' : 'evening'} ambience
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}

          {/* Drop zone overlay */}
          {isDragOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-accent/10">
              <Card className="p-6">
                <CardContent className="text-center space-y-2">
                  <Sparkles className="w-8 h-8 mx-auto text-accent" />
                  <p className="font-semibold">Release to place scent</p>
                  <p className="text-sm text-muted-foreground">
                    Create the perfect fragrance experience
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Doodle Board */}
      <DoodleBoard 
        roomId={room.id}
        isVisible={showDoodleBoard}
        onClose={() => setShowDoodleBoard(false)}
      />
    </div>
  );
}