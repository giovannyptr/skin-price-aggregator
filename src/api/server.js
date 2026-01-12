const express = require("express");
const { aggregatePrices } = require("../core/AggregatorService");
const { findCheapest, findBestDeal } = require("../core/ScoringService");
const { getCache, setCache } = require("../core/CacheService");

const app = express();
const PORT = 3000;

app.get("/prices", async (req, res) => {
  const item = req.query.item;

  if (!item) {
    return res.status(400).json({ error: "Missing item query parameter" });
  }

  const cached = getCache(item);
  if (cached) {
    return res.json(cached);
  }

  const listings = await aggregatePrices(item);

  const response = {
    item,
    listings,
    cheapest: findCheapest(listings),
    bestDeal: findBestDeal(listings),
    lastUpdated: new Date().toISOString()
  };

  setCache(item, response);
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
