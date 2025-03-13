import { Cart } from "../models/cart.model.js";

export class CartService {
    async createCart() {
        return await Cart.create({ products: [] });
    }

    async getCartById(cartId) {
        return await Cart.findById(cartId).populate("products.product");
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error("Carrito no encontrado");

        const existingProduct = cart.products.find(p => p.product.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        return await cart.save();
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error("Carrito no encontrado");

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        return await cart.save();
    }

    async clearCart(cartId) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error("Carrito no encontrado");

        cart.products = [];
        return await cart.save();
    }
}
