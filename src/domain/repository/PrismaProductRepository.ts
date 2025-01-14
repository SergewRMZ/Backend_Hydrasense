import { PrismaClient, Product } from "@prisma/client";
import { ProductRepository } from "./interfaces/ProductRepository";

export class PrismaProductRepository implements ProductRepository {
  private prisma = new PrismaClient();
  async getProductById(product_id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { product_id }
    });

    return product;
  }

  async createProduct(device_code: string): Promise<Product | null> {
    const product = await this.prisma.product.create({
      data: {
        device_code
      }
    })

    return product;
  }
}