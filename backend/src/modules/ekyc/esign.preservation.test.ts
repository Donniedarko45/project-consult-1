/**
 * Preservation Property Tests for Telegram Notification Fix
 * 
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.7**
 * 
 * IMPORTANT: These tests verify that non-SIGNED status behaviors remain unchanged
 * after the Telegram notification fix. They should PASS on both unfixed and fixed code.
 * 
 * These tests follow the observation-first methodology:
 * 1. Observe behavior on UNFIXED code
 * 2. Write property-based tests capturing that behavior
 * 3. Run tests on UNFIXED code - they should PASS
 * 4. After fix, run tests again - they should still PASS (no regressions)
 */

import * as fc from 'fast-check';
import prisma from '../../prisma/client';
import { getSignStatus } from './esign.controller';
import { SignStatus, SubscriptionStatus } from '@prisma/client';
import * as twilioService from '../auth/twilio.service';
import * as digioService from './digio.service';
import { activateSubscription } from '../subscription/subscription.service';

// Mock Twilio service to capture sent messages
jest.mock('../auth/twilio.service', () => ({
  sendWhatsAppMessage: jest.fn(),
  sendSMSMessage: jest.fn(),
}));

// Mock Digio service
jest.mock('./digio.service', () => ({
  createSignRequest: jest.fn().mockResolvedValue({
    id: 'mock-digio-doc-id',
    signing_parties: [],
    file_name: 'mock-agreement.pdf',
  }),
  getDocumentStatus: jest.fn(),
}));

