import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDoodleSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rooms API
  app.get("/api/rooms", async (req, res) => {
    try {
      const rooms = await storage.getRooms();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rooms" });
    }
  });

  app.get("/api/rooms/:id", async (req, res) => {
    try {
      const room = await storage.getRoom(req.params.id);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
      res.json(room);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch room" });
    }
  });

  // Scent Assets API
  app.get("/api/scents", async (req, res) => {
    try {
      const scents = await storage.getScentAssets();
      res.json(scents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scent assets" });
    }
  });

  app.get("/api/scents/:id", async (req, res) => {
    try {
      const scent = await storage.getScentAsset(req.params.id);
      if (!scent) {
        return res.status(404).json({ error: "Scent asset not found" });
      }
      res.json(scent);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scent asset" });
    }
  });

  // Duality Presets API
  app.get("/api/dualities", async (req, res) => {
    try {
      const presets = await storage.getDualityPresets();
      res.json(presets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch duality presets" });
    }
  });

  // Scent Placements API
  app.get("/api/rooms/:roomId/placements", async (req, res) => {
    try {
      const placements = await storage.getPlacedScents(req.params.roomId);
      res.json(placements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scent placements" });
    }
  });

  app.post("/api/rooms/:roomId/placements", async (req, res) => {
    try {
      const { scentId, x, y } = req.body;
      
      if (!scentId || typeof x !== 'number' || typeof y !== 'number') {
        return res.status(400).json({ error: "scentId, x, and y are required" });
      }

      const placementId = await storage.addPlacedScent(req.params.roomId, scentId, x, y);
      res.json({ id: placementId, success: true });
    } catch (error) {
      console.error("Error placing scent:", error);
      res.status(500).json({ error: "Failed to place scent" });
    }
  });

  app.delete("/api/placements/:id", async (req, res) => {
    try {
      const success = await storage.removePlacedScent(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Placement not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove placement" });
    }
  });

  // Doodles API
  app.get("/api/rooms/:roomId/doodles", async (req, res) => {
    try {
      const doodles = await storage.getDoodles(req.params.roomId);
      res.json(doodles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch doodles" });
    }
  });

  app.post("/api/rooms/:roomId/doodles", async (req, res) => {
    try {
      const doodleData = {
        roomId: req.params.roomId,
        ...req.body
      };
      
      const validatedData = insertDoodleSchema.parse(doodleData);
      const doodle = await storage.createDoodle(validatedData);
      res.json(doodle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid doodle data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to save doodle" });
    }
  });

  app.delete("/api/doodles/:id", async (req, res) => {
    try {
      const success = await storage.deleteDoodle(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Doodle not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete doodle" });
    }
  });

  // Site Settings API
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch site settings" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
