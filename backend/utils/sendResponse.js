/**
 * Standard API Response Utility
 * Returns a standardized JSON object for all controller responses.
 */
const sendResponse = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

module.exports = sendResponse;
