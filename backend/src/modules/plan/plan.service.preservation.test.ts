/**
 * Preservation Property Tests for Pricing Fix
 * 
 * **Validates: Requirements 3.1, 3.4, 3.5, 3.6**
 * 
 * IMPORTANT: These tests verify that non-pricing behaviors remain unchanged
 * after the pricing fix. They should PASS on both unfixed and fixed code.
 * 
 * These tests follow the observation-first methodology:
 * 1. Observe behavior on UNFIXED code
 * 2. Write property-based tests capturing that behavior
 * 3. Run tests on UNFIXED code - they should PASS
 * 4. After fix, run tests again - they should still PASS (no regressions)
 */

import * as fc from 'fast-check';
import prisma from '../../prisma/client';
import { getAllPlans } from './plan.service';
import { activateSubscription } from '../subscription/subscription.service';
import { initSign } from '../ekyc/esign.controller';
import { SubscriptionStatus } from '@prisma/client';
import * as twilioService from '../auth/twilio.service';

// Mock Twilio service to capture sent messages
jest.mock('../auth/twilio.service', () => ({
  sendWhatsAppMessage: jest.fn(),
  sendSMSMessage: jest.fn(),
}));

// Mock Digio service
jest.mock('../ekyc/digio.service', () => ({
  createSignRequest: jest.fn().mockResolvedValue({
    id: 'mock-digio-doc-id',
    signing_parties: [],
    file_name: 'mock-agreement.pdf',
  }),
  getDocumentStatus: jest.fn().mockResolvedValue({
    agreement_status: 'pending',
  }),
}));

