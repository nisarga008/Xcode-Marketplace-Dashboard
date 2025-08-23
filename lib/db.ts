import { faker } from "@faker-js/faker";
import { Product } from "./types";

function seed(n = 60): Product[] {
  faker.seed(42);
  const categories = [
    "Electronics",
    "Clothing",
    "Home",
    "Beauty",
    "Sports",
    "Grocery",
  ];
  const statuses: Array<Product["status"]> = ["active", "out-of-stock"];
  return Array.from({ length: n }).map(() => ({
    id: crypto.randomUUID(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price({ min: 99, max: 99999 })),
    stock: faker.number.int({ min: 0, max: 250 }),
    category: faker.helpers.arrayElement(categories),
    status: faker.helpers.arrayElement(statuses),
    vendor: faker.company.name(),
    description: faker.commerce.productDescription(),
    createdAt: faker.date.recent({ days: 45 }).toISOString(),
  }));
}

class DB {
  items: Product[];
  constructor() {
    this.items = seed();
  }
}

export const db = new DB();
