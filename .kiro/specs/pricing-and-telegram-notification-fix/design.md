# Pricing and Telegram Notification Fix - Bugfix Design

## Overview

This design addresses two independent bugs in the subscription system:

**Bug 1: Incorrect Pricing** - The seed file contains outdated prices that don't match the new pricing structure. This is a data bug affecting all five subscription services across their duration tiers.

**Bug 2: Missing Telegram Notification** - After users complete e-signing the subscription agreement, they should receive a notification with the Telegram channel link, but this notification is never sent. The fix requires adding notification logic to three functions that update signStatus to SIGNED.

The fixes are straightforward: update the seed data with correct prices, and add notification sending logic after signStatus updates.

## Glossary

- **Bug_Condition_1 (C1)**: The condition that triggers the pricing bug - when seed data contains incorrect prices for subscription plans
- **Bug_Condition_2 (C2)**: The condition that triggers the notification bug - when signStatus is updated to SIGNED but no Telegram link notification is sent
- **Property_1 (P1)**: The desired behavior for pricing - seed file stores correct prices matching the new pricing structure
- **Property_2 (P2)**: The desired behavior for notifications - Telegram link is sent via WhatsApp/SMS after e-sign completion
- **Preservation**: Existing subscription activation, payment flow, and KYC verification that must remain unchanged
- **seed.ts**: The database seeding script in `backend/prisma/seed.ts` that initializes subscription plans
- **esign.controller.ts**: The controller in `backend/src/modules/ekyc/esign.controller.ts` that handles e-sign operations
- **SignStatus**: Enum representing e-sign status (NOT_STARTED, REQUESTED, SIGNED, FAILED)
- **twilio.service.ts**: Service in `backend/src/modules/auth/twilio.service.ts` that sends WhatsApp and SMS messages

## Bug Details

### Bug Condition 1: Incorrect Pricing

The pricing bug manifests when the database is seeded with subscription plans. The `seed.ts` file contains hardcoded prices that don't match the new pricing structure, causing all five services to have incorrect prices across their duration tiers.

**Formal Specification:**
```
FUNCTION isBugCondition1(seedData)
  INPUT: seedData of type ServicePlanData[]
  OUTPUT: boolean
  
  FOR EACH service IN seedData DO
    FOR EACH plan IN service.plans DO
      IF plan.price != getCorrectPrice(service.name, plan.duration) THEN
        RETURN true
      END IF
    END FOR
  END FOR
  
  RETURN false
END FUNCTION
```

### Examples

- **Index Futures & Options (1M)**: Stores 5000 instead of 2999
- **Stock Futures & Options (3M)**: Stores 13500 instead of 8547
- **Hero Zero Expiry Premium (6M)**: Stores 38250 instead of 40500
- **Index Option Selling (9M)**: Stores 27000 instead of 19117
- **Equity Cash | Multibagger Picks (12M)**: Stores 23400 instead of 19190

### Bug Condition 2: Missing Telegram Notification

The notification bug manifests when a user successfully completes e-signing the subscription agreement. The `signStatus` field is updated to SIGNED in three different functions (`updateSignStatus`, `handleSignWebhook`, `getSignStatus`), but none of them send the Telegram link notification to the user.

**Formal Specification:**
```
FUNCTION isBugCondition2(signStatusUpdate)
  INPUT: signStatusUpdate of type { oldStatus: SignStatus, newStatus: SignStatus, subscriptionId: string }
  OUTPUT: boolean
  
  RETURN signStatusUpdate.newStatus == SignStatus.SIGNED
         AND signStatusUpdate.oldStatus != SignStatus.SIGNED
         AND NOT telegramNotificationSent(signStatusUpdate.subscriptionId)
END FUNCTION
```

### Examples

- **updateSignStatus**: User completes signing via frontend SDK → signStatus set to SIGNED → no notification sent
- **handleSignWebhook**: Digio webhook reports completion → signStatus set to SIGNED → no notification sent
- **getSignStatus**: Frontend polls status, Digio reports completed → signStatus set to SIGNED → no notification sent
- **Edge case**: If notification sending fails, the signStatus update should still succeed (non-blocking)

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Subscription activation after payment must continue to send the subscription confirmation message (this is separate from the post-signing notification)
- SignStatus transitions for NOT_STARTED, REQUESTED, and FAILED must remain unchanged
- Payment and KYC verification requirements before e-sign must remain enforced
- Plan retrieval and ordering logic must remain unchanged
- Existing subscription confirmation message sent during `activateSubscription` must continue working

