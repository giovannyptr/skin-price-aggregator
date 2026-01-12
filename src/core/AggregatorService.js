const marketplaces = require("../marketplaces");

/**
 * Aggregate prices from all marketplaces
 * - Runs scrapers in parallel
 * - Handles partial failures gracefully
 */
async function aggregatePrices(itemName) {
  const results = await Promise.allSettled(
    marketplaces.map(scraper => scraper.fetchPrices(itemName))
  );

  const listings = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      listings.push(...result.value);
    } else {
      console.error(
        `Marketplace failed: ${marketplaces[index].name}`,
        result.reason.message
      );
    }
  });

  return listings;
}

module.exports = {
  aggregatePrices
};
