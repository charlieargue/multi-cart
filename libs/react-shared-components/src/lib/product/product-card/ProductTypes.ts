// thx: https://github.com/vercel/commerce/blob/master/framework/commerce/types/product.ts
// NOTE: just mocking all product-related things for now

export type ProductPrice = {
  value: number
  currencyCode?: 'USD' | 'PLN' | string
}

export type Product = {
  id: string
  name: string
  description: string
  price: number;
  descriptionHtml?: string
  sku?: string
  slug?: string
  // NOTE: all images pulled dynamically from unplash for now
}

