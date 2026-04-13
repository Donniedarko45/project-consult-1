import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const services = [
  {
    name: 'Index Futures & Options',
    telegramLink: 'https://t.me/indexfuturesandoptions',
    plans: [
      { duration: 1, price: 2999, label: 'Monthly', description: 'Index F&O — Nifty, Sensex, Bank Nifty & Fin Nifty setups. 1 Month.' },
      { duration: 3, price: 8547, label: '3 Month', description: 'Index F&O — 3-Month Plan. Save 10%!' },
      { duration: 6, price: 16195, label: '6 Month', description: 'Index F&O — 6-Month Plan. Save 15%!' },
      { duration: 9, price: 22942, label: '9 Month', description: 'Index F&O — 9-Month Plan. Save 25%!' },
      { duration: 12, price: 28790, label: '12 Month', description: 'Index F&O — 12-Month Plan. Save 35%!' },
    ],
  },
  {
    name: 'Stock Futures & Options',
    telegramLink: 'https://t.me/stockfuturesandoptions',
    plans: [
      { duration: 1, price: 2999, label: 'Monthly', description: 'Stock F&O — High-potential stock derivative setups. 1 Month.' },
      { duration: 3, price: 8547, label: '3 Month', description: 'Stock F&O — 3-Month Plan. Save 10%!' },
      { duration: 6, price: 16195, label: '6 Month', description: 'Stock F&O — 6-Month Plan. Save 15%!' },
      { duration: 9, price: 22942, label: '9 Month', description: 'Stock F&O — 9-Month Plan. Save 25%!' },
      { duration: 12, price: 28790, label: '12 Month', description: 'Stock F&O — 12-Month Plan. Save 35%!' },
    ],
  },
  {
    name: 'Hero Zero Expiry Premium',
    telegramLink: 'https://t.me/herozeropremiumtrades',
    plans: [
      { duration: 1, price: 7500, label: 'Monthly', description: 'Hero Zero Expiry Premium — Expiry day special setups. 1 Month.' },
      { duration: 3, price: 21375, label: '3 Month', description: 'Hero Zero Expiry Premium — 3-Month Plan. Save 10%!' },
      { duration: 6, price: 40500, label: '6 Month', description: 'Hero Zero Expiry Premium — 6-Month Plan. Save 15%!' },
      { duration: 9, price: 57375, label: '9 Month', description: 'Hero Zero Expiry Premium — 9-Month Plan. Save 25%!' },
      { duration: 12, price: 72000, label: '12 Month', description: 'Hero Zero Expiry Premium — 12-Month Plan. Save 35%!' },
    ],
  },
  {
    name: 'Index Option Selling',
    telegramLink: 'https://t.me/indexoptionsellingtrades',
    plans: [
      { duration: 1, price: 4, label: 'Monthly', description: 'Index Option Selling — Consistent income with hedged strategies. 1 Month.(Demo)' },
      { duration: 1, price: 2499, label: 'Monthly', description: 'Index Option Selling — Consistent income with hedged strategies. 1 Month.' },
      { duration: 3, price: 7122, label: '3 Month', description: 'Index Option Selling — 3-Month Plan. Save 10%!' },
      { duration: 6, price: 13495, label: '6 Month', description: 'Index Option Selling — 6-Month Plan. Save 15%!' },
      { duration: 9, price: 19117, label: '9 Month', description: 'Index Option Selling — 9-Month Plan. Save 25%!' },
      { duration: 12, price: 23990, label: '12 Month', description: 'Index Option Selling — 12-Month Plan. Save 35%!' },
    ],
  },
  {
    name: 'Equity Cash | Multibagger Picks',
    telegramLink: 'https://t.me/equitycashmultibaggerstock',
    plans: [
      { duration: 1, price: 1999, label: 'Monthly', description: 'Equity Cash & Multibagger Picks — Fundamentally strong stocks. 1 Month.' },
      { duration: 3, price: 5697, label: '3 Month', description: 'Equity Cash & Multibagger Picks — 3-Month Plan. Save 10%!' },
      { duration: 6, price: 10795, label: '6 Month', description: 'Equity Cash & Multibagger Picks — 6-Month Plan. Save 15%!' },
      { duration: 9, price: 15292, label: '9 Month', description: 'Equity Cash & Multibagger Picks — 9-Month Plan. Save 25%!' },
      { duration: 12, price: 19190, label: '12 Month', description: 'Equity Cash & Multibagger Picks — 12-Month Plan. Save 35%!' },
    ],
  },
];

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Deactivate old plans instead of deleting (preserves existing subscriptions)
  const deactivated = await prisma.subscriptionPlan.updateMany({
    data: { isActive: false },
  });
  console.log(`✅ Deactivated ${deactivated.count} old plan(s)\n`);

  // Create new service-based plans
  let totalCreated = 0;
  for (const service of services) {
    for (const plan of service.plans) {
      await prisma.subscriptionPlan.create({
        data: {
          name: `${service.name} — ${plan.label}`,
          durationMonths: plan.duration,
          price: plan.price,
          description: plan.description,
          isActive: true,
          telegramLink: service.telegramLink,
        },
      });
      totalCreated++;
    }
    console.log(`✅ Created ${service.plans.length} plan(s) for: ${service.name}`);
    console.log(`   Telegram: ${service.telegramLink}\n`);
  }

  console.log(`\n🎉 Seeding complete! Created ${totalCreated} plans across ${services.length} services.\n`);

  // Show summary
  const allActive = await prisma.subscriptionPlan.findMany({
    where: { isActive: true },
    orderBy: [{ name: 'asc' }, { durationMonths: 'asc' }],
  });

  console.log('📋 Active Plans:');
  console.log('─'.repeat(70));
  for (const p of allActive) {
    console.log(`  ${p.name}`);
    console.log(`    Price: ₹${p.price}  |  Duration: ${p.durationMonths} month(s)`);
    console.log(`    Telegram: ${p.telegramLink ?? 'N/A'}`);
    console.log('');
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
