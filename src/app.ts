import express from 'express';
import config from 'config';
import db_connect from './utils/db-connect';
import { winston_logger, winston_exceptions } from './utils/logger';
import app_router from './utils/routers';
import { deserializeUser } from './middleware/deserializeUser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);

const port = config.get<number>('port')

app_router(app);
app.listen(port, () => {
    winston_logger.info('app is running again', + port);

})

db_connect(winston_logger);