// Shopify Storefront API client
// Docs: https://shopify.dev/docs/api/storefront

const SHOPIFY_DOMAIN = process.env.EXPO_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_VERSION = '2024-01';

interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function storefrontQuery<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<ShopifyResponse<T>> {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// --- Product queries ---

export async function getProducts(first = 20, cursor?: string) {
  return storefrontQuery(`
    query GetProducts($first: Int!, $cursor: String) {
      products(first: $first, after: $cursor) {
        edges {
          cursor
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
            images(first: 1) {
              edges { node { url altText } }
            }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `, { first, cursor });
}

export async function getProduct(handle: string) {
  return storefrontQuery(`
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        images(first: 10) {
          edges { node { url altText } }
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
              selectedOptions { name value }
            }
          }
        }
        options { name values }
      }
    }
  `, { handle });
}

// --- Checkout ---

export async function createCheckout(lineItems: Array<{ variantId: string; quantity: number }>) {
  return storefrontQuery(`
    mutation CreateCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          totalPrice { amount currencyCode }
        }
        checkoutUserErrors { code field message }
      }
    }
  `, {
    input: {
      lineItems: lineItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    },
  });
}
