# Ecommerce Agent

You are setting up ecommerce via Shopify, integrated with the mobile app and/or landing page.

## Stack
- **Platform**: Shopify (Storefront API + Admin API)
- **Mobile SDK**: `@shopify/hydrogen-react` or Storefront API via GraphQL
- **Web**: Shopify Storefront API via Next.js (in `landing/`)
- **Client**: `lib/shopify.ts`

## Architecture

### Option A: Headless Shopify (Recommended)
Use Shopify as a backend for products, inventory, checkout, and orders. Build your own frontend in the mobile app and/or landing page.

- **Storefront API** (public, read-only): Browse products, collections, search
- **Checkout API**: Create checkout sessions, apply discounts
- **Customer API**: Account creation, order history, addresses
- **Admin API** (private, server-side only): Manage products, inventory, orders, fulfillment

### Option B: Shopify Buy Button / Embedded
Redirect users to Shopify-hosted checkout. Simpler but less control.

## Shopify Setup

### 1. Create Shopify Store
1. Sign up at shopify.com (or use a development store for free)
2. Add products, collections, variants, images
3. Configure shipping zones and rates
4. Set up payment providers (Shopify Payments, Stripe, etc.)

### 2. Create Storefront API Access
1. Shopify Admin → Settings → Apps and sales channels → Develop apps
2. Create a custom app
3. Configure Storefront API scopes:
   - `unauthenticated_read_products` — browse products
   - `unauthenticated_read_product_listings` — product listings
   - `unauthenticated_read_product_tags` — tags/filtering
   - `unauthenticated_read_collections` — collections
   - `unauthenticated_write_checkouts` — create checkouts
   - `unauthenticated_read_checkouts` — read checkout state
   - `unauthenticated_read_customers` — customer accounts (optional)
4. Copy the Storefront Access Token

### 3. Configure Admin API (server-side only)
1. Same custom app → Admin API scopes:
   - `read_products`, `write_products`
   - `read_orders`, `write_orders`
   - `read_inventory`, `write_inventory`
   - `read_fulfillments`, `write_fulfillments`
2. Copy the Admin API Access Token
3. **NEVER expose the Admin API token client-side**

### 4. Environment Variables
```
EXPO_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=shpat_xxx
SHOPIFY_ADMIN_TOKEN=shpat_xxx  # Server-side only, NOT EXPO_PUBLIC_
```

## `lib/shopify.ts` Client

### Storefront API Client
```typescript
const SHOPIFY_DOMAIN = process.env.EXPO_PUBLIC_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

async function storefrontQuery(query: string, variables?: Record<string, any>) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}
```

### Key Operations
- `getProducts(first, cursor?)` — paginated product listing
- `getProduct(handle)` — single product by handle
- `getCollections()` — all collections
- `getCollectionProducts(handle)` — products in a collection
- `searchProducts(query)` — full-text search
- `createCheckout(lineItems)` — create checkout session → returns checkout URL
- `getCheckout(checkoutId)` — check checkout status

## Mobile App Integration

### Product Listing Screen
- Fetch products via Storefront API
- Display: image, title, price, variants
- Filter by collection or tags
- Search with debounced query

### Product Detail Screen
- Product images (swipeable gallery)
- Variant selector (size, color, etc.)
- Price display (with compare-at price for sales)
- Add to cart button
- Product description (render HTML/markdown)

### Cart
- Local cart state (React Context or Zustand)
- Cart items: product variant ID, quantity, title, image, price
- Cart drawer or dedicated screen
- Update quantity, remove items
- Cart total calculation

### Checkout
- Create Shopify checkout with cart items
- Open checkout URL in `expo-web-browser` (Shopify-hosted checkout)
- OR build custom checkout with Shopify Checkout API (more complex)
- Handle post-checkout redirect back to app

### Order History (if auth enabled)
- Link Shopify customer to Supabase user (via email)
- Fetch orders via Storefront API Customer Access Token
- Display order list with status, tracking

## Landing Page / Web Store Integration

### Next.js Pages
```
landing/app/
  shop/
    page.tsx                # Product listing / store homepage
    [handle]/page.tsx       # Product detail page
  cart/
    page.tsx                # Cart page
```

### Server-Side Data Fetching
- Use Storefront API in Server Components for SEO
- Product pages should be statically generated or ISR for performance
- Cart interactions are client-side

### Checkout Flow (Web)
- Create checkout → redirect to Shopify checkout URL
- OR embed Shopify checkout (requires Shopify Plus)
- Post-checkout redirect back to landing page with order confirmation

## Webhooks (Server-Side)

Set up Shopify webhooks → Supabase Edge Functions for:
- `orders/create` — sync new orders to Supabase for CRM
- `orders/fulfilled` — update order status, trigger push notification
- `products/update` — cache invalidation

Webhook endpoint: `https://<project>.supabase.co/functions/v1/shopify-webhook`

Verify webhook signature using `X-Shopify-Hmac-Sha256` header.

## Credentials Required (ask developer early!)
> Run `.claude/workflows/provision-services.md` to auto-provision Supabase and guide service setup.

- [ ] Shopify store domain (your-store.myshopify.com)
- [ ] Storefront API access token
- [ ] Admin API access token (for server-side operations)
- [ ] Webhook secret (for signature verification)

## Context File
Create `.claude/context/shopify.md` documenting:
- Store domain
- API version in use
- Storefront API scopes enabled
- Admin API scopes enabled
- Product structure (what custom metafields exist)
- Webhook endpoints configured
- Checkout flow chosen (Shopify-hosted vs custom)

## Implementation Order
1. Create Shopify development store + add sample products
2. Create custom app + get API tokens
3. Implement `lib/shopify.ts` with Storefront API client
4. Build product listing screen (mobile) or page (web)
5. Build product detail screen/page
6. Build cart (local state)
7. Implement checkout flow (Shopify-hosted URL)
8. Add webhook handlers for order sync
9. Connect to CRM if active (orders → deals, customers → contacts)
