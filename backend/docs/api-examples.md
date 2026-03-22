# API Request Examples

This document provides example requests and responses for all API endpoints.

---

## Health Check

```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Stock Course Backend API is running",
  "timestamp": "2024-01-10T10:00:00.000Z"
}
```

---

## Authentication

### Send OTP

```http
POST /api/auth/send-otp
Content-Type: application/json

{
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": {
    "message": "OTP sent successfully to your WhatsApp",
    "userId": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

### Verify OTP

```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "phone": "9876543210",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "phone": "+919876543210",
      "name": null,
      "email": null,
      "hasAccess": false
    },
    "isNewUser": true
  }
}
```

---

## User Profile

### Get Current User

```http
GET /api/user/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "phone": "+919876543210",
    "name": "John Doe",
    "email": "john@example.com",
    "hasAccess": true,
    "createdAt": "2024-01-10T10:00:00.000Z"
  }
}
```

### Update Profile

```http
POST /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "phone": "+919876543210",
    "name": "John Doe",
    "email": "john@example.com",
    "hasAccess": false,
    "createdAt": "2024-01-10T10:00:00.000Z"
  }
}
```

---

## Subscription Plans

### Get All Plans

```http
GET /api/plans
```

**Response:**
```json
{
  "success": true,
  "message": "Plans retrieved successfully",
  "data": [
    {
      "id": "plan-1-uuid",
      "name": "1 Month Plan",
      "durationMonths": 1,
      "price": "999.00",
      "description": "Access to all stock market courses for 1 month",
      "isActive": true
    },
    {
      "id": "plan-3-uuid",
      "name": "3 Month Plan",
      "durationMonths": 3,
      "price": "2499.00",
      "description": "Access to all stock market courses for 3 months. Save ₹498!",
      "isActive": true
    },
    {
      "id": "plan-6-uuid",
      "name": "6 Month Plan",
      "durationMonths": 6,
      "price": "4499.00",
      "description": "Access to all stock market courses for 6 months. Save ₹1495!",
      "isActive": true
    },
    {
      "id": "plan-12-uuid",
      "name": "12 Month Plan",
      "durationMonths": 12,
      "price": "7999.00",
      "description": "Access to all stock market courses for 12 months. Save ₹3989!",
      "isActive": true
    }
  ]
}
```

---

## Subscriptions

### Initialize Subscription

```http
POST /api/subscriptions/init
Authorization: Bearer <token>
Content-Type: application/json

{
  "planId": "plan-3-uuid"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription initialized successfully",
  "data": {
    "subscription": {
      "id": "sub-uuid",
      "status": "PENDING",
      "startDate": null,
      "endDate": null,
      "createdAt": "2024-01-10T10:00:00.000Z",
      "plan": {
        "id": "plan-3-uuid",
        "name": "3 Month Plan",
        "durationMonths": 3,
        "price": "2499.00"
      }
    },
    "message": "Subscription initialized. Please proceed to payment."
  }
}
```

### Get Current Subscription

```http
GET /api/subscriptions/current
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription retrieved successfully",
  "data": {
    "id": "sub-uuid",
    "status": "ACTIVE",
    "startDate": "2024-01-10T10:00:00.000Z",
    "endDate": "2024-04-10T10:00:00.000Z",
    "createdAt": "2024-01-10T10:00:00.000Z",
    "plan": {
      "id": "plan-3-uuid",
      "name": "3 Month Plan",
      "durationMonths": 3,
      "price": "2499.00"
    }
  }
}
```

---

## Payments

### Create Payment Order

```http
POST /api/payments/create-order
Authorization: Bearer <token>
Content-Type: application/json

{
  "subscriptionId": "sub-uuid"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment order created successfully",
  "data": {
    "orderId": "order_1707312000000_a1b2c3d4",
    "cfOrderId": "cf_order_123456",
    "amount": 2499,
    "currency": "INR",
    "subscriptionId": "sub-uuid",
    "paymentSessionId": "session_xxx"
  }
}
```

### Cashfree Webhook

```http
POST /api/webhooks/cashfree
Content-Type: application/json
X-Webhook-Signature: <signature>
X-Webhook-Timestamp: <timestamp>

{
  "data": {
    "order": {
      "order_id": "order_1707312000000_a1b2c3d4",
      "order_amount": 2499,
      "order_currency": "INR"
    },
    "payment": {
      "cf_payment_id": 123456,
      "payment_status": "SUCCESS",
      "payment_amount": 2499,
      "payment_currency": "INR",
      "payment_message": "Transaction successful",
      "payment_time": "2026-02-07T12:00:00+05:30"
    }
  },
  "event_time": "2026-02-07T12:00:00+05:30",
  "type": "PAYMENT_SUCCESS_WEBHOOK"
}
```

**Response:**
```json
{
  "received": true
}
```

---

## Error Responses

### Validation Error (400)

```json
{
  "success": false,
  "message": "Phone number is required"
}
```

### Unauthorized (401)

```json
{
  "success": false,
  "message": "No token provided"
}
```

### Not Found (404)

```json
{
  "success": false,
  "message": "User not found"
}
```

### Conflict (409)

```json
{
  "success": false,
  "message": "You already have an active subscription"
}
```

### Rate Limited (429)

```json
{
  "success": false,
  "message": "Too many OTP requests, please try again after a minute"
}
```

---

## cURL Examples

### Complete Flow Example

```bash
# 1. Send OTP
curl -X POST http://localhost:3000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "9876543210"}'

# 2. Verify OTP (use the OTP received on WhatsApp)
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "9876543210", "otp": "123456"}'

# 3. Update Profile (use token from step 2)
curl -X POST http://localhost:3000/api/user/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# 4. Get Plans
curl http://localhost:3000/api/plans

# 5. Initialize Subscription
curl -X POST http://localhost:3000/api/subscriptions/init \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"planId": "<plan-id>"}'

# 6. Create Payment Order
curl -X POST http://localhost:3000/api/payments/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"subscriptionId": "<subscription-id>"}'
```