**Scope:**
All inputs that do NOT involve seeding the database or updating signStatus to SIGNED should be completely unaffected by these fixes. This includes:
- Payment processing and webhook handling
- KYC verification flow
- User authentication and authorization
- Plan selection and subscription initialization
- E-sign request creation (initSign)
- Failed or rejected sign status updates

## Hypothesized Root Cause

Based on the bug description and code analysis, the root causes are:

### Bug 1: Incorrect Pricing

1. **Outdated Hardcoded Values**: The `seed.ts` file contains hardcoded prices from an older pricing structure that were never updated when the new pricing was introduced.

2. **No Validation**: There's no validation or external configuration file to ensure prices match the intended pricing structure.

### Bug 2: Missing Telegram Notification

1. **Missing Notification Logic**: The three functions that update signStatus to SIGNED (`updateSignStatus`, `handleSignWebhook`, `getSignStatus`) do not include any code to send notifications.

2. **Incomplete Implementation**: The subscription activation flow (`activateSubscription` in `subscription.service.ts`) already has notification logic for post-payment confirmation, but this pattern was not replicated for post-signing confirmation.

3. **Multiple Update Locations**: SignStatus can be updated to SIGNED in three different places, and the notification logic needs to be added to all three to ensure coverage regardless of which flow the user follows.

## Correctness Properties

Property 1: Bug Condition - Correct Pricing in Seed Data

_For any_ subscription plan created during database seeding, the fixed seed.ts SHALL store the correct price matching the new pricing structure for that service and duration combination.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6**

Property 2: Bug Condition - Telegram Notification After E-Sign

_For any_ subscription where signStatus is updated from a non-SIGNED state to SIGNED, the fixed code SHALL send a notification containing the user's name, plan name, and Telegram channel link via WhatsApp (with SMS fallback) to the user's phone number.

**Validates: Requirements 2.7, 2.8, 2.9, 2.10, 2.11, 2.12**

Property 3: Preservation - Existing Notification Behavior

_For any_ subscription activation after payment, the fixed code SHALL continue to send the subscription confirmation message exactly as before, preserving the existing notification behavior.

**Validates: Requirements 3.1**

Property 4: Preservation - Non-SIGNED Status Updates

_For any_ signStatus update where the new status is NOT SIGNED (NOT_STARTED, REQUESTED, FAILED), the fixed code SHALL NOT send any Telegram link notification, preserving the existing behavior.

**Validates: Requirements 3.2, 3.3**

Property 5: Preservation - Pre-Sign Requirements

_For any_ e-sign initiation request, the fixed code SHALL continue to enforce payment completion and KYC verification requirements exactly as before.

**Validates: Requirements 3.4, 3.5**

Property 6: Preservation - Non-Blocking Notification Failure

_For any_ Telegram notification sending failure, the fixed code SHALL log the error and continue without throwing an exception, preserving the non-blocking error handling pattern.

**Validates: Requirements 3.8**

## Fix Implementation

### Changes Required

#### Bug 1: Incorrect Pricing

**File**: `backend/prisma/seed.ts`

**Specific Changes**:
1. **Update Index Futures & Options prices**: Change from [5000, 13500, 25500, 33750, 39000] to [2999, 8547, 16195, 22942, 28790]

2. **Update Stock Futures & Options prices**: Change from [5000, 13500, 25500, 33750, 39000] to [2999, 8547, 16195, 22942, 28790]

3. **Update Hero Zero Expiry Premium prices**: Change from [7500, 20250, 38250, 50625, 58500] to [7500, 21375, 40500, 57375, 72000]

4. **Update Index Option Selling prices**: Change from [4000, 10800, 20400, 27000, 31200] to [2499, 7122, 13495, 19117, 23990]
   - Note: Keep the demo plan at price 4

5. **Update Equity Cash | Multibagger Picks prices**: Change from [3000, 8100, 15300, 20250, 23400] to [1999, 5697, 10795, 15292, 19190]

#### Bug 2: Missing Telegram Notification

**File**: `backend/src/modules/ekyc/esign.controller.ts`

**Function 1**: `updateSignStatus` (lines 309-377)

