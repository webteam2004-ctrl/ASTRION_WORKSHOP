export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || (res.statusCode >= 400 ? res.statusCode : 500);
  const isProduction = process.env.NODE_ENV === 'production';

  console.error('[UNCAUGHT ERROR]', {
    message: err.message,
    method: req.method,
    url: req.originalUrl,
    ...(isProduction ? {} : { stack: err.stack }),
  });

  res.status(statusCode).json({
    success: false,
    error: isProduction && statusCode === 500
      ? 'An unexpected internal server error occurred. Please try again later.'
      : err.message || 'Server error',
    ...(!isProduction && err.stack ? { stack: err.stack } : {}),
  });
}
