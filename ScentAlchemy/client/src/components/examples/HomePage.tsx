import HomePage from '../HomePage';
import { DualityProvider } from '@/contexts/DualityContext';

export default function HomePageExample() {
  return (
    <DualityProvider>
      <HomePage onRoomSelect={(room) => console.log('Room selected:', room.name)} />
    </DualityProvider>
  );
}