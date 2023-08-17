import ProductModel, { ProductDocument } from "../models/product.model";
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { winston_logger } from "../utils/logger";

const createProduct = async (input: FilterQuery<Omit<ProductDocument, 'createdAt' | 'updatedAt'>>) => {
    try {
        return await ProductModel.create(input);
    }
    catch (e: any) {
        winston_logger.error(e.message, e)
        return { status: "failed", error: e.message }
    }
};

const findProduct = async (query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) => {
    return await ProductModel.findOne(query, {}, options);

};

const findAndUpdateProduct = async (query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions) => {
    return await ProductModel.findOneAndUpdate(query, update, options)
};

const findAndDeleteProduct = async (query: FilterQuery<ProductDocument>) => {
    return ProductModel.deleteOne(query);
};

export { createProduct, findProduct, findAndDeleteProduct, findAndUpdateProduct }