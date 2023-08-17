import express from 'express';
const router = express.Router();
import validate from '../DTO_validations/user_object_validation';
import requireUser from '../middleware/requireUser';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from '../schema/product.schema';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from '../controller/product-controller';


router.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler);
router.put('/api/products', [requireUser, validate(updateProductSchema)], updateProductHandler);
router.get('/api/products', validate(getProductSchema), getProductHandler);
router.delete('/api/products', [requireUser, validate(deleteProductSchema)], deleteProductHandler);

export default router;