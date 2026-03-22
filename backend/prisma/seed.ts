import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...\n');

    // Clear existing data (optional - remove in production)
    // Delete subscriptions first to avoid foreign key constraint errors
    await prisma.subscription.deleteMany({});
    console.log('✅ Cleared existing subscriptions');

    // Now we can safely delete subscription plans
    await prisma.subscriptionPlan.deleteMany({});
    console.log('✅ Cleared existing subscription plans\n');

    // Create subscription plans
    const plans = await prisma.subscriptionPlan.createMany({
        data: [
            {
                name: '1 Month Plan',
                durationMonths: 1,
                price: 10.00,
                description: 'Access to all stock market courses for 1 month',
                isActive: true,
            },
            {
                name: '3 Month Plan',
                durationMonths: 3,
                price: 2499.00,
                description: 'Access to all stock market courses for 3 months. Save ₹498!',
                isActive: true,
            },
            {
                name: '6 Month Plan',
                durationMonths: 6,
                price: 4499.00,
                description: 'Access to all stock market courses for 6 months. Save ₹1495!',
                isActive: true,
            },
            {
                name: '12 Month Plan',
                durationMonths: 12,
                price: 7999.00,
                description: 'Access to all stock market courses for 12 months. Save ₹3989!',
                isActive: true,
            },
        ],
    });

    console.log(`✅ Created ${plans.count} subscription plans\n`);

    // Fetch and display created plans
    const allPlans = await prisma.subscriptionPlan.findMany({
        orderBy: { durationMonths: 'asc' },
    });

    console.log('📋 Subscription Plans:');
    console.log('─'.repeat(60));
    allPlans.forEach((plan) => {
        console.log(`  ${plan.name}`);
        console.log(`    Duration: ${plan.durationMonths} month(s)`);
        console.log(`    Price: ₹${plan.price}`);
        console.log(`    ID: ${plan.id}`);
        console.log('');
    });

    console.log('🎉 Database seeding completed!\n');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
