import { z } from "zod";

// Fragrance Exploration Data Models

export const dualityPresetSchema = z.object({
  id: z.string(),
  nameA: z.string(),
  nameB: z.string(),
  themeTokens: z.object({
    backgroundA: z.string(),
    backgroundB: z.string(),
    primaryA: z.string(),
    primaryB: z.string(),
    accentA: z.string(),
    accentB: z.string(),
  }),
});

export const scentAssetSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(['Home Care', 'Reed Diffuser', 'Devotion Incense', 'Eau de Parfum']),
  notes: z.object({
    top: z.array(z.string()),
    middle: z.array(z.string()),
    base: z.array(z.string()),
  }),
  imageA: z.string(),
  imageB: z.string(),
  intensityProfile: z.object({
    strength: z.number().min(1).max(10),
    longevity: z.number().min(1).max(10),
    sillage: z.number().min(1).max(10),
  }),
  seedExampleFromCatalogue: z.string(),
});

export const roomSchema = z.object({
  id: z.string(),
  name: z.string(),
  descriptionA: z.string(),
  descriptionB: z.string(),
  imageA: z.string(),
  imageB: z.string(),
  ambientSoundA: z.string().optional(),
  ambientSoundB: z.string().optional(),
  recommendedAssetsA: z.array(z.string()),
  recommendedAssetsB: z.array(z.string()),
});

export const doodleSchema = z.object({
  id: z.string(),
  roomId: z.string(),
  userSvg: z.string(),
  interpretedMoodTags: z.array(z.string()),
  timestamp: z.string(),
});

export const siteSettingsSchema = z.object({
  defaultDuality: z.string(),
  availableDualities: z.array(z.string()),
  enabledFeatures: z.object({
    doodleBoard: z.boolean(),
    dragDrop: z.boolean(),
    audioAmbience: z.boolean(),
  }),
});

// Type exports
export type DualityPreset = z.infer<typeof dualityPresetSchema>;
export type ScentAsset = z.infer<typeof scentAssetSchema>;
export type Room = z.infer<typeof roomSchema>;
export type Doodle = z.infer<typeof doodleSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;

// Insert schemas
export const insertScentAssetSchema = scentAssetSchema.omit({ id: true });
export const insertRoomSchema = roomSchema.omit({ id: true });
export const insertDoodleSchema = doodleSchema.omit({ id: true });

export type InsertScentAsset = z.infer<typeof insertScentAssetSchema>;
export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type InsertDoodle = z.infer<typeof insertDoodleSchema>;
