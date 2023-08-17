import express, { Express } from 'express';
import user_routes from '../router/router.session';
import product_routes from '../router/router.product';

const app_router = (app: Express) => {
    app.use('/', user_routes);
    app.use('/', product_routes);
}

export default app_router