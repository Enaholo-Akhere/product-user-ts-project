import express from 'express';
import config from 'config';
import db_connect from './start/db-connect';
import { winston_logger, winston_exceptions } from './start/logger';
import app_router from './start/routers';

const app = express();
const port = config.get<number>('port')


app_router(app);

app.listen(port, () => {
    winston_logger.info('app is running again', + port);

})

db_connect(winston_logger);