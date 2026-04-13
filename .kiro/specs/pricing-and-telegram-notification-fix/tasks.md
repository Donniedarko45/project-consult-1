# Implementation Plan

## Bug 1: Incorrect Pricing

- [ ] 1. Write bug condition exploration test for incorrect pricing
  - **Property 1: Bug Condition** - Incorrect Pricing in Seed Data
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate incorrect prices exist in seed.ts
  - **Scoped PBT Approach**: Scope the property to concrete failing cases - verify seed.ts contains incorrect hardcoded prices for all five services
  - Test that seed.ts contains incorrect prices:
    - Index Futures & Options: 5000/13500/25500/33750/39000 instead of 2999/8547/16195/22942/28790
    - Stock Futures & Options: 5000/13500/25500/33750/39000 instead of 2999/8547/16195/22942/28790
    - Hero Zero Expiry Premium: 7500/20250/38250/50625/58500 instead of 7500/21375/40500/57375/72000
    - Index Option Selling: 4000/10800/20400/27000/31200 instead of 2499/7122/13495/19117/23990 (excluding demo plan at price 4)
    - Equity Cash | Multibagger Picks: 3000/8100/15300/20250/23400 instead of 1999/5697/10795/15292/19190
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found (specific incorrect prices in seed.ts)
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 2. Write preservation property tests for pricing (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-Pricing Behaviors
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-pricing aspects:
    - Plan retrieval returns plans ordered by duration in ascending order
    - Subscription activation after payment sends confirmation message
    - Payment and KYC requirements are enforced before e-sign
  - Write property-based tests capturing observed behavior patterns
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.4, 3.5, 3.6_

- [x] 3. Fix incorrect pricing in seed.ts

  - [x] 3.1 Update Index Futures & Options prices
    - Change prices from [5000, 13500, 25500, 33750, 39000] to [2999, 8547, 16195, 22942, 28790]
    - Update all five duration tiers (1M, 3M, 6M, 9M, 12M)
    - _Bug_Condition: isBugCondition1(seedData) where service = "Index Futures & Options"_
    - _Expected_Behavior: Prices match new pricing structure [2999, 8547, 16195, 22942, 28790]_
    - _Preservation: Plan retrieval, subscription activation, payment/KYC requirements unchanged_
    - _Requirements: 1.2, 2.2_

  - [x] 3.2 Update Stock Futures & Options prices
    - Change prices from [5000, 13500, 25500, 33750, 39000] to [2999, 8547, 16195, 22942, 28790]
    - Update all five duration tiers (1M, 3M, 6M, 9M, 12M)
    - _Bug_Condition: isBugCondition1(seedData) where service = "Stock Futures & Options"_
    - _Expected_Behavior: Prices match new pricing structure [2999, 8547, 16195, 22942, 28790]_
    - _Preservation: Plan retrieval, subscription activation, payment/KYC requirements unchanged_
    - _Requirements: 1.3, 2.3_

  - [x] 3.3 Update Hero Zero Expiry Premium prices
    - Change prices from [7500, 20250, 38250, 50625, 58500] to [7500, 21375, 40500, 57375, 72000]
    - Update all five duration tiers (1M, 3M, 6M, 9M, 12M)
    - _Bug_Condition: isBugCondition1(seedData) where service = "Hero Zero Expiry Premium"_
    - _Expected_Behavior: Prices match new pricing structure [7500, 21375, 40500, 57375, 72000]_
    - _Preservation: Plan retrieval, subscription activation, payment/KYC requirements unchanged_
    - _Requirements: 1.4, 2.4_

  - [x] 3.4 Update Index Option Selling prices
    - Change prices from [4, 4000, 10800, 20400, 27000, 31200] to [4, 2499, 7122, 13495, 19117, 23990]
    - Keep demo plan at price 4
    - Update remaining five duration tiers (1M, 3M, 6M, 9M, 12M)
    - _Bug_Condition: isBugCondition1(seedData) where service = "Index Option Selling"_
    - _Expected_Behavior: Prices match new pricing structure [4, 2499, 7122, 13495, 19117, 23990]_
    - _Preservation: Plan retrieval, subscription activation, payment/KYC requirements unchanged_
    - _Requirements: 1.5, 2.5_

  - [x] 3.5 Update Equity Cash | Multibagger Picks prices
    - Change prices from [3000, 8100, 15300, 20250, 23400] to [1999, 5697, 10795, 15292, 19190]
    - Update all five duration tiers (1M, 3M, 6M, 9M, 12M)
    - _Bug_Condition: isBugCondition1(seedData) where service = "Equity Cash | Multibagger Picks"_
    - _Expected_Behavior: Prices match new pricing structure [1999, 5697, 10795, 15292, 19190]_
    - _Preservation: Plan retrieval, subscription activation, payment/KYC requirements unchanged_
    - _Requirements: 1.6, 2.6_

  - [x] 3.6 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Correct Pricing in Seed Data
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 3.7 Verify preservation tests still pass
    - **Property 2: Preservation** - Non-Pricing Behaviors
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (no regressions)

- [x] 4. Checkpoint - Ensure all pricing tests pass
  - Ensure all tests pass, ask the user if questions arise

## Bug 2: Missing Telegram Notification

- [x] 5. Write bug condition exploration test for missing Telegram notification
  - **Property 1: Bug Condition** - Missing Telegram Notification After E-Sign
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate no notification is sent after signStatus becomes SIGNED
  - **Scoped PBT Approach**: Scope the property to concrete failing cases - verify no notification logic exists in updateSignStatus, handleSignWebhook, and getSignStatus functions
  - Test that when signStatus is updated to SIGNED:
    - No notification sending code exists in updateSignStatus function
    - No notification sending code exists in handleSignWebhook function
    - No notification sending code exists in getSignStatus function
    - Users complete e-signing but never receive Telegram link
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found (missing notification logic in all three functions)
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.7, 1.8, 1.9, 1.10_

- [x] 6. Write preservation property tests for Telegram notification (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-SIGNED Status Behaviors
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-SIGNED signStatus updates:
    - No notification sent when signStatus is NOT_STARTED
    - No notification sent when signStatus is REQUESTED
    - No notification sent when signStatus is FAILED
    - Subscription activation notification continues to work after payment
    - Payment and KYC requirements enforced before e-sign
    - Already SIGNED status returns existing status without new sign request
  - Write property-based tests capturing observed behavior patterns
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.7_

- [x] 7. Fix missing Telegram notification in esign.controller.ts

  - [x] 7.1 Create sendTelegramLinkNotification helper function
    - Add reusable function at top of esign.controller.ts
    - Function signature: `sendTelegramLinkNotification(subscriptionId: string): Promise<void>`
    - Fetch subscription with plan, user, and phone details using Prisma
    - Construct message with user name, plan name, and Telegram link
    - Attempt WhatsApp first using sendWhatsAppMessage from twilio.service.ts
    - Fall back to SMS using sendSMSMessage if WhatsApp fails
    - Log errors without throwing (non-blocking error handling)
    - Return early if no phone number found
    - _Bug_Condition: isBugCondition2(signStatusUpdate) where newStatus = SIGNED_
    - _Expected_Behavior: Notification sent with user name, plan name, Telegram link via WhatsApp/SMS_
    - _Preservation: Non-blocking error handling, existing notification behavior unchanged_
    - _Requirements: 2.7, 2.11, 2.12, 3.8_

  - [x] 7.2 Add notification call to updateSignStatus function
    - Locate updateSignStatus function (lines 309-377)
    - After updating signStatus to SIGNED, call sendTelegramLinkNotification(subscriptionId)
    - Place call after Prisma update completes successfully
    - Ensure non-blocking (await but catch errors internally in helper)
    - _Bug_Condition: isBugCondition2(signStatusUpdate) in updateSignStatus flow_
    - _Expected_Behavior: Telegram notification sent after SDK callback completes signing_
    - _Preservation: Existing updateSignStatus logic unchanged_
    - _Requirements: 1.8, 2.8_

  - [x] 7.3 Add notification call to handleSignWebhook function
    - Locate handleSignWebhook function (lines 245-302)
    - After updating signStatus to SIGNED, call sendTelegramLinkNotification(subscription.id)
    - Place call after Prisma update completes successfully
    - Ensure non-blocking (await but catch errors internally in helper)
    - _Bug_Condition: isBugCondition2(signStatusUpdate) in webhook flow_
    - _Expected_Behavior: Telegram notification sent after Digio webhook reports completion_
    - _Preservation: Existing webhook handling logic unchanged_
    - _Requirements: 1.9, 2.9_

  - [x] 7.4 Add notification call to getSignStatus function
    - Locate getSignStatus function (lines 165-243)
    - After updating signStatus to SIGNED when polling Digio, call sendTelegramLinkNotification(subscriptionId)
    - Place call after Prisma update completes successfully
    - Ensure non-blocking (await but catch errors internally in helper)
    - _Bug_Condition: isBugCondition2(signStatusUpdate) in polling flow_
    - _Expected_Behavior: Telegram notification sent after status polling detects completion_
    - _Preservation: Existing status polling logic unchanged_
    - _Requirements: 1.10, 2.10_

  - [x] 7.5 Import Twilio service functions
    - Add import statement at top of esign.controller.ts
    - Import sendWhatsAppMessage and sendSMSMessage from '../auth/twilio.service'
    - Verify Twilio service exports these functions
    - _Requirements: 2.12_

  - [x] 7.6 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Telegram Notification After E-Sign
    - **IMPORTANT**: Re-run the SAME test from task 5 - do NOT write a new test
    - The test from task 5 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 5
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - _Requirements: 2.7, 2.8, 2.9, 2.10, 2.11, 2.12_

  - [x] 7.7 Verify preservation tests still pass
    - **Property 2: Preservation** - Non-SIGNED Status Behaviors
    - **IMPORTANT**: Re-run the SAME tests from task 6 - do NOT write new tests
    - Run preservation property tests from step 6
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (no regressions)

- [x] 8. Checkpoint - Ensure all notification tests pass
  - Ensure all tests pass, ask the user if questions arise

## Final Validation

- [x] 9. Run full test suite
  - Run all pricing tests (exploration + preservation)
  - Run all notification tests (exploration + preservation)
  - Verify no regressions in existing functionality
  - Confirm both bugs are fixed and all requirements are met