**Specific Changes**:
1. **Add notification helper function**: Create a reusable function `sendTelegramLinkNotification(subscriptionId: string)` that:
   - Fetches subscription with plan, user, and phone details
   - Constructs message with user name, plan name, and Telegram link
   - Attempts WhatsApp first, falls back to SMS
   - Logs errors without throwing (non-blocking)

2. **Call notification after signStatus update**: After updating signStatus to SIGNED in `updateSignStatus`, call `sendTelegramLinkNotification(subscriptionId)`

**Function 2**: `handleSignWebhook` (lines 245-302)

**Specific Changes**:
1. **Call notification after signStatus update**: After updating signStatus to SIGNED in the webhook handler, call `sendTelegramLinkNotification(subscription.id)`

**Function 3**: `getSignStatus` (lines 165-243)

**Specific Changes**:
1. **Call notification after signStatus update**: After updating signStatus to SIGNED when polling Digio status, call `sendTelegramLinkNotification(subscriptionId)`

**Implementation Pattern**:
```typescript
const sendTelegramLinkNotification = async (subscriptionId: string): Promise<void> => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: {
        plan: true,
        user: true,
      },
    });

    if (!subscription || !subscription.user.phone) {
      console.warn(`[ESIGN] No phone number found for subscription ${subscriptionId}`);
      return;
    }

    const userName = subscription.user.name || 'Valued Customer';
    const planName = subscription.plan.name;
    const telegramLink = (subscription.plan as any).telegramLink || '';
    const message = `Dear ${userName},\n\nYour subscription agreement for ${planName} has been successfully signed!\n\nJoin your advisory Telegram channel here: ${telegramLink}\n\nThank you for choosing Ashwini SD Research.`;

    // Try WhatsApp first, fall back to SMS
    try {
      await sendWhatsAppMessage(subscription.user.phone, message);
      console.log(`[ESIGN] WhatsApp Telegram link sent for subscription ${subscriptionId}`);
    } catch (waErr: any) {
      console.warn(`[ESIGN] WhatsApp failed (${waErr?.message}), trying SMS fallback...`);
      try {
        await sendSMSMessage(subscription.user.phone, message);
        console.log(`[ESIGN] SMS Telegram link sent for subscription ${subscriptionId}`);
      } catch (smsErr: any) {
        console.error(`[ESIGN] Both WhatsApp and SMS failed for subscription ${subscriptionId}:`, smsErr?.message);
      }
    }
  } catch (err) {
    console.error('[ESIGN] Failed to send Telegram link notification:', err);
    // Don't throw — signStatus update should succeed even if notification fails
  }
};
```

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, verify the bugs exist on unfixed code by demonstrating incorrect behavior, then verify the fixes work correctly and preserve existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate both bugs BEFORE implementing the fixes. Confirm the root cause analysis.

#### Bug 1: Incorrect Pricing

**Test Plan**: Inspect the seed.ts file and verify that the hardcoded prices do not match the new pricing structure. Run the seed script and query the database to confirm incorrect prices are stored.

**Test Cases**:
1. **Index Futures & Options Pricing**: Verify seed file contains 5000 for 1M instead of 2999 (will fail on unfixed code)
2. **Stock Futures & Options Pricing**: Verify seed file contains 13500 for 3M instead of 8547 (will fail on unfixed code)
3. **Hero Zero Expiry Premium Pricing**: Verify seed file contains 38250 for 6M instead of 40500 (will fail on unfixed code)
4. **Index Option Selling Pricing**: Verify seed file contains 27000 for 9M instead of 19117 (will fail on unfixed code)
5. **Equity Cash Pricing**: Verify seed file contains 23400 for 12M instead of 19190 (will fail on unfixed code)

**Expected Counterexamples**:
- Seed file contains old prices that don't match new pricing structure
- Database queries return incorrect prices after seeding

#### Bug 2: Missing Telegram Notification

**Test Plan**: Simulate the e-sign completion flow by updating signStatus to SIGNED in each of the three functions. Verify that no Telegram link notification is sent to the user.

**Test Cases**:
1. **updateSignStatus Flow**: Complete signing via frontend SDK → signStatus updated to SIGNED → no notification sent (will fail on unfixed code)
2. **handleSignWebhook Flow**: Digio webhook reports completion → signStatus updated to SIGNED → no notification sent (will fail on unfixed code)
3. **getSignStatus Flow**: Poll status, Digio reports completed → signStatus updated to SIGNED → no notification sent (will fail on unfixed code)
4. **Notification Content**: If notification were sent, verify it would include user name, plan name, and Telegram link (will fail on unfixed code)

