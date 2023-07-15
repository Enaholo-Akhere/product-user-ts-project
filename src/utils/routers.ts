import express, { Express } from 'express';
import user_router from '../controller/user-test-route'
import user_routes from '../router/router'

const app_router = (app: Express) => {

    app.use('/', user_routes);
}

export default app_router