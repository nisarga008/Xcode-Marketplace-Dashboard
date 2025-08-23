import ProductsClient from "./components/ProductsClient";
import { getBaseUrl } from "@/lib/utils";
import { PaginatedProducts } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  try {
    const url = new URL(`${getBaseUrl()}/api/products`);
    const params = new URLSearchParams(searchParams as Record<string, string>);
    if (!params.has("page")) params.set("page", "1");
    if (!params.has("limit")) params.set("limit", "10");
    url.search = params.toString();

    const res = await fetch(url.toString(), { next: { revalidate: 0 } });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(`Failed to load products: ${res.status} ${text}`);
    }

    const data: PaginatedProducts = JSON.parse(text);

    return <ProductsClient initialData={data} />;
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div className="text-red-500">Failed to load products.</div>;
  }
}
