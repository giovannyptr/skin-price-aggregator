/**
 * Select the cheapest listing
 */
function findCheapest(listings) {
  if (!listings.length) return null;

  return listings.reduce((cheapest, current) => {
    return current.price < cheapest.price ? current : cheapest;
  });
}

/**
 * Select the best deal
 * Current logic:
 * - Prioritize lower price
 * - Simple scoring for extensibility
 */
function findBestDeal(listings) {
  if (!listings.length) return null;

  return listings
    .map(listing => ({
      ...listing,
      score: listing.price
    }))
    .sort((a, b) => a.score - b.score)[0];
}

module.exports = {
  findCheapest,
  findBestDeal
};
