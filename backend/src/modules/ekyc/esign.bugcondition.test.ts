/**
 * Bug Condition Exploration Test: Missing Telegram Notification After E-Sign
 * 
 * **Validates: Requirements 1.7, 1.8, 1.9, 1.10**
 * 
 * CRITICAL: This test MUST FAIL on unfixed code - failure confirms the bug exists.
 * DO NOT attempt to fix the test or the code when it fails.
 * 
 * This test encodes the expected behavior - it will validate the fix when it passes
 * after implementation.
 * 
 * GOAL: Surface counterexamples that demonstrate no notification is sent after
 * signStatus becomes SIGNED.
 * 
 * SCOPED PBT APPROACH: Verify no notification logic exists in updateSignStatus,
 * handleSignWebhook, and getSignStatus functions.
 */

import * as fc from 'fast-check';
import prisma from '../../prisma/client';
import { updateSignStatus, handleSignWebhook, getSignStatus } from './esign.controller';
import { SignStatus, SubscriptionStatus } from '@prisma/client';
import * as twilioService from '../auth/twilio.service';
import * as digioService from './digio.service';

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

describe('Bug Condition Exploration: Missing Telegram Notification After E-Sign', () => {
  jest.setTimeout(30000);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Property 1: Bug Condition - Missing Telegram Notification After E-Sign', () => {
    /**
     * **Validates: Requirements 1.7, 1.8**
     * 
     * This test verifies that when signStatus is updated to SIGNED via updateSignStatus,
     * NO Telegram link notification is sent to the user.
     * 
     * EXPECTED OUTCOME: This test FAILS on unfixed code (proves bug exists).
     * After fix: This test PASSES (proves notification is sent).
     */
    it('bug condition: updateSignStatus does NOT send Telegram notification when signStatus becomes SIGNED', async () => {
      // Create test user with verified KYC
      const testUser = await prisma.user.create({
        data: {
          phone: `+91${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
          email: `test${Date.now() + 2}@example.com`,
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

      // Create test subscription with ACTIVE status and REQUESTED sign status
      const testSubscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          planId: testPlan.id,
          status: SubscriptionStatus.ACTIVE,
          signStatus: SignStatus.REQUESTED,
          digioDocId: 'test-digio-doc-id',
        },
      });

      // Mock Digio to return completed status
      (digioService.getDocumentStatus as jest.Mock).mockResolvedValue({
        agreement_status: 'completed',
      });

      // Mock request object
      const mockReq = {
        user: { userId: testUser.id },
        body: {
          subscriptionId: testSubscription.id,
          status: 'success',
        },
      } as any;

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const mockNext = jest.fn();

      // Clear mocks before the test
      jest.clearAllMocks();

      // Call updateSignStatus - this should update signStatus to SIGNED
      await updateSignStatus(mockReq, mockRes, mockNext);

      // Verify signStatus was updated to SIGNED
      const updatedSubscription = await prisma.subscription.findUnique({
        where: { id: testSubscription.id },
      });
      expect(updatedSubscription?.signStatus).toBe(SignStatus.SIGNED);

      // BUG CONDITION: Verify NO Telegram notification was sent
      const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
      const smsMock = twilioService.sendSMSMessage as jest.Mock;

      // Check if any notification was sent
      const whatsappCalls = whatsappMock.mock.calls;
      const smsCalls = smsMock.mock.calls;

      // Look for Telegram link in any sent messages
      const telegramNotificationSent = [...whatsappCalls, ...smsCalls].some(call => {
        const message = call[1] as string;
        return message && (
          message.includes('Telegram') ||
          message.includes('telegram') ||
          message.includes('t.me') ||
          message.includes('signed') ||
          message.includes('agreement')
        );
      });

      // EXPECTED: This assertion FAILS on unfixed code (no notification sent)
      // After fix: This assertion PASSES (notification is sent)
      expect(telegramNotificationSent).toBe(true);

      // Cleanup
      await prisma.subscription.delete({ where: { id: testSubscription.id } });
      await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    });

    /**
     * **Validates: Requirements 1.7, 1.9**
     * 
     * This test verifies that when signStatus is updated to SIGNED via handleSignWebhook,
     * NO Telegram link notification is sent to the user.
     * 
     * EXPECTED OUTCOME: This test FAILS on unfixed code (proves bug exists).
     * After fix: This test PASSES (proves notification is sent).
     */
    it('bug condition: handleSignWebhook does NOT send Telegram notification when signStatus becomes SIGNED', async () => {
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

      // Create test subscription with ACTIVE status and REQUESTED sign status
      const testSubscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          planId: testPlan.id,
          status: SubscriptionStatus.ACTIVE,
          signStatus: SignStatus.REQUESTED,
          digioDocId: 'test-digio-doc-id-webhook',
        },
      });

      // Mock webhook request from Digio
      const mockReq = {
        body: {
          digio_doc_id: 'test-digio-doc-id-webhook',
          status: 'completed',
          event_type: 'sign_completed',
        },
      } as any;

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const mockNext = jest.fn();

      // Clear mocks before the test
      jest.clearAllMocks();

      // Call handleSignWebhook - this should update signStatus to SIGNED
      await handleSignWebhook(mockReq, mockRes, mockNext);

      // Verify signStatus was updated to SIGNED
      const updatedSubscription = await prisma.subscription.findUnique({
        where: { id: testSubscription.id },
      });
      expect(updatedSubscription?.signStatus).toBe(SignStatus.SIGNED);

      // BUG CONDITION: Verify NO Telegram notification was sent
      const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
      const smsMock = twilioService.sendSMSMessage as jest.Mock;

      // Check if any notification was sent
      const whatsappCalls = whatsappMock.mock.calls;
      const smsCalls = smsMock.mock.calls;

      // Look for Telegram link in any sent messages
      const telegramNotificationSent = [...whatsappCalls, ...smsCalls].some(call => {
        const message = call[1] as string;
        return message && (
          message.includes('Telegram') ||
          message.includes('telegram') ||
          message.includes('t.me') ||
          message.includes('signed') ||
          message.includes('agreement')
        );
      });

      // EXPECTED: This assertion FAILS on unfixed code (no notification sent)
      // After fix: This assertion PASSES (notification is sent)
      expect(telegramNotificationSent).toBe(true);

      // Cleanup
      await prisma.subscription.delete({ where: { id: testSubscription.id } });
      await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    });

    /**
     * **Validates: Requirements 1.7, 1.10**
     * 
     * This test verifies that when signStatus is updated to SIGNED via getSignStatus,
     * NO Telegram link notification is sent to the user.
     * 
     * EXPECTED OUTCOME: This test FAILS on unfixed code (proves bug exists).
     * After fix: This test PASSES (proves notification is sent).
     */
    it('bug condition: getSignStatus does NOT send Telegram notification when signStatus becomes SIGNED', async () => {
      // Create test user with verified KYC
      const testUser = await prisma.user.create({
        data: {
          phone: `+91${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
          email: `test${Date.now() + 1}@example.com`,
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

      // Create test subscription with ACTIVE status and REQUESTED sign status
      const testSubscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          planId: testPlan.id,
          status: SubscriptionStatus.ACTIVE,
          signStatus: SignStatus.REQUESTED,
          digioDocId: 'test-digio-doc-id-status',
        },
      });

      // Mock Digio to return completed status
      (digioService.getDocumentStatus as jest.Mock).mockResolvedValue({
        agreement_status: 'completed',
      });

      // Mock request object
      const mockReq = {
        user: { userId: testUser.id },
        params: {
          subscriptionId: testSubscription.id,
        },
      } as any;

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const mockNext = jest.fn();

      // Clear mocks before the test
      jest.clearAllMocks();

      // Call getSignStatus - this should update signStatus to SIGNED
      await getSignStatus(mockReq, mockRes, mockNext);

      // Verify signStatus was updated to SIGNED
      const updatedSubscription = await prisma.subscription.findUnique({
        where: { id: testSubscription.id },
      });
      expect(updatedSubscription?.signStatus).toBe(SignStatus.SIGNED);

      // BUG CONDITION: Verify NO Telegram notification was sent
      const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
      const smsMock = twilioService.sendSMSMessage as jest.Mock;

      // Check if any notification was sent
      const whatsappCalls = whatsappMock.mock.calls;
      const smsCalls = smsMock.mock.calls;

      // Look for Telegram link in any sent messages
      const telegramNotificationSent = [...whatsappCalls, ...smsCalls].some(call => {
        const message = call[1] as string;
        return message && (
          message.includes('Telegram') ||
          message.includes('telegram') ||
          message.includes('t.me') ||
          message.includes('signed') ||
          message.includes('agreement')
        );
      });

      // EXPECTED: This assertion FAILS on unfixed code (no notification sent)
      // After fix: This assertion PASSES (notification is sent)
      expect(telegramNotificationSent).toBe(true);

      // Cleanup
      await prisma.subscription.delete({ where: { id: testSubscription.id } });
      await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    });

    /**
     * **Validates: Requirements 1.7, 1.8, 1.9, 1.10**
     * 
     * Property-based test that verifies NO Telegram notification is sent
     * when signStatus becomes SIGNED across various user/plan combinations.
     * 
     * EXPECTED OUTCOME: This test FAILS on unfixed code (proves bug exists).
     * After fix: This test PASSES (proves notification is sent).
     */
    it('property: NO Telegram notification sent for any subscription when signStatus becomes SIGNED', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            userName: fc.string({ minLength: 1, maxLength: 50 }),
            planName: fc.string({ minLength: 1, maxLength: 50 }),
            duration: fc.integer({ min: 1, max: 12 }),
            price: fc.integer({ min: 100, max: 100000 }),
            telegramLink: fc.constant('https://t.me/testchannel'),
            updateMethod: fc.constantFrom('updateSignStatus', 'handleSignWebhook', 'getSignStatus'),
          }),
          async ({ userName, planName, duration, price, telegramLink, updateMethod }) => {
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
                telegramLink: telegramLink,
              },
            });

            // Create test subscription
            const testSubscription = await prisma.subscription.create({
              data: {
                userId: testUser.id,
                planId: testPlan.id,
                status: SubscriptionStatus.ACTIVE,
                signStatus: SignStatus.REQUESTED,
                digioDocId: `test-digio-${Date.now()}`,
              },
            });

            // Mock Digio to return completed status
            (digioService.getDocumentStatus as jest.Mock).mockResolvedValue({
              agreement_status: 'completed',
            });

            // Clear mocks
            jest.clearAllMocks();

            // Call the appropriate function based on updateMethod
            if (updateMethod === 'updateSignStatus') {
              const mockReq = {
                user: { userId: testUser.id },
                body: {
                  subscriptionId: testSubscription.id,
                  status: 'success',
                },
              } as any;
              const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
              const mockNext = jest.fn();
              await updateSignStatus(mockReq, mockRes, mockNext);
            } else if (updateMethod === 'handleSignWebhook') {
              const mockReq = {
                body: {
                  digio_doc_id: testSubscription.digioDocId,
                  status: 'completed',
                  event_type: 'sign_completed',
                },
              } as any;
              const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
              const mockNext = jest.fn();
              await handleSignWebhook(mockReq, mockRes, mockNext);
            } else {
              const mockReq = {
                user: { userId: testUser.id },
                params: { subscriptionId: testSubscription.id },
              } as any;
              const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
              const mockNext = jest.fn();
              await getSignStatus(mockReq, mockRes, mockNext);
            }

            // Verify signStatus was updated to SIGNED
            const updatedSubscription = await prisma.subscription.findUnique({
              where: { id: testSubscription.id },
            });
            const signStatusUpdated = updatedSubscription?.signStatus === SignStatus.SIGNED;

            // Check if Telegram notification was sent
            const whatsappMock = twilioService.sendWhatsAppMessage as jest.Mock;
            const smsMock = twilioService.sendSMSMessage as jest.Mock;
            const whatsappCalls = whatsappMock.mock.calls;
            const smsCalls = smsMock.mock.calls;

            const telegramNotificationSent = [...whatsappCalls, ...smsCalls].some(call => {
              const message = call[1] as string;
              return message && (
                message.includes('Telegram') ||
                message.includes('telegram') ||
                message.includes('t.me') ||
                message.includes('signed') ||
                message.includes('agreement')
              );
            });

            // Cleanup
            await prisma.subscription.delete({ where: { id: testSubscription.id } });
            await prisma.subscriptionPlan.delete({ where: { id: testPlan.id } });
            await prisma.user.delete({ where: { id: testUser.id } });

            // EXPECTED: signStatus updated but NO notification sent (bug condition)
            // After fix: signStatus updated AND notification sent
            return signStatusUpdated && telegramNotificationSent;
          }
        ),
        { numRuns: 3 } // Reduced runs to avoid timeout
      );
    });
  });
});
