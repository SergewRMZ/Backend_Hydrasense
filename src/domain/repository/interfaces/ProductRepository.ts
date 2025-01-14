import { Product } from "@prisma/client";

export abstract class ProductRepository {
  abstract getProductById(product_id: string): Promise<Product | null>;
}