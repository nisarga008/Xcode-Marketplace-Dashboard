# Xcode Online Marketplace – Products Dashboard

A single-page Products module built with **Next.js (App Router) + TypeScript + Tailwind** and **Next API routes**. Implements pagination, sorting, filtering, debounced search, details drawer, loading/empty/error states, and in-memory mock data using Faker.

## Tech Stack
Next.js
Typescript
Tailwind Css
etc.

## Setup & Installation

### 1. Clone the repository

git clone - https://github.com/nisarga008/Xcode-Marketplace-Dashboard
cd products-dashboard


### 2.Install dependencies

npm install
# or
yarn install

### 3.Environment Variables
PORT=3000
VERCEL_URL=xcode-marketplace-dashboard-xxb8k6oaa-nisargapandeys-projects.vercel.app

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




## Time Spent

Approximately 4 hours — a solid, efficient timeframe to ideate, implement, debug, and polish the UI and core functionalities.

## Challenges Faced

Pagination Logic: Handling queries like limit and page and updating the data display accordingly.

Filter Integration: Applying combined filters (category, status, search term) while preserving pagination state.

UI State Management: Synchronizing filter inputs, table data, and navigation without conflicts.

Dynamic Data Exposure: Ensuring real-time clarity of “Total: 60” products and the “Visible Products by Category” heading 
Xcode Marketplace Dashboard.

Possibly addressing API calls and asynchronous data fetching with loading/error handling.

## Bonus Features Added

Combined Filters + Search: Filtering by category and status, plus search—a unified control panel for user-friendly interactions.

Responsive Table Layout: Clean display of product attributes including prices, stock levels, categories, and vendor details.

Pagination Controls: "Prev Page" and "Next" links with page number indicator (e.g., "Page 1 of 6") 
Xcode Marketplace Dashboard.

Status Tags & Data Totals: Visual cues via status flags ("Active", "Out of Stock") plus total count display.

## ChatGPT / AI assistance was used to:

1.Generate structured README content.

2.Suggest Next.js best practices for server/client rendering.

3.Solve hydration and data formatting issues.

4.AI helped improve development speed, reduce debugging time, and provide best practices for SSR + client components.
