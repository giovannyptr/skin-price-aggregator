/**
 * MarketplaceScraper
 *
 * Each marketplace scraper must:
 * - Have a unique name
 * - Implement fetchPrices(itemName)
 * - Return an array of normalized Listing objects
 */
class MarketplaceScraper {
  constructor(name) {
    this.name = name;
  }

  async fetchPrices(itemName) {
    throw new Error("fetchPrices() must be implemented by subclass");
  }
}

module.exports = MarketplaceScraper;
