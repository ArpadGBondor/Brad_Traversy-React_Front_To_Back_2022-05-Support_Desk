const errorHandler = (error, _, res, next) => {
    // FIX: check for bad status codes, if it's a good status code then we want to send
    // a bad status code i.e. 2xx should not be sent as error response
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode;

    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
};

// Fallback Middleware function for returning
// 404 error for undefined paths
const invalidPathHandler = (request, response, next) => {
    response.status(404);
    response.send('invalid path');
};

module.exports = { errorHandler, invalidPathHandler };
