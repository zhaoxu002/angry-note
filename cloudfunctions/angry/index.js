/* eslint-disable import/no-commonjs */
const {
  createAngry,
  getAngries,
  deleteAngry,

  createReason,
  getReasons,
  deleteReason
} = require('./controller')


exports.main = async (event, context) => {
  switch (event.method) {
    case 'createAngry':
      return await createAngry(event, context);

    case 'getAngries':
      return await getAngries(event, context);

    case 'deleteAngry':
      return await deleteAngry(event, context);

    case 'createReason':
      return await createReason(event, context);

    case 'getReasons':
      return await getReasons(event, context);

    case 'deleteReason':
      return await deleteReason(event, context)
  }
};
