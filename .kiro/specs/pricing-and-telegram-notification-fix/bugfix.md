# Bugfix Requirements Document

## Introduction

This document addresses two critical bugs in the subscription system:

1. **Incorrect Pricing in Database**: The subscription plan prices in the seed file do not match the new pricing structure, causing users to be charged incorrect amounts.

2. **Missing Telegram Link Notification**: After users successfully sign the subscription agreement via Digio, they should receive a message with the Telegram channel link via SMS and WhatsApp, but this notification is not being sent.

These bugs affect the core subscription flow and prevent users from accessing their purchased services.

## Bug Analysis

### Current Behavior (Defect)

#### Bug 1: Incorrect Pricing

1.1 WHEN the database is seeded with subscription plans THEN the system stores incorrect prices that do not match the new pricing structure

1.2 WHEN "Index Futures & Options" plans are created THEN the system stores prices of 5000/13500/25500/33750/39000 instead of 2999/8547/16195/22942/28790

1.3 WHEN "Stock Futures & Options" plans are created THEN the system stores prices of 5000/13500/25500/33750/39000 instead of 2999/8547/16195/22942/28790

1.4 WHEN "Hero Zero Expiry Premium" plans are created THEN the system stores prices of 7500/20250/38250/50625/58500 instead of 7500/21375/40500/57375/72000

1.5 WHEN "Index Option Selling" plans are created THEN the system stores prices of 4000/10800/20400/27000/31200 instead of 2499/7122/13495/19117/23990

1.6 WHEN "Equity Cash | Multibagger Picks" plans are created THEN the system stores prices of 3000/8100/15300/20250/23400 instead of 1999/5697/10795/15292/19190

#### Bug 2: Missing Telegram Notification

1.7 WHEN a user successfully signs the subscription agreement (signStatus becomes SIGNED) THEN the system does not send any notification with the Telegram channel link

1.8 WHEN the subscription signStatus is updated to SIGNED in the `updateSignStatus` function THEN no SMS or WhatsApp message is sent to the user

1.9 WHEN the subscription signStatus is updated to SIGNED in the `handleSignWebhook` function THEN no SMS or WhatsApp message is sent to the user

1.10 WHEN the subscription signStatus is updated to SIGNED in the `getSignStatus` function THEN no SMS or WhatsApp message is sent to the user

### Expected Behavior (Correct)

#### Bug 1: Correct Pricing

2.1 WHEN the database is seeded with subscription plans THEN the system SHALL store the correct prices matching the new pricing structure

2.2 WHEN "Index Futures & Options" plans are created THEN the system SHALL store prices of 2999 (1M), 8547 (3M), 16195 (6M), 22942 (9M), 28790 (12M)

2.3 WHEN "Stock Futures & Options" plans are created THEN the system SHALL store prices of 2999 (1M), 8547 (3M), 16195 (6M), 22942 (9M), 28790 (12M)

2.4 WHEN "Hero Zero Expiry Premium" plans are created THEN the system SHALL store prices of 7500 (1M), 21375 (3M), 40500 (6M), 57375 (9M), 72000 (12M)

2.5 WHEN "Index Option Selling" plans are created THEN the system SHALL store prices of 2499 (1M), 7122 (3M), 13495 (6M), 19117 (9M), 23990 (12M)

2.6 WHEN "Equity Cash | Multibagger Picks" plans are created THEN the system SHALL store prices of 1999 (1M), 5697 (3M), 10795 (6M), 15292 (9M), 19190 (12M)

#### Bug 2: Send Telegram Notification

2.7 WHEN a user successfully signs the subscription agreement (signStatus becomes SIGNED) THEN the system SHALL send a notification with the Telegram channel link via WhatsApp and SMS

2.8 WHEN the subscription signStatus is updated to SIGNED in the `updateSignStatus` function THEN the system SHALL retrieve the subscription with plan and user details and send the Telegram link notification

2.9 WHEN the subscription signStatus is updated to SIGNED in the `handleSignWebhook` function THEN the system SHALL retrieve the subscription with plan and user details and send the Telegram link notification

2.10 WHEN the subscription signStatus is updated to SIGNED in the `getSignStatus` function THEN the system SHALL retrieve the subscription with plan and user details and send the Telegram link notification

2.11 WHEN sending the Telegram link notification THEN the system SHALL include the user's name, plan name, and the plan's Telegram link in the message

2.12 WHEN sending the Telegram link notification THEN the system SHALL attempt WhatsApp first and fall back to SMS if WhatsApp fails

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a subscription is activated after payment THEN the system SHALL CONTINUE TO send the subscription confirmation message (this is separate from the post-signing notification)

3.2 WHEN the signStatus is NOT_STARTED or REQUESTED THEN the system SHALL CONTINUE TO not send any Telegram link notification

3.3 WHEN the signStatus is FAILED THEN the system SHALL CONTINUE TO not send any Telegram link notification

3.4 WHEN a user has not completed payment THEN the system SHALL CONTINUE TO prevent them from initiating the e-sign process

3.5 WHEN a user has not completed KYC verification THEN the system SHALL CONTINUE TO prevent them from initiating the e-sign process

3.6 WHEN retrieving all active plans THEN the system SHALL CONTINUE TO return plans ordered by duration in ascending order

3.7 WHEN a subscription already has signStatus SIGNED THEN the system SHALL CONTINUE TO return the existing status without creating a new sign request

3.8 WHEN the Telegram notification fails to send THEN the system SHALL CONTINUE TO log the error without throwing an exception (non-blocking)
