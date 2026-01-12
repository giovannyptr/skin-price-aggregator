# Skin Price Aggregator

A small Node.js backend service that aggregates Counter-Strike skin prices from multiple marketplaces.

---

## 🎯 Goal

- Accept a skin name
- Fetch prices from multiple marketplaces
- Normalize results
- Return the cheapest listing and a best deal

---

## 🛠 Tech Stack

- Node.js
- Express
- Axios
- Cheerio

---

## 📌 Overview

This project implements a small Node.js backend service that aggregates Counter-Strike skin prices from multiple marketplaces.

The system is designed with **interface-driven architecture**, allowing new marketplaces to be added without modifying existing aggregation or business logic.

---

## 🏗 Architecture & Design Decisions

### 1. Marketplace Abstraction

Each marketplace implements a common `MarketplaceScraper` contract with a single responsibility:

- Fetch prices for a given skin name
- Return results in a normalized format

This ensures:
- Consistent data shape
- Easy extensibility
- Isolation of external dependencies

---

### 2. Aggregation & Fault Tolerance

The aggregator:
- Executes all marketplace scrapers in parallel
- Uses `Promise.allSettled` to isolate failures
- Returns partial results if one or more marketplaces fail

This prevents a single marketplace outage from causing a complete service failure.

---

### 3. Normalized Output

All marketplaces return listings in the same structure:

```json
{
  "marketplace": "steam",
  "itemName": "AK-47 | Redline",
  "price": 12.5,
  "currency": "USD",
  "url": "https://...",
  "lastUpdated": "ISO timestamp"
} 

```

### 4. Pricing Logic

Pricing logic is separated into a dedicated service:

- Cheapest listing is selected by the lowest price

- Best deal uses a simple price-based scoring method, designed to be easily extended later

- This keeps business logic isolated and testable.

### 5. Caching

A lightweight in-memory cache with a 60-second TTL is implemented to:

- Reduce repeated marketplace calls

- Improve response time

- Avoid unnecessary external load

### 6. Mock Marketplaces (Intentional)

For this exercise, marketplace integrations are mocked to focus on:

- Architecture

- Aggregation logic

- Failure handling

- Extensibility

The marketplace layer is intentionally designed so real API or scraping logic can be added without touching core services.

## ➕ Adding a New Marketplace

To add a new marketplace:

- Create a new file in marketplaces/

- Extend MarketplaceScraper

- Implement fetchPrices(itemName)

- Register the scraper in marketplaces/index.js

- No changes are required in aggregation, scoring, or API logic.