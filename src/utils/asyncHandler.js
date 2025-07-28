// const asyncHandler = (func) => async (error, res, req, next) => {
//   try {
//     const option = await func(error, res, req, next);
//     return option;
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const asyncHandler = (responseHandler) => (req, res, next) =>
  Promise.resolve(responseHandler(req, res, next)).catch((error) =>
    next(error)
  );

export { asyncHandler }
