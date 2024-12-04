import express from "express";
import { scrapeRextie } from "./scraper/rextie.js";
import { scrapeKambista } from "./scraper/kambista.js";
import { scrapeTkambio } from "./scraper/tkambio.js";
import { scrapeSunat } from "./scraper/sunat.js";

const router = express.Router();

router.get("/rextie", async (req, res) => {
  try {
    const result = await scrapeRextie();
    if (!result.success) return res.status(400).json({ error: result.error });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/kambista", async (req, res) => {
  try {
    const result = await scrapeKambista();
    if (!result.success) return res.status(400).json({ error: result.error });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/tkambio", async (req, res) => {
  try {
    const result = await scrapeTkambio();
    if (!result.success) return res.status(400).json({ error: result.error });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/sunat", async (req, res) => {
  try {
    const result = await scrapeSunat();
    if (!result.success) return res.status(400).json({ error: result.error });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