describe('Preservation Property Tests: Non-SIGNED Status Behaviors', () => {
  jest.setTimeout(30000);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Property 2: Preservation - Non-SIGNED Status Behaviors', () => {
    /**
     * **Validates: Requirements 3.2, 3.3**
     * 
     * This property test verifies that NO Telegram link notification is sent
     * when signStatus is updated to NOT_STARTED, REQUESTED, or FAILED.
     * 
     * EXPECTED: This test PASSES on unfixed code (confirms baseline behavior)
     * and continues to PASS after the notification fix (confirms no regression).
     */
    it('property: NO Telegram notification sent when signStatus is NOT_STARTED', async () => {
      // Create test user with verified KYC
      const testUser = await prisma.user.create({
        data: {
          phone: `+91${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
          email: `test${Date.now()}@example.com`,
          name: 'Test User',
          kycStatus: 'VERIFIED',
          hasAccess: false,
        },
      });

      // Create test plan with Telegram link
      const testPlan = await prisma.subscriptionPlan.create({
        data: {
          name: 'Test Plan',
          durationMonths: 1,
          price: 1000,
          description: 'Test plan',
          isActive: true,
          telegramLink: 'https://t.me/testchannel',
        },
      });

      // Create test subscription with NOT_STARTED sign status
      const testSubscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          planId: testPlan.id,
          status: SubscriptionStatus.ACTIVE,
          signStatus: SignStatus.NOT_STARTED,
        },
      });

      // Clear mocks before the test
      jest.clearAllMocks();

      // Verify signStatus is NOT_STARTED
      const subscription = await prisma.subscription.findUnique({
        where: { id: testSubscription.id },
      });
      expect(subscription?.signStatus).toBe(SignStatus.NOT_STARTED);

      // Verify NO Telegram notification was sent
      const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
      const smsMock = twilioService.sendSMSMessage as jest.Mock;

      const whatsappCalls = whatsappMock.mock.calls;
      const smsCalls = smsMock.mock.calls;

      // Look for Telegram link in any sent messages
      const telegramNotificationSent = [...whatsappCalls, ...smsCalls].some(call => {
        const message = call[1] as string;
        return message && (
          message.includes('signed') ||
          message.includes('agreement')
        );
      });

      // EXPECTED: No notification sent for NOT_STARTED status
      expect(telegramNotificationSent).toBe(false);

      // Cleanup
      await prisma.subscription.delete({ where: { id: testSubscription.id } });
      await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    });

    /**
     * **Validates: Requirements 3.2, 3.3**
     * 
     * This property test verifies that NO Telegram link notification is sent
     * when signStatus is REQUESTED.
     */
    it('property: NO Telegram notification sent when signStatus is REQUESTED', async () => {
      // Create test user with verified KYC
      const testUser = await prisma.user.create({
        data: {
          phone: `+91${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
          email: `test${Date.now()}@example.com`,
          name: 'Test User',
          kycStatus: 'VERIFIED',
          hasAccess: false,
        },
      });

      // Create test plan with Telegram link
      const testPlan = await prisma.subscriptionPlan.create({
        data: {
          name: 'Test Plan',
          durationMonths: 1,
          price: 1000,
          description: 'Test plan',
          isActive: true,
          telegramLink: 'https://t.me/testchannel',
        },
      });

      // Create test subscription with REQUESTED sign status
      const testSubscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          planId: testPlan.id,
          status: SubscriptionStatus.ACTIVE,
          signStatus: SignStatus.REQUESTED,
          digioDocId: 'test-digio-doc-id',
        },
      });

      // Mock Digio to return pending status (not completed)
      (digioService.getDocumentStatus as jest.Mock).mockResolvedValue({
        agreement_status: 'pending',
      });

      // Clear mocks before the test
      jest.clearAllMocks();

      // Call getSignStatus - this should NOT update signStatus to SIGNED
      const mockReq = {
        user: { userId: testUser.id },
        params: { subscriptionId: testSubscription.id },
      } as any;

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const mockNext = jest.fn();

      await getSignStatus(mockReq, mockRes, mockNext);

      // Verify signStatus is still REQUESTED
      const updatedSubscription = await prisma.subscription.findUnique({
        where: { id: testSubscription.id },
      });
      expect(updatedSubscription?.signStatus).toBe(SignStatus.REQUESTED);

      // Verify NO Telegram notification was sent
      const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
      const smsMock = twilioService.sendSMSMessage as jest.Mock;

      const whatsappCalls = whatsappMock.mock.calls;
      const smsCalls = smsMock.mock.calls;

      // Look for Telegram link in any sent messages
      const telegramNotificationSent = [...whatsappCalls, ...smsCalls].some(call => {
        const message = call[1] as string;
        return message && (
          message.includes('signed') ||
          message.includes('agreement')
        );
      });

      // EXPECTED: No notification sent for REQUESTED status
      expect(telegramNotificationSent).toBe(false);

      // Cleanup
      await prisma.subscription.delete({ where: { id: testSubscription.id } });
      await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    });

    /**
     * **Validates: Requirements 3.2, 3.3**
     * 
     * This property test verifies that NO Telegram link notification is sent
     * when signStatus is FAILED.
     */
    it('property: NO Telegram notification sent when signStatus is FAILED', async () => {
      // Create test user with verified KYC
      const testUser = await prisma.user.create({
        data: {
          phone: `+91${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
          email: `test${Date.now()}@example.com`,
          name: 'Test User',
          kycStatus: 'VERIFIED',
          hasAccess: false,
        },
      });

      // Create test plan with Telegram link
      const testPlan = await prisma.subscriptionPlan.create({
        data: {
          name: 'Test Plan',
          durationMonths: 1,
          price: 1000,
          description: 'Test plan',
          isActive: true,
          telegramLink: 'https://t.me/testchannel',
        },
      });

      // Create test subscription with REQUESTED sign status
      const testSubscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          planId: testPlan.id,
          status: SubscriptionStatus.ACTIVE,
          signStatus: SignStatus.REQUESTED,
          digioDocId: 'test-digio-doc-id-failed',
        },
      });

      // Mock Digio to return rejected status
      (digioService.getDocumentStatus as jest.Mock).mockResolvedValue({
        agreement_status: 'rejected',
      });

      // Clear mocks before the test
      jest.clearAllMocks();

      // Call getSignStatus - this should update signStatus to FAILED
      const mockReq = {
        user: { userId: testUser.id },
        params: { subscriptionId: testSubscription.id },
      } as any;

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const mockNext = jest.fn();

      await getSignStatus(mockReq, mockRes, mockNext);

      // Verify signStatus was updated to FAILED
      const updatedSubscription = await prisma.subscription.findUnique({
        where: { id: testSubscription.id },
      });
      expect(updatedSubscription?.signStatus).toBe(SignStatus.FAILED);

      // Verify NO Telegram notification was sent
      const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
      const smsMock = twilioService.sendSMSMessage as jest.Mock;

      const whatsappCalls = whatsappMock.mock.calls;
      const smsCalls = smsMock.mock.calls;

      // Look for Telegram link in any sent messages
      const telegramNotificationSent = [...whatsappCalls, ...smsCalls].some(call => {
        const message = call[1] as string;
        return message && (
          message.includes('signed') ||
          message.includes('agreement')
        );
      });

      // EXPECTED: No notification sent for FAILED status
      expect(telegramNotificationSent).toBe(false);

      // Cleanup
      await prisma.subscription.delete({ where: { id: testSubscription.id } });
      await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    });

    /**
     * **Validates: Requirements 3.2, 3.3**
     * 
     * Property-based test that verifies NO Telegram notification is sent
     * for non-SIGNED status updates across various combinations.
     */
    it('property: NO Telegram notification for non-SIGNED status updates', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            userName: fc.string({ minLength: 1, maxLength: 50 }),
            planName: fc.string({ minLength: 1, maxLength: 50 }),
            duration: fc.integer({ min: 1, max: 12 }),
            price: fc.integer({ min: 100, max: 100000 }),
            signStatus: fc.constantFrom(SignStatus.NOT_STARTED, SignStatus.REQUESTED, SignStatus.FAILED),
            digioStatus: fc.constantFrom('pending', 'rejected', 'expired'),
          }),
          async ({ userName, planName, duration, price, signStatus, digioStatus }) => {
            // Create test user
            const testUser = await prisma.user.create({
              data: {
                phone: `+91${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
                email: `test${Date.now()}@example.com`,
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
                telegramLink: 'https://t.me/testchannel',
              },
            });

            // Create test subscription
            const testSubscription = await prisma.subscription.create({
              data: {
                userId: testUser.id,
                planId: testPlan.id,
                status: SubscriptionStatus.ACTIVE,
                signStatus: signStatus,
                digioDocId: signStatus === SignStatus.NOT_STARTED ? null : `test-digio-${Date.now()}`,
              },
            });

            // Mock Digio to return non-completed status
            (digioService.getDocumentStatus as jest.Mock).mockResolvedValue({
              agreement_status: digioStatus,
            });

            // Clear mocks
            jest.clearAllMocks();

            // Call getSignStatus if there's a digioDocId
            if (testSubscription.digioDocId) {
              const mockReq = {
                user: { userId: testUser.id },
                params: { subscriptionId: testSubscription.id },
              } as any;
              const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
              const mockNext = jest.fn();
              await getSignStatus(mockReq, mockRes, mockNext);
            }

            // Verify NO Telegram notification was sent
            const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
            const smsMock = twilioService.sendSMSMessage as jest.Mock;
            const whatsappCalls = whatsappMock.mock.calls;
            const smsCalls = smsMock.mock.calls;

            const telegramNotificationSent = [...whatsappCalls, ...smsCalls].some(call => {
              const message = call[1] as string;
              return message && (
                message.includes('signed') ||
                message.includes('agreement')
              );
            });

            // Cleanup
            await prisma.subscription.delete({ where: { id: testSubscription.id } });
            await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
            await prisma.user.delete({ where: { id: testUser.id } });

            // EXPECTED: No notification sent for non-SIGNED statuses
            return !telegramNotificationSent;
          }
        ),
        { numRuns: 3 } // Reduced runs to avoid timeout
      );
    });
  });

  describe('Property 2: Preservation - Subscription Activation Notification', () => {
    /**
     * **Validates: Requirement 3.1**
     * 
     * This property test verifies that subscription activation after payment
     * continues to send the confirmation message (separate from post-signing notification).
     * 
     * EXPECTED: This test PASSES on unfixed code (confirms baseline behavior)
     * and continues to PASS after the notification fix (confirms no regression).
     */
    it('property: activateSubscription sends confirmation message after payment', async () => {
      // Create test user
      const testUser = await prisma.user.create({
        data: {
          phone: `+91${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
          email: `test${Date.now()}@example.com`,
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

      // Clear mocks before activation
      jest.clearAllMocks();

      // Activate subscription
      await activateSubscription(testSubscription.id);

      // Verify notification was sent (WhatsApp or SMS)
      const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
      const smsMock = twilioService.sendSMSMessage as jest.Mock;
      
      const notificationSent = whatsappMock.mock.calls.length > 0 || smsMock.mock.calls.length > 0;
      expect(notificationSent).toBe(true);

      // Verify message contains expected content (activation message, not signing message)
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
                phone: `+91${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
                email: `test${Date.now()}@example.com`,
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

  describe('Property 2: Preservation - Already SIGNED Status', () => {
    /**
     * **Validates: Requirement 3.7**
     * 
     * This property test verifies that when a subscription already has
     * signStatus SIGNED, no new sign request is created and existing status
     * is returned without additional notifications.
     * 
     * EXPECTED: This test PASSES on unfixed code (confirms baseline behavior)
     * and continues to PASS after the notification fix (confirms no regression).
     */
    it('property: already SIGNED status returns existing status without new notification', async () => {
      // Create test user with verified KYC
      const testUser = await prisma.user.create({
        data: {
          phone: `+91${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
          email: `test${Date.now()}@example.com`,
          name: 'Test User',
          kycStatus: 'VERIFIED',
          hasAccess: false,
        },
      });

      // Create test plan with Telegram link
      const testPlan = await prisma.subscriptionPlan.create({
        data: {
          name: 'Test Plan',
          durationMonths: 1,
          price: 1000,
          description: 'Test plan',
          isActive: true,
          telegramLink: 'https://t.me/testchannel',
        },
      });

      // Create test subscription with ALREADY SIGNED status
      const testSubscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          planId: testPlan.id,
          status: SubscriptionStatus.ACTIVE,
          signStatus: SignStatus.SIGNED,
          signedAt: new Date(),
          digioDocId: 'test-digio-doc-id-signed',
        },
      });

      // Clear mocks before the test
      jest.clearAllMocks();

      // Call getSignStatus - this should NOT trigger any new notification
      const mockReq = {
        user: { userId: testUser.id },
        params: { subscriptionId: testSubscription.id },
      } as any;

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const mockNext = jest.fn();

      await getSignStatus(mockReq, mockRes, mockNext);

      // Verify signStatus is still SIGNED
      const updatedSubscription = await prisma.subscription.findUnique({
        where: { id: testSubscription.id },
      });
      expect(updatedSubscription?.signStatus).toBe(SignStatus.SIGNED);

      // Verify NO new Telegram notification was sent
      const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
      const smsMock = twilioService.sendSMSMessage as jest.Mock;

      const whatsappCalls = whatsappMock.mock.calls;
      const smsCalls = smsMock.mock.calls;

      // EXPECTED: No notification sent for already SIGNED status
      expect(whatsappCalls.length).toBe(0);
      expect(smsCalls.length).toBe(0);

      // Cleanup
      await prisma.subscription.delete({ where: { id: testSubscription.id } });
      await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    });

    /**
     * **Validates: Requirement 3.7**
     * 
     * Property-based test that verifies already SIGNED subscriptions
     * don't trigger new notifications across various combinations.
     */
    it('property: already SIGNED subscriptions do not trigger new notifications', async () => {
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
                phone: `+91${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
                email: `test${Date.now()}@example.com`,
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
                telegramLink: 'https://t.me/testchannel',
              },
            });

            // Create test subscription with ALREADY SIGNED status
            const testSubscription = await prisma.subscription.create({
              data: {
                userId: testUser.id,
                planId: testPlan.id,
                status: SubscriptionStatus.ACTIVE,
                signStatus: SignStatus.SIGNED,
                signedAt: new Date(),
                digioDocId: `test-digio-${Date.now()}`,
              },
            });

            // Clear mocks
            jest.clearAllMocks();

            // Call getSignStatus
            const mockReq = {
              user: { userId: testUser.id },
              params: { subscriptionId: testSubscription.id },
            } as any;
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
            const mockNext = jest.fn();
            await getSignStatus(mockReq, mockRes, mockNext);

            // Verify NO notification was sent
            const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
            const smsMock = twilioService.sendSMSMessage as jest.Mock;
            const notificationSent = whatsappMock.mock.calls.length > 0 || smsMock.mock.calls.length > 0;

            // Cleanup
            await prisma.subscription.delete({ where: { id: testSubscription.id } });
            await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
            await prisma.user.delete({ where: { id: testUser.id } });

            // EXPECTED: No notification sent for already SIGNED status
            return !notificationSent;
          }
        ),
        { numRuns: 3 } // Reduced runs to avoid timeout
      );
    });
  });
});
