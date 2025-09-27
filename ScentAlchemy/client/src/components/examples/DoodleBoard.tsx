import { useState } from 'react';
import DoodleBoard from '../DoodleBoard';
import { Button } from '@/components/ui/button';

export default function DoodleBoardExample() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="h-64 flex items-center justify-center bg-background">
      <Button onClick={() => setIsVisible(true)}>
        Open Doodle Board
      </Button>
      <DoodleBoard 
        roomId="living-room" 
        isVisible={isVisible} 
        onClose={() => setIsVisible(false)} 
      />
    </div>
  );
}