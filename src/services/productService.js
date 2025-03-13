import { Product } from "../models/product.model.js";

export class ProductService {
    async getAllProducts() {
        return await Product.find();
    }

    async getProductById(id) {
        return await Product.findById(id);
    }

    async addProduct(productData) {
        return await Product.create(productData);
    }

    async updateProduct(id, updatedData) {
        return await Product.findByIdAndUpdate(id, updatedData, { new: true });
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }
}
