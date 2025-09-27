import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Room, ScentAsset } from '@shared/schema';

// Hook to get all rooms
export function useRooms() {
  return useQuery<Room[]>({
    queryKey: ['/api/rooms'],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

// Hook to get a specific room
export function useRoom(roomId: string) {
  return useQuery<Room>({
    queryKey: ['/api/rooms', roomId],
    enabled: !!roomId,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to get placed scents in a room
export function usePlacedScents(roomId: string) {
  return useQuery<Array<{ scent: ScentAsset; x: number; y: number; id: string }>>({
    queryKey: ['/api/rooms', roomId, 'placements'],
    enabled: !!roomId,
  });
}

// Hook to place a scent in a room
export function usePlaceScent(roomId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ scentId, x, y }: { scentId: string; x: number; y: number }) => {
      const response = await fetch(`/api/rooms/${roomId}/placements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scentId, x, y }),
      });
      if (!response.ok) throw new Error('Failed to place scent');
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch placed scents
      queryClient.invalidateQueries({ queryKey: ['/api/rooms', roomId, 'placements'] });
    },
  });
}

// Hook to remove a placed scent
export function useRemovePlacedScent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (placementId: string) => {
      const response = await fetch(`/api/placements/${placementId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove placement');
      return response.json();
    },
    onSuccess: () => {
      // Invalidate all placement queries
      queryClient.invalidateQueries({ queryKey: ['/api/rooms'] });
    },
  });
}