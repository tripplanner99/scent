import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Doodle, InsertDoodle } from '@shared/schema';

// Hook to get doodles for a room
export function useDoodles(roomId: string) {
  return useQuery<Doodle[]>({
    queryKey: ['/api/rooms', roomId, 'doodles'],
    enabled: !!roomId,
  });
}

// Hook to save a doodle
export function useSaveDoodle(roomId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (doodleData: Omit<InsertDoodle, 'roomId'>) => {
      const response = await fetch(`/api/rooms/${roomId}/doodles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doodleData),
      });
      if (!response.ok) throw new Error('Failed to save doodle');
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch doodles for this room
      queryClient.invalidateQueries({ queryKey: ['/api/rooms', roomId, 'doodles'] });
    },
  });
}

// Hook to delete a doodle
export function useDeleteDoodle(roomId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (doodleId: string) => {
      const response = await fetch(`/api/doodles/${doodleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete doodle');
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch doodles for this room
      queryClient.invalidateQueries({ queryKey: ['/api/rooms', roomId, 'doodles'] });
    },
  });
}