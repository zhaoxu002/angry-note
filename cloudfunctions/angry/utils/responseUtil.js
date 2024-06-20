/* eslint-disable import/no-commonjs */
exports.createSuccessResponse = (data) => {
  return {
    success: true,
    data,
  };
};

exports.createPageSuccessResponse = (data, total) => {
  return {
    success: true,
    data: {
      data,
      total,
    },
  };
};

exports.createErrorResponse = (errMsg) => {
  return {
    success: false,
    errMsg,
  };
};
