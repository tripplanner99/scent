import { randomUUID } from "crypto";
import type { 
  Room, 
  ScentAsset, 
  DualityPreset, 
  Doodle, 
  SiteSettings,
  InsertDoodle 
} from "@shared/schema";
import { rooms, scentAssets, dualityPresets, siteSettings } from "@/data/seedData";

// Fragrance exploration storage interface
export interface IStorage {
  // Rooms
  getRooms(): Promise<Room[]>;
  getRoom(id: string): Promise<Room | undefined>;
  
  // Scent Assets
  getScentAssets(): Promise<ScentAsset[]>;
  getScentAsset(id: string): Promise<ScentAsset | undefined>;
  
  // Duality Presets
  getDualityPresets(): Promise<DualityPreset[]>;
  getDualityPreset(id: string): Promise<DualityPreset | undefined>;
  
  // Doodles
  getDoodles(roomId: string): Promise<Doodle[]>;
  createDoodle(doodle: InsertDoodle): Promise<Doodle>;
  deleteDoodle(id: string): Promise<boolean>;
  
  // Scent Placements (simplified for demo)
  getPlacedScents(roomId: string): Promise<Array<{ scent: ScentAsset; x: number; y: number; id: string }>>;
  addPlacedScent(roomId: string, scentId: string, x: number, y: number): Promise<string>;
  removePlacedScent(id: string): Promise<boolean>;
  
  // Site Settings
  getSiteSettings(): Promise<SiteSettings>;
}

export class MemStorage implements IStorage {
  private doodles: Map<string, Doodle>;
  private placedScents: Map<string, Array<{ scent: ScentAsset; x: number; y: number; id: string }>>;

  constructor() {
    this.doodles = new Map();
    this.placedScents = new Map();
    
    // Initialize empty placement maps for each room
    rooms.forEach(room => {
      this.placedScents.set(room.id, []);
    });
  }

  // Rooms
  async getRooms(): Promise<Room[]> {
    return rooms;
  }

  async getRoom(id: string): Promise<Room | undefined> {
    return rooms.find(room => room.id === id);
  }

  // Scent Assets
  async getScentAssets(): Promise<ScentAsset[]> {
    return scentAssets;
  }

  async getScentAsset(id: string): Promise<ScentAsset | undefined> {
    return scentAssets.find(asset => asset.id === id);
  }

  // Duality Presets
  async getDualityPresets(): Promise<DualityPreset[]> {
    return dualityPresets;
  }

  async getDualityPreset(id: string): Promise<DualityPreset | undefined> {
    return dualityPresets.find(preset => preset.id === id);
  }

  // Doodles
  async getDoodles(roomId: string): Promise<Doodle[]> {
    return Array.from(this.doodles.values()).filter(doodle => doodle.roomId === roomId);
  }

  async createDoodle(insertDoodle: InsertDoodle): Promise<Doodle> {
    const id = randomUUID();
    const doodle: Doodle = { 
      ...insertDoodle, 
      id,
      timestamp: new Date().toISOString()
    };
    this.doodles.set(id, doodle);
    return doodle;
  }

  async deleteDoodle(id: string): Promise<boolean> {
    return this.doodles.delete(id);
  }

  // Scent Placements
  async getPlacedScents(roomId: string): Promise<Array<{ scent: ScentAsset; x: number; y: number; id: string }>> {
    return this.placedScents.get(roomId) || [];
  }

  async addPlacedScent(roomId: string, scentId: string, x: number, y: number): Promise<string> {
    const scent = await this.getScentAsset(scentId);
    if (!scent) {
      throw new Error(`Scent asset ${scentId} not found`);
    }

    const placementId = randomUUID();
    const placement = { scent, x, y, id: placementId };
    
    const roomPlacements = this.placedScents.get(roomId) || [];
    roomPlacements.push(placement);
    this.placedScents.set(roomId, roomPlacements);
    
    return placementId;
  }

  async removePlacedScent(id: string): Promise<boolean> {
    const roomIds = Array.from(this.placedScents.keys());
    for (const roomId of roomIds) {
      const placements = this.placedScents.get(roomId) || [];
      const index = placements.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        placements.splice(index, 1);
        this.placedScents.set(roomId, placements);
        return true;
      }
    }
    return false;
  }

  // Site Settings
  async getSiteSettings(): Promise<SiteSettings> {
    return siteSettings;
  }
}

export const storage = new MemStorage();
