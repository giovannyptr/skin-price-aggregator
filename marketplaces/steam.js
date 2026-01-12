const MarketplaceScraper = require("../core/MarketplaceScraper");

class SteamScraper extends MarketplaceScraper {
  constructor() {
    super("steam");
  }

  async fetchPrices(itemName) {
    // Mock data for now
    return [
      {
        marketplace: this.name,
        itemName,
        price: 12.5,
        currency: "USD",
        url: "https://steamcommunity.com/market",
        lastUpdated: new Date().toISOString()
      }
    ];
  }
}

module.exports = new SteamScraper();
