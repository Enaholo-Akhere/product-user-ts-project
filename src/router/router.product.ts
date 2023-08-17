import express from 'express';
const router = express.Router();
import validate from '../DTO_validations/user_object_validation';
import requireUser from '../middleware/requireUser';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from '../schema/product.schema';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from '../controller/product-controller';


router.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler);
router.patch('/api/products/:productId', [requireUser, validate(updateProductSchema)], updateProductHandler);
router.get('/api/products/:productId', validate(getProductSchema), getProductHandler);
router.delete('/api/products/:productId', [requireUser, validate(deleteProductSchema)], deleteProductHandler);

export default router;