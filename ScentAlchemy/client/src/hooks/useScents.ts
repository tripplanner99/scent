import { useQuery } from '@tanstack/react-query';
import type { ScentAsset } from '@shared/schema';

// Hook to get all scent assets
export function useScents() {
  return useQuery<ScentAsset[]>({
    queryKey: ['/api/scents'],
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes since scents don't change often
  });
}

// Hook to get a specific scent asset
export function useScent(scentId: string) {
  return useQuery<ScentAsset>({
    queryKey: ['/api/scents', scentId],
    enabled: !!scentId,
    staleTime: 10 * 60 * 1000,
  });
}