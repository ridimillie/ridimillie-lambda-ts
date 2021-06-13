import * as express from 'express';
import * as serverless from 'serverless-http';
import * as dotenv from 'dotenv';

import loaders from './loaders';

dotenv.config();

let app;

const startServer = async function () {
    app = express();
    await loaders(app);
    app.listen(process.env.port || 3000, () => {
        console.log(`listening on port ${process.env.port || 3000}`);
    }).on('error', (err) => {
        console.error(err);
        process.exit(1);
    });
};

startServer();

const handler = serverless(app);

export { handler };
