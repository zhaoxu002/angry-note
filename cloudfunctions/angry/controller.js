/* eslint-disable no-unused-vars */
/* eslint-disable import/no-commonjs */
const cloud = require("wx-server-sdk");
const daoUtils = require("./utils/daoUtil");
const {
  createSuccessResponse,
  createPageSuccessResponse,
  createErrorResponse,
} = require("./utils/responseUtil");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// 初始化数据库连接
const db = cloud.database();
const reasonCollection = db.collection("reasons");
const angryCollection = db.collection("angries");

const createAngry = async (event, _context) => {
  const { data } = event;

  try {
    daoUtils.createOne(angryCollection, data);

    return createSuccessResponse();
  } catch (error) {
    return createErrorResponse("create error", error);
  }
};
const getAngries = async (event, _context) => {
  const {
    query,
    pageQuery: { curPage, limit },
  } = event;
  try {
    const [list, { total }] = await Promise.all([
      daoUtils.getListByPage(angryCollection, query, curPage - 1, limit),
      angryCollection.where(query).count(),
    ]);
    return createPageSuccessResponse(list, total);
  } catch (error) {
    return createErrorResponse("get list error", error);
  }
};
const deleteAngry = async (event, _context) => {
  const { id } = event;
  try {
    daoUtils.deleteOne(angryCollection, id);
    return createSuccessResponse();
  } catch (error) {
    return createErrorResponse("delete error", error);
  }
};

const createReason = async (event, _context) => {
  const { data } = event;

  try {
    daoUtils.createOne(reasonCollection, data);

    return createSuccessResponse();
  } catch (error) {
    return createErrorResponse("create error", error);
  }
};
const getReasons = async (event, _context) => {
  const {
    query,
    pageQuery: { curPage, limit },
  } = event;
  try {
    const [list, { total }] = await Promise.all([
      daoUtils.getListByPage(reasonCollection, query, curPage - 1, limit),
      reasonCollection.where(query).count(),
    ]);
    return createPageSuccessResponse(list, total);
  } catch (error) {
    return createErrorResponse("get list error", error);
  }
};
const deleteReason = async (event, _context) => {
  const { id } = event;
  try {
    daoUtils.deleteOne(reasonCollection, id);
    return createSuccessResponse();
  } catch (error) {
    return createErrorResponse("delete error", error);
  }
};

module.exports = {
  createAngry,
  getAngries,
  deleteAngry,

  createReason,
  getReasons,
  deleteReason,
};
