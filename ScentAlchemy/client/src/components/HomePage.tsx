import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Home, MapPin, Sparkles } from 'lucide-react';
import { useDuality } from '@/contexts/DualityContext';
import { useRooms } from '@/hooks/useRooms';
import type { Room } from '@shared/schema';

interface HomePageProps {
  onRoomSelect: (room: Room) => void;
}

export default function HomePage({ onRoomSelect }: HomePageProps) {
  const { currentVariant, currentDuality } = useDuality();
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const { data: rooms, isLoading, error } = useRooms();

  const currentTheme = currentVariant === 'A' ? currentDuality.nameA : currentDuality.nameB;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="font-serif text-4xl font-bold">One Scent Club</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Loading your fragrance exploration experience...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !rooms) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="font-serif text-2xl">Unable to load rooms</h2>
          <p className="text-muted-foreground">Please refresh the page to try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="font-serif text-4xl font-bold">One Scent Club</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the art of home fragrance through an interactive journey. 
            Click on any room to explore and create your perfect ambience.
          </p>
          <Badge variant="outline" className="text-sm" data-testid="text-current-theme">
            Currently experiencing: {currentTheme}
          </Badge>
        </div>

        {/* Interactive Floor Plan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {rooms.map((room) => {
            const currentDescription = currentVariant === 'A' ? room.descriptionA : room.descriptionB;
            const isHovered = hoveredRoom === room.id;
            
            return (
              <Card
                key={room.id}
                className={`cursor-pointer transition-all duration-300 hover-elevate ${
                  isHovered ? 'scale-105 shadow-lg' : ''
                }`}
                onClick={() => onRoomSelect(room)}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
                data-testid={`card-room-${room.id}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-serif flex items-center gap-2">
                      <Home className="w-5 h-5" />
                      {room.name}
                    </CardTitle>
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Room preview */}
                  <div className="w-full h-32 bg-gradient-to-br from-muted/30 to-accent/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="relative z-10 text-center space-y-2">
                      <Sparkles className="w-6 h-6 mx-auto text-primary" />
                      <p className="text-xs font-medium">
                        {currentVariant === 'A' ? 'Day Mode' : 'Night Mode'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Room description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentDescription}
                  </p>
                  
                  {/* Recommended scents preview */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold">Recommended for this mood:</p>
                    <div className="flex flex-wrap gap-1">
                      {(currentVariant === 'A' ? room.recommendedAssetsA : room.recommendedAssetsB)
                        .slice(0, 2)
                        .map((assetId) => (
                        <Badge key={assetId} variant="secondary" className="text-xs">
                          {assetId.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    data-testid={`button-explore-${room.id}`}
                  >
                    Explore & Customize
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="text-center mt-16 space-y-4">
          <h2 className="font-serif text-2xl">How to Explore</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold">Choose Your Room</h3>
              <p className="text-sm text-muted-foreground">
                Click any room to enter the interactive canvas
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold">Drag & Drop Scents</h3>
              <p className="text-sm text-muted-foreground">
                Place fragrances throughout the space to create your perfect ambience
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold">Doodle & Express</h3>
              <p className="text-sm text-muted-foreground">
                Use the doodle board to express moods and discover new scent suggestions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}