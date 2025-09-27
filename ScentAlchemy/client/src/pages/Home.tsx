import { useState } from 'react';
import HomePage from '@/components/HomePage';
import RoomCanvas from '@/components/RoomCanvas';
import AssetPalette from '@/components/AssetPalette';
import DualitySwitcher from '@/components/DualitySwitcher';
import { DualityProvider } from '@/contexts/DualityContext';
import type { Room, ScentAsset } from '@shared/schema';

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [draggedScent, setDraggedScent] = useState<ScentAsset | null>(null);

  const handleRoomSelect = (room: Room) => {
    console.log('Navigating to room:', room.name);
    setSelectedRoom(room);
  };

  const handleBackToHome = () => {
    console.log('Navigating back to home');
    setSelectedRoom(null);
  };

  const handleDragStart = (scent: ScentAsset) => {
    setDraggedScent(scent);
  };

  const handleDragEnd = () => {
    setDraggedScent(null);
  };

  return (
    <DualityProvider>
      <div className="h-screen flex bg-background text-foreground">
        {/* Global Duality Switcher */}
        <DualitySwitcher />

        {selectedRoom ? (
          // Room View Layout
          <>
            {/* Left Sidebar - Asset Palette */}
            <div className="w-80 border-r bg-card">
              <AssetPalette 
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            </div>
            
            {/* Main Room Canvas */}
            <div className="flex-1">
              <RoomCanvas
                room={selectedRoom}
                onBack={handleBackToHome}
              />
            </div>
          </>
        ) : (
          // Home Page View
          <div className="flex-1">
            <HomePage onRoomSelect={handleRoomSelect} />
          </div>
        )}
      </div>
    </DualityProvider>
  );
}