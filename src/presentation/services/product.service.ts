import { bcrypAdapter, Code } from "../../config";
import { PrismaProductRepository } from "../../domain";

export class ProductService {
  constructor(private readonly productRepository: PrismaProductRepository) {
    // this.generateDeviceCodes()
  }
  public async existProductById(product_id:string) {
    return await this.productRepository.getProductById(product_id);
  }

  private async generateDeviceCodes() {
    for(let i = 0; i < 2; i++) {
      const deviceCode = Code.generateProductCode().replace(/-/g, '');
      console.log('Código generado:', deviceCode);
      const hashDeviceCode = bcrypAdapter.hash(deviceCode);

      const product = await this.productRepository.createProduct(hashDeviceCode);
      console.log(product)
    }
  }
}