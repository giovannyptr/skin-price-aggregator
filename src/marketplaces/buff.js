const MarketplaceScraper = require("../core/MarketplaceScraper");

class BuffScraper extends MarketplaceScraper {
  constructor() {
    super("buff");
  }

  async fetchPrices(itemName) {
    return [
      {
        marketplace: this.name,
        itemName,
        price: 11.9,
        currency: "USD",
        url: "https://buff.market",
        lastUpdated: new Date().toISOString()
      }
    ];
  }
}

module.exports = new BuffScraper();
