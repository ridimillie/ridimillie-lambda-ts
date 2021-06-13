import * as express from 'express';
import indexRouter from '../routes';

export default async (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use('/', indexRouter);

    // eslint-disable-next-line no-unused-vars
    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(err.status || 500).json({
            message: err.message || 'Internal Server Error',
        });
    });
};
