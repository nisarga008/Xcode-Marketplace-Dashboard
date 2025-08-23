# Xcode Online Marketplace – Products Dashboard

A single-page Products module built with **Next.js (App Router) + TypeScript + Tailwind** and **Next API routes**. Implements pagination, sorting, filtering, debounced search, details drawer, loading/empty/error states, and in-memory mock data using Faker.


## Setup & Installation

### 1. Clone the repository

git clone - https://github.com/nisarga008/NextJs_Project008
cd products-dashboard


### 2.Install dependencies

npm install
# or
yarn install

### 3.Environment Variables
PORT=3000
VERCEL_URL=<your-vercel-url>

## 4.Quick Start 
npm install
npm run dev
# Visit http://localhost:3000/products

## 5.Mock Data

The project uses Faker.js to generate mock products in db.ts.By default, 60 products are created with categories:Electronics, Clothing, Home, Beauty, Sports, Grocery
Each product has the following fields:
id,
name,
price, 
stock, 
category, 
status, 
vendor, 
description, 
createdAt.

Data is seeded for consistency using faker.seed(42), ensuring the same data appears onserver and client.
To regenerate mock data, simply restart the server.

## 6.API Overview

## 1.GET /api/products-
Fetch a list of products with filters, search, sorting, and pagination.

| Parameter | Type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| page      | number | Page number (default: 1)                     |
| limit     | number | Items per page (default: 10)                 |
| category  | string | Filter by category                           |
| status    | string | Filter by status (`active` / `out-of-stock`) |
| search    | string | Search by name or vendor                     |
| sortBy    | string | Field to sort by (default: `createdAt`)      |
| sortOrder | string | `asc` or `desc` (default: `desc`)            |


## Sample Request:
GET /api/products?page=1&limit=5&category=Electronics&sortBy=price&sortOrder=asc

## Sample Response:
{
  "items": [ ... ],
  "total": 60,
  "meta": {
    "page": 1,
    "limit": 5,
    "pages": 12,
    "query": "page=1&limit=5&category=Electronics",
    "sortBy": "price",
    "sortOrder": "asc"
  }
}


## 2. POST /api/products-Add a new product.

## Request Body Example:
{
  "name": "Smart Watch",
  "price": 4999,
  "stock": 25,
  "category": "Electronics",
  "status": "active",
  "vendor": "TechCorp",
  "description": "A smartwatch with multiple features"
}

## Sample Response:

{
  "id": "uuid",
  "name": "Smart Watch",
  "price": 4999,
  "stock": 25,
  "category": "Electronics",
  "status": "active",
  "vendor": "TechCorp",
  "description": "A smartwatch with multiple features",
  "createdAt": "2025-08-23T10:00:00Z"
}

## 3.PUT /api/products/[id]-Update an existing product (partial updates allowed).

## Request Body Example:
{
  "stock": 30,
  "status": "active"
}

## Sample Response:

{
  "id": "uuid",
  "name": "Smart Watch",
  "price": 4999,
  "stock": 30,
  "category": "Electronics",
  "status": "active",
  "vendor": "TechCorp",
  "description": "A smartwatch with multiple features",
  "createdAt": "2025-08-23T10:00:00Z"
}



## ChatGPT / AI assistance was used to:

1.Generate structured README content.

2.Suggest Next.js best practices for server/client rendering.

3.Solve hydration and data formatting issues.

4.AI helped improve development speed, reduce debugging time, and provide best practices for SSR + client components.





