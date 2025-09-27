import RoomCanvas from '../RoomCanvas';
import { DualityProvider } from '@/contexts/DualityContext';
import { rooms } from '@/data/seedData';

export default function RoomCanvasExample() {
  return (
    <DualityProvider>
      <div className="h-96 bg-background">
        <RoomCanvas 
          room={rooms[0]}
          onBack={() => console.log('Back clicked')}
        />
      </div>
    </DualityProvider>
  );
}