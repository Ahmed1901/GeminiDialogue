const httpInterceptor = (req, res, next) => {
  const start = Date.now();

  // Intercept request
  console.log(`[${start}] Request: ${req.method} ${req.originalUrl}`);
  console.log(`[${start}] Request Body:, ${req.body}`);
//  console.log(req);

  // Intercept response
  res.on('finish', () => {
    const end = Date.now();
    const duration = end - start;
    console.log(`[${end}] Response (${res.statusCode}) in ${duration}ms`);
    console.log(`[${end}] Response Body:`, res.body);
  });

  next();
};

module.exports = httpInterceptor;
