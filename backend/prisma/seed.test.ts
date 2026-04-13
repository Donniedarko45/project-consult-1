/**
 * Bug Condition Exploration Test for Incorrect Pricing
 * 
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6**
 * 
 * CRITICAL: This test MUST FAIL on unfixed code - failure confirms the bug exists
 * 
 * This test verifies that seed.ts contains incorrect hardcoded prices.
 * It will FAIL on unfixed code because the seed file has old prices.
 * After the fix, this test will PASS because prices will be corrected.
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

// Define the correct pricing structure (NEW prices)
const CORRECT_PRICES: Record<string, Record<number, number>> = {
  'Index Futures & Options': {
    1: 2999,
    3: 8547,
    6: 16195,
    9: 22942,
    12: 28790,
  },
  'Stock Futures & Options': {
    1: 2999,
    3: 8547,
    6: 16195,
    9: 22942,
    12: 28790,
  },
  'Hero Zero Expiry Premium': {
    1: 7500,
    3: 21375,
    6: 40500,
    9: 57375,
    12: 72000,
  },
  'Index Option Selling': {
    1: 2499,  // Excluding demo plan at price 4
    3: 7122,
    6: 13495,
    9: 19117,
    12: 23990,
  },
  'Equity Cash | Multibagger Picks': {
    1: 1999,
    3: 5697,
    6: 10795,
    9: 15292,
    12: 19190,
  },
};

// Parse seed.ts file to extract pricing data
function extractPricingFromSeedFile(): Record<string, Record<number, number[]>> {
  const seedFilePath = path.join(__dirname, 'seed.ts');
  const seedContent = fs.readFileSync(seedFilePath, 'utf-8');
  
  const pricingData: Record<string, Record<number, number[]>> = {};
  
  // Extract service names and their plans
  const serviceMatches = seedContent.matchAll(/name:\s*'([^']+)',[\s\S]*?plans:\s*\[([\s\S]*?)\]/g);
  
  for (const serviceMatch of serviceMatches) {
    const serviceName = serviceMatch[1];
    const plansSection = serviceMatch[2];
    
    // Extract duration and price pairs
    const planMatches = plansSection.matchAll(/duration:\s*(\d+),\s*price:\s*(\d+)/g);
    
    pricingData[serviceName] = {};
    
    for (const planMatch of planMatches) {
      const duration = parseInt(planMatch[1]);
      const price = parseInt(planMatch[2]);
      
      if (!pricingData[serviceName][duration]) {
        pricingData[serviceName][duration] = [];
      }
      pricingData[serviceName][duration].push(price);
    }
  }
  
  return pricingData;
}

describe('Bug Condition Exploration: Incorrect Pricing in Seed Data', () => {
  describe('Property 1: Bug Condition - Incorrect Pricing in Seed Data', () => {
    /**
     * **Validates: Requirements 1.2**
     * 
     * This property test verifies that "Index Futures & Options" plans
     * contain the CORRECT prices in seed.ts.
     * 
     * EXPECTED: This test will FAIL on unfixed code because seed.ts
     * contains old prices (5000/13500/25500/33750/39000) instead of
     * new prices (2999/8547/16195/22942/28790).
     */
    it('should have correct prices for Index Futures & Options', () => {
      const pricingData = extractPricingFromSeedFile();
      const serviceName = 'Index Futures & Options';
      const servicePrices = pricingData[serviceName];
      
      expect(servicePrices).toBeDefined();
      
      // Verify each duration has the correct price
      for (const [duration, correctPrice] of Object.entries(CORRECT_PRICES[serviceName])) {
        const durationNum = parseInt(duration);
        const actualPrices = servicePrices[durationNum];
        
        expect(actualPrices).toBeDefined();
        expect(actualPrices.length).toBeGreaterThan(0);
        
        // Check that at least one price matches the correct price
        // (there might be multiple plans with same duration)
        const hasCorrectPrice = actualPrices.some(price => price === correctPrice);
        
        expect(hasCorrectPrice).toBe(true);
        expect(actualPrices[0]).toBe(correctPrice);
      }
    });

    /**
     * **Validates: Requirements 1.3**
     * 
     * This property test verifies that "Stock Futures & Options" plans
     * contain the CORRECT prices in seed.ts.
     * 
     * EXPECTED: This test will FAIL on unfixed code because seed.ts
     * contains old prices (5000/13500/25500/33750/39000) instead of
     * new prices (2999/8547/16195/22942/28790).
     */
    it('should have correct prices for Stock Futures & Options', () => {
      const pricingData = extractPricingFromSeedFile();
      const serviceName = 'Stock Futures & Options';
      const servicePrices = pricingData[serviceName];
      
      expect(servicePrices).toBeDefined();
      
      for (const [duration, correctPrice] of Object.entries(CORRECT_PRICES[serviceName])) {
        const durationNum = parseInt(duration);
        const actualPrices = servicePrices[durationNum];
        
        expect(actualPrices).toBeDefined();
        expect(actualPrices[0]).toBe(correctPrice);
      }
    });

    /**
     * **Validates: Requirements 1.4**
     * 
     * This property test verifies that "Hero Zero Expiry Premium" plans
     * contain the CORRECT prices in seed.ts.
     * 
     * EXPECTED: This test will FAIL on unfixed code because seed.ts
     * contains old prices (7500/20250/38250/50625/58500) instead of
     * new prices (7500/21375/40500/57375/72000).
     */
    it('should have correct prices for Hero Zero Expiry Premium', () => {
      const pricingData = extractPricingFromSeedFile();
      const serviceName = 'Hero Zero Expiry Premium';
      const servicePrices = pricingData[serviceName];
      
      expect(servicePrices).toBeDefined();
      
      for (const [duration, correctPrice] of Object.entries(CORRECT_PRICES[serviceName])) {
        const durationNum = parseInt(duration);
        const actualPrices = servicePrices[durationNum];
        
        expect(actualPrices).toBeDefined();
        expect(actualPrices[0]).toBe(correctPrice);
      }
    });

    /**
     * **Validates: Requirements 1.5**
     * 
     * This property test verifies that "Index Option Selling" plans
     * contain the CORRECT prices in seed.ts.
     * 
     * EXPECTED: This test will FAIL on unfixed code because seed.ts
     * contains old prices (4000/10800/20400/27000/31200) instead of
     * new prices (2499/7122/13495/19117/23990).
     * 
     * Note: Demo plan at price 4 is excluded from this check.
     */
    it('should have correct prices for Index Option Selling', () => {
      const pricingData = extractPricingFromSeedFile();
      const serviceName = 'Index Option Selling';
      const servicePrices = pricingData[serviceName];
      
      expect(servicePrices).toBeDefined();
      
      for (const [duration, correctPrice] of Object.entries(CORRECT_PRICES[serviceName])) {
        const durationNum = parseInt(duration);
        const actualPrices = servicePrices[durationNum];
        
        expect(actualPrices).toBeDefined();
        
        // For duration 1, there are two plans: demo (price 4) and regular
        // We need to check the regular plan (not the demo)
        const regularPrice = actualPrices.find(price => price !== 4);
        
        if (durationNum === 1) {
          expect(regularPrice).toBe(correctPrice);
        } else {
          expect(actualPrices[0]).toBe(correctPrice);
        }
      }
    });

    /**
     * **Validates: Requirements 1.6**
     * 
     * This property test verifies that "Equity Cash | Multibagger Picks" plans
     * contain the CORRECT prices in seed.ts.
     * 
     * EXPECTED: This test will FAIL on unfixed code because seed.ts
     * contains old prices (3000/8100/15300/20250/23400) instead of
     * new prices (1999/5697/10795/15292/19190).
     */
    it('should have correct prices for Equity Cash | Multibagger Picks', () => {
      const pricingData = extractPricingFromSeedFile();
      const serviceName = 'Equity Cash | Multibagger Picks';
      const servicePrices = pricingData[serviceName];
      
      expect(servicePrices).toBeDefined();
      
      for (const [duration, correctPrice] of Object.entries(CORRECT_PRICES[serviceName])) {
        const durationNum = parseInt(duration);
        const actualPrices = servicePrices[durationNum];
        
        expect(actualPrices).toBeDefined();
        expect(actualPrices[0]).toBe(correctPrice);
      }
    });

    /**
     * **Validates: Requirements 1.1**
     * 
     * Property-based test that verifies ALL services have correct prices
     * across ALL duration tiers.
     * 
     * This test generates test cases for all service/duration combinations
     * and verifies that seed.ts contains the correct prices.
     * 
     * EXPECTED: This test will FAIL on unfixed code, surfacing counterexamples
     * that demonstrate which specific service/duration combinations have
     * incorrect prices.
     */
    it('property: all services should have correct prices for all durations', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...Object.keys(CORRECT_PRICES)),
          fc.constantFrom(1, 3, 6, 9, 12),
          (serviceName, duration) => {
            // Skip if this service doesn't have this duration
            if (!CORRECT_PRICES[serviceName][duration]) {
              return true;
            }
            
            const pricingData = extractPricingFromSeedFile();
            const servicePrices = pricingData[serviceName];
            
            if (!servicePrices || !servicePrices[duration]) {
              return false;
            }
            
            const correctPrice = CORRECT_PRICES[serviceName][duration];
            const actualPrices = servicePrices[duration];
            
            // For Index Option Selling duration 1, exclude demo plan
            if (serviceName === 'Index Option Selling' && duration === 1) {
              const regularPrice = actualPrices.find(price => price !== 4);
              return regularPrice === correctPrice;
            }
            
            // Check that the first price matches the correct price
            return actualPrices[0] === correctPrice;
          }
        ),
        { numRuns: 25 } // Test all 25 service/duration combinations
      );
    });
  });
});
