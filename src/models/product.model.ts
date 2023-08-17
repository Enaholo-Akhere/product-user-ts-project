import mongoose from "mongoose";
import { randomUUID } from 'crypto';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
const crypto_id = randomUUID().slice(0, 10)
export interface ProductDocument {
    user: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    title?: string,
    description?: string,
    price?: number,
    image?: string,
    createdAt: Date,
    updatedAt: Date,
}

const ProductSchema = new mongoose.Schema<ProductDocument>({
    productId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema)

export default ProductModel; 