**Expected Counterexamples**:
- No notification sending code exists in any of the three functions
- Users complete e-signing but never receive Telegram link

### Fix Checking

**Goal**: Verify that for all inputs where the bug conditions hold, the fixed code produces the expected behavior.

#### Bug 1: Correct Pricing

**Pseudocode:**
```
FOR ALL service IN services DO
  FOR ALL plan IN service.plans DO
    IF isBugCondition1(plan) THEN
      result := seedDatabase_fixed()
      storedPrice := queryPlanPrice(service.name, plan.duration)
      ASSERT storedPrice == getCorrectPrice(service.name, plan.duration)
    END IF
  END FOR
END FOR
```

**Test Cases**:
1. Seed database with fixed seed.ts
2. Query all plan prices from database
3. Verify each price matches the new pricing structure
4. Verify all five services have correct prices across all durations

#### Bug 2: Telegram Notification Sent

**Pseudocode:**
```
FOR ALL signStatusUpdate WHERE isBugCondition2(signStatusUpdate) DO
  result := updateSignStatus_fixed(signStatusUpdate)
  ASSERT telegramNotificationSent(signStatusUpdate.subscriptionId)
  ASSERT notificationContainsCorrectContent(signStatusUpdate.subscriptionId)
END FOR
```

**Test Cases**:
1. Mock Twilio service to capture sent messages
2. Trigger signStatus update to SIGNED in each of the three functions
3. Verify notification is sent with correct content (user name, plan name, Telegram link)
4. Verify WhatsApp is attempted first, SMS is fallback
5. Verify notification failure doesn't block signStatus update

### Preservation Checking

**Goal**: Verify that for all inputs where the bug conditions do NOT hold, the fixed code produces the same result as the original code.

**Pseudocode:**
```
FOR ALL input WHERE NOT (isBugCondition1(input) OR isBugCondition2(input)) DO
  ASSERT originalCode(input) = fixedCode(input)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain
- It catches edge cases that manual unit tests might miss
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs

**Test Plan**: Observe behavior on UNFIXED code first for non-bug scenarios, then write property-based tests capturing that behavior.

**Test Cases**:
1. **Subscription Activation Notification**: Verify post-payment confirmation message continues to be sent (observe on unfixed code, then verify on fixed code)
2. **Non-SIGNED Status Updates**: Verify no Telegram notification is sent when signStatus is REQUESTED or FAILED (observe on unfixed code, then verify on fixed code)
3. **Payment and KYC Requirements**: Verify e-sign initiation still enforces payment and KYC verification (observe on unfixed code, then verify on fixed code)
4. **Plan Retrieval**: Verify plan queries return correct ordering and filtering (observe on unfixed code, then verify on fixed code)
5. **Already Signed Status**: Verify no duplicate notification when signStatus is already SIGNED (observe on unfixed code, then verify on fixed code)

### Unit Tests

- Test seed.ts creates plans with correct prices for each service and duration
- Test updateSignStatus sends Telegram notification when signStatus becomes SIGNED
- Test handleSignWebhook sends Telegram notification when webhook reports completion
- Test getSignStatus sends Telegram notification when polling detects completion
- Test notification message format includes user name, plan name, and Telegram link
- Test WhatsApp failure triggers SMS fallback
- Test notification failure doesn't block signStatus update
- Test no notification sent when signStatus is NOT_STARTED, REQUESTED, or FAILED

### Property-Based Tests

- Generate random service/duration combinations and verify seed.ts stores correct prices
- Generate random signStatus transitions and verify notification is sent only when transitioning to SIGNED
- Generate random subscription states and verify existing activation notification behavior is preserved
- Test notification sending across many user/plan combinations to verify message format consistency

### Integration Tests

- Test full subscription flow: payment → activation → e-sign → notification
- Test database seeding followed by plan queries to verify correct prices
- Test e-sign completion via all three flows (SDK callback, webhook, polling) and verify notification sent
- Test notification failure scenarios (invalid phone, Twilio error) don't break e-sign flow
- Test that users receive both activation notification (after payment) and Telegram link notification (after signing)
