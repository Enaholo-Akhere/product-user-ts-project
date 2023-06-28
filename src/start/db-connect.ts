import mongoose from 'mongoose';
import config from 'config';

const dbUri = config.get<string>('dbUri')
const db_connect = async (winston_logger: any) => {
    try {
        const connectDB = await mongoose.connect(dbUri)
        winston_logger.info('connected to BD');

        return connectDB
    }
    catch (err) {
        winston_logger.error('failed to Connect', err);

    };
}

export default db_connect; 