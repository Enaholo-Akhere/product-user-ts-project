
import { Request, Response } from "express";
import { CreateProductInput, UpdateProductInput, GetProductInput, DeleteProductInput } from "../schema/product.schema";
import { createProduct, findAndDeleteProduct, findAndUpdateProduct, findProduct } from "../service/product.service";
import { winston_logger } from "../utils/logger";


const createProductHandler = async (req: Request<{}, {}, CreateProductInput['body']>, res: Response) => {
    const userId = res.locals.user._id;
    const body = req.body;
    try {
        const product = await createProduct(({ ...body, user: userId }));
        return res.send(product);
    }
    catch (e: any) {
        winston_logger.error(e.message, e)
    }
};

const updateProductHandler = async (req: Request<UpdateProductInput['params']>, res: Response) => {
    const productId = req.params.productId;
    const userId = res.locals.user._id;
    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) { return res.sendStatus(404) };

    if (String(product.user) !== userId) {
        return res.sendStatus(403);
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, { new: true });
    return res.send(updatedProduct);
};

const getProductHandler = async (req: Request<GetProductInput["params"]>, res: Response) => {
    const productId = req.params.productId;
    const product = await findProduct({ productId })
    if (!product) { return res.sendStatus(404) };

    return res.send(product);
};

const deleteProductHandler = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const userId = res.locals.user._id;

    const product = await findProduct({ productId });

    if (!product) { return res.sendStatus(404) };

    if (String(product.user) !== userId) {
        return res.sendStatus(403);
    }

    await findAndDeleteProduct({ productId });
    return res.sendStatus(200);
};

export { createProductHandler, updateProductHandler, getProductHandler, deleteProductHandler }