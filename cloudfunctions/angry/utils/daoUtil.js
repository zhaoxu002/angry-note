/* eslint-disable import/no-commonjs */
const getOne = async (collection, _id) => {
  const result = await collection.doc(_id).get();
  return result.data;
};

const getOneBySearch = async (collection, query) => {
  let arr = await getList(collection, query);
  return arr ? arr[0] : [];
};

const getList = async (collection, query) => {
  const result = await collection.where(query).orderBy('createTime', 'desc').get();
  return result.data;
};

const getListByPage = async (collection, query, curPage, limit) => {
  const result = await collection
    .where(query)
    .orderBy('createTime', 'desc')
    .skip(curPage * limit)
    .limit(limit)
    .get();
  return result.data;
};

const deleteOne = async (collection, _id) => {
  try {
    await collection.doc(_id).remove();
    return true;
  } catch (error) {
    throw error;
  }
};

const deleteList = async (collection, query) => {
  try {
    await collection.where(query).remove();
    return true;
  } catch (error) {
    throw error;
  }
};

const removeOne = async (collection, _id) => {
  try {
    await collection.doc(_id).update({ data: { isDelete: true } });
    return true;
  } catch (error) {
    throw error;
  }
};

const removeOneBySearch = async (collection, query) => {
  try {
    await collection.where(query).update({ data: { isDelete: true } });
    return true;
  } catch (error) {
    throw error;
  }
};

const removeList = async (collection, query) => {
  try {
    await collection.where(query).update({ data: { isDelete: true } });
    return true;
  } catch (error) {
    throw error;
  }
};

const createOne = async (collection, data) => {
  try {
    const result = await collection.add({ data });
    return result;
  } catch (error) {
    throw error;
  }
};

const updateOne = async (collection, _id, data) => {
  try {
    await collection.doc(_id).update({ data });
    return true;
  } catch (error) {
    throw error;
  }
};

const updateBySearch = async (collection, query, data) => {
  try {
    await collection.where(query).update({ data });
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOne,
  getOneBySearch,
  getList,
  getListByPage,
  deleteOne,
  deleteList,
  removeOne,
  removeOneBySearch,
  removeList,
  createOne,
  updateOne,
  updateBySearch,
};
