# Stock Market Course Subscription Platform - Phase 1 Backend

A production-grade backend API for a stock market course subscription platform with WhatsApp OTP authentication and Cashfree payments.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript (strict mode)
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **OTP**: Twilio WhatsApp
- **Payments**: Cashfree

## Project Structure

```
src/
├── config/             # Environment configuration
├── middlewares/        # Auth, error handling, rate limiting
├── modules/
│   ├── auth/          # OTP authentication
│   ├── user/          # User profile management
│   ├── plan/          # Subscription plans
│   ├── subscription/  # Subscription management
│   └── payment/       # Cashfree integration
├── prisma/            # Database client
├── utils/             # Helper functions
└── server.ts          # Express server entry point
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_PHONE_NUMBER` - Twilio sender number (or `TWILIO_WHATSAPP_NUMBER` as alias)
- `CASHFREE_CLIENT_ID` - Cashfree client ID
- `CASHFREE_CLIENT_SECRET` - Cashfree client secret

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database with subscription plans
npx ts-node prisma/seed.ts
```

### 4. Start the Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/api/auth/send-otp`   | Send WhatsApp OTP    |
| POST   | `/api/auth/verify-otp` | Verify OTP & get JWT |

### User

| Method | Endpoint            | Auth | Description      |
| ------ | ------------------- | ---- | ---------------- |
| GET    | `/api/user/me`      | Yes  | Get current user |
| POST   | `/api/user/profile` | Yes  | Update profile   |

### Plans

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/api/plans` | List all plans |

### Subscriptions

| Method | Endpoint                     | Auth | Description              |
| ------ | ---------------------------- | ---- | ------------------------ |
| POST   | `/api/subscriptions/init`    | Yes  | Initialize subscription  |
| GET    | `/api/subscriptions/current` | Yes  | Get current subscription |

### Payments

| Method | Endpoint                     | Auth | Description           |
| ------ | ---------------------------- | ---- | --------------------- |
| POST   | `/api/payments/create-order` | Yes  | Create Cashfree order |
| POST   | `/api/webhooks/cashfree`     | No\* | Payment webhook       |

\*Webhook is verified using Cashfree signature

## API Examples

See `docs/api-examples.md` for complete request/response examples.

## License

ISC
