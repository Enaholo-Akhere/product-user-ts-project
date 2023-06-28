import express, { Express } from 'express';
import user_router from '../controller/user-routes'

const app_router = (app: Express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/user', user_router);
}

export default app_router