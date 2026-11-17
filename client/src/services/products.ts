import api from "./api";
import type { Product } from "../types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const { data } = await api.get<unknown>("/produtos", { signal });

  if (!Array.isArray(data)) {
    throw new Error("A resposta da API não contém uma lista de produtos.");
  }

  const products = data.map((item): Product => {
    if (
      !isRecord(item) ||
      typeof item.id !== "number" ||
      typeof item.name !== "string" ||
      ("price" in item &&
        (typeof item.price !== "number" ||
          !Number.isFinite(item.price) ||
          item.price < 0))
    ) {
      throw new Error("A API retornou um produto em formato inválido.");
    }

    return {
      id: item.id,
      name: item.name,
      ...(typeof item.price === "number" ? { price: item.price } : {}),
    };
  });

  return [...new Map(products.map((product) => [product.id, product])).values()];
}