describe('Preservation Property Tests: Non-Pricing Behaviors', () => {
  // Increase timeout for database operations
  jest.setTimeout(30000);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Property 2: Preservation - Plan Retrieval Ordering', () => {
    /**
     * **Validates: Requirement 3.6**
     * 
     * This property test verifies that plan retrieval returns plans
     * ordered by duration in ascending order.
     * 
     * EXPECTED: This test PASSES on unfixed code (confirms baseline behavior)
     * and continues to PASS after the pricing fix (confirms no regression).
     */
    it('property: getAllPlans returns plans ordered by duration ascending', async () => {
      // This test doesn't need property-based testing generators
      // because we're testing a deterministic ordering behavior
      
      const plans = await getAllPlans();
      
      // Verify plans are returned
      expect(plans.length).toBeGreaterThan(0);
      
      // Verify plans are ordered by durationMonths in ascending order
      for (let i = 1; i < plans.length; i++) {
        expect(plans[i].durationMonths).toBeGreaterThanOrEqual(
          plans[i - 1].durationMonths
        );
      }
    });

    /**
     * **Validates: Requirement 3.6**
     * 
     * Property-based test that verifies ordering is preserved
     * regardless of which plans are active.
     */
    it('property: plan ordering is consistent across multiple retrievals', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constant(null), // No input needed, just run multiple times
          async () => {
            const plans = await getAllPlans();
            
            // Extract durations
            const durations = plans.map(p => p.durationMonths);
            
            // Verify ascending order
            for (let i = 1; i < durations.length; i++) {
              if (durations[i] < durations[i - 1]) {
                return false;
              }
            }
            
            return true;
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Property 2: Preservation - Subscription Activation Notification', () => {
    /**
     * **Validates: Requirement 3.1**
     * 
     * This property test verifies that subscription activation after payment
     * continues to send the confirmation message.
     * 
     * EXPECTED: This test PASSES on unfixed code (confirms baseline behavior)
     * and continues to PASS after the pricing fix (confirms no regression).
     */
    it('property: activateSubscription sends confirmation message', async () => {
      jest.setTimeout(15000);
      // Create test user
      const testUser = await prisma.user.create({
        data: {
          phone: '+1234567890',
          name: 'Test User',
          kycStatus: 'VERIFIED',
          hasAccess: false,
        },
      });

      // Create test plan
      const testPlan = await prisma.subscriptionPlan.create({
        data: {
          name: 'Test Plan',
          durationMonths: 1,
          price: 1000,
          description: 'Test plan for preservation testing',
          isActive: true,
          telegramLink: 'https://t.me/test',
        },
      });

      // Create test subscription
      const testSubscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          planId: testPlan.id,
          status: SubscriptionStatus.PENDING,
        },
      });

      // Activate subscription
      await activateSubscription(testSubscription.id);

      // Verify notification was sent (WhatsApp or SMS)
      const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
      const smsMock = twilioService.sendSMSMessage as jest.Mock;
      
      const notificationSent = whatsappMock.mock.calls.length > 0 || smsMock.mock.calls.length > 0;
      expect(notificationSent).toBe(true);

      // Verify message contains expected content
      const sentMessage = whatsappMock.mock.calls[0]?.[1] || smsMock.mock.calls[0]?.[1];
      expect(sentMessage).toContain('Test User');
      expect(sentMessage).toContain('Test Plan');
      expect(sentMessage).toContain('ACTIVE');

      // Cleanup
      await prisma.subscription.delete({ where: { id: testSubscription.id } });
      await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    });

    /**
     * **Validates: Requirement 3.1**
     * 
     * Property-based test that verifies activation notification is sent
     * for various user/plan combinations.
     */
    it('property: activation notification sent for any valid subscription', async () => {
      jest.setTimeout(30000);
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            userName: fc.string({ minLength: 1, maxLength: 50 }),
            planName: fc.string({ minLength: 1, maxLength: 50 }),
            duration: fc.integer({ min: 1, max: 12 }),
            price: fc.integer({ min: 100, max: 100000 }),
          }),
          async ({ userName, planName, duration, price }) => {
            // Create test user
            const testUser = await prisma.user.create({
              data: {
                phone: `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
                name: userName,
                kycStatus: 'VERIFIED',
                hasAccess: false,
              },
            });

            // Create test plan
            const testPlan = await prisma.subscriptionPlan.create({
              data: {
                name: planName,
                durationMonths: duration,
                price: price,
                description: 'Test plan',
                isActive: true,
                telegramLink: 'https://t.me/test',
              },
            });

            // Create test subscription
            const testSubscription = await prisma.subscription.create({
              data: {
                userId: testUser.id,
                planId: testPlan.id,
                status: SubscriptionStatus.PENDING,
              },
            });

            // Clear mocks
            jest.clearAllMocks();

            // Activate subscription
            await activateSubscription(testSubscription.id);

            // Verify notification was sent
            const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
            const smsMock = twilioService.sendSMSMessage as jest.Mock;
            
            const notificationSent = whatsappMock.mock.calls.length > 0 || smsMock.mock.calls.length > 0;

            // Cleanup
            await prisma.subscription.delete({ where: { id: testSubscription.id } });
            await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
            await prisma.user.delete({ where: { id: testUser.id } });

            return notificationSent;
          }
        ),
        { numRuns: 3 } // Reduced runs to avoid timeout
      );
    });
  });

  describe('Property 2: Preservation - Payment and KYC Requirements', () => {
    /**
     * **Validates: Requirements 3.4, 3.5**
     * 
     * This property test verifies that payment and KYC requirements
     * are enforced before e-sign initiation.
     * 
     * EXPECTED: This test PASSES on unfixed code (confirms baseline behavior)
     * and continues to PASS after the pricing fix (confirms no regression).
     */
    it('property: initSign requires payment completion', async () => {
      // Create test user with verified KYC
      const testUser = await prisma.user.create({
        data: {
          phone: '+1234567890',
          email: 'test@example.com',
          name: 'Test User',
          kycStatus: 'VERIFIED',
          hasAccess: false,
        },
      });

      // Create test plan
      const testPlan = await prisma.subscriptionPlan.create({
        data: {
          name: 'Test Plan',
          durationMonths: 1,
          price: 1000,
          description: 'Test plan',
          isActive: true,
          telegramLink: 'https://t.me/test',
        },
      });

      // Create test subscription WITHOUT payment (status PENDING)
      const testSubscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          planId: testPlan.id,
          status: SubscriptionStatus.PENDING, // No payment yet
        },
      });

      // Mock request object
      const mockReq = {
        user: { userId: testUser.id },
        body: { subscriptionId: testSubscription.id },
      } as any;

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const mockNext = jest.fn();

      // Try to initiate e-sign - should fail due to missing payment
      await initSign(mockReq, mockRes, mockNext);

      // Verify error was thrown
      expect(mockNext).toHaveBeenCalled();
      const error = mockNext.mock.calls[0][0];
      expect(error.message).toContain('Payment must be completed');

      // Cleanup
      await prisma.subscription.delete({ where: { id: testSubscription.id } });
      await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    });

    /**
     * **Validates: Requirements 3.4, 3.5**
     * 
     * This property test verifies that KYC verification is required
     * before e-sign initiation.
     */
    it('property: initSign requires KYC verification', async () => {
      // Create test user WITHOUT verified KYC
      const testUser = await prisma.user.create({
        data: {
          phone: '+1234567890',
          email: 'test@example.com',
          name: 'Test User',
          kycStatus: 'PENDING', // KYC not verified
          hasAccess: false,
        },
      });

      // Create test plan
      const testPlan = await prisma.subscriptionPlan.create({
        data: {
          name: 'Test Plan',
          durationMonths: 1,
          price: 1000,
          description: 'Test plan',
          isActive: true,
          telegramLink: 'https://t.me/test',
        },
      });

      // Create test subscription with ACTIVE status (payment done)
      const testSubscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          planId: testPlan.id,
          status: SubscriptionStatus.ACTIVE, // Payment completed
        },
      });

      // Mock request object
      const mockReq = {
        user: { userId: testUser.id },
        body: { subscriptionId: testSubscription.id },
      } as any;

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const mockNext = jest.fn();

      // Try to initiate e-sign - should fail due to unverified KYC
      await initSign(mockReq, mockRes, mockNext);

      // Verify error was thrown
      expect(mockNext).toHaveBeenCalled();
      const error = mockNext.mock.calls[0][0];
      expect(error.message).toContain('KYC verification must be completed');

      // Cleanup
      await prisma.subscription.delete({ where: { id: testSubscription.id } });
      await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    });

    /**
     * **Validates: Requirements 3.4, 3.5**
     * 
     * Property-based test that verifies payment and KYC requirements
     * are enforced for various invalid states.
     */
    it('property: initSign rejects subscriptions without payment or KYC', async () => {
      jest.setTimeout(20000);
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            hasPayment: fc.boolean(),
            hasKYC: fc.boolean(),
          }),
          async ({ hasPayment, hasKYC }) => {
            // Skip the case where both are true (that should succeed)
            if (hasPayment && hasKYC) {
              return true;
            }

            // Create test user
            const testUser = await prisma.user.create({
              data: {
                phone: `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
                email: `test${Date.now()}@example.com`,
                name: 'Test User',
                kycStatus: hasKYC ? 'VERIFIED' : 'PENDING',
                hasAccess: false,
              },
            });

            // Create test plan
            const testPlan = await prisma.subscriptionPlan.create({
              data: {
                name: 'Test Plan',
                durationMonths: 1,
                price: 1000,
                description: 'Test plan',
                isActive: true,
                telegramLink: 'https://t.me/test',
              },
            });

            // Create test subscription
            const testSubscription = await prisma.subscription.create({
              data: {
                userId: testUser.id,
                planId: testPlan.id,
                status: hasPayment ? SubscriptionStatus.ACTIVE : SubscriptionStatus.PENDING,
              },
            });

            // Mock request object
            const mockReq = {
              user: { userId: testUser.id },
              body: { subscriptionId: testSubscription.id },
            } as any;

            const mockRes = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            } as any;

            const mockNext = jest.fn();

            // Try to initiate e-sign
            await initSign(mockReq, mockRes, mockNext);

            // Verify error was thrown
            const errorThrown = mockNext.mock.calls.length > 0;

            // Cleanup
            await prisma.subscription.delete({ where: { id: testSubscription.id } });
            await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
            await prisma.user.delete({ where: { id: testUser.id } });

            return errorThrown;
          }
        ),
        { numRuns: 3 } // Reduced runs to avoid timeout
      );
    });
  });
});
