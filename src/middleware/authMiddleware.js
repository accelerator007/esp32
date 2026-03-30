function authenticateApiKey(req, res, next) {
  const { api_key: apiKey } = req.body;
  const expectedApiKey = process.env.API_KEY;

  if (!expectedApiKey) {
    return res.status(500).json({
      success: false,
      message: "Server configuration error: API key not configured."
    });
  }

  if (!apiKey || apiKey !== expectedApiKey) {
    return res.status(401).json({
      success: false,
      message: "Invalid API key."
    });
  }

  return next();
}

module.exports = authenticateApiKey;
