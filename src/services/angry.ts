import { Reason, Angry } from "@/types/angry";
import { Character } from "@/types/character";
import { cloud } from "@tarojs/taro";

const callAngry = (method: string, params?: any) => {
  return cloud
    .callFunction({
      name: "angry",
      data: {
        method,
        ...params,
      },
    })
    .then((res) => {
      console.log("call angry", res.result);
      return res?.result;
    })
    .catch((err) => {
      throw err;
    });
};

export function createAngry(payload: Omit<Angry, "_id">) {
  return callAngry("createAngry", { data: payload });
}

export function getAngries(page?: number) {
  return callAngry("getAngries", {
    query: {},
    pageQuery: {
      limit: 20,
      curPage: (page = 1),
    },
  });
}

export function createReason(payload: Omit<Reason, "_id">) {
  return callAngry("createReason", { data: payload });
}

export function getReasons(page?: number) {
  return callAngry("getReasons", {
    query: {},
    pageQuery: {
      limit: 20,
      curPage: (page = 1),
    },
  });
}

export function deleteReason(id: string) {
  return callAngry("deleteReason", { id });
}

export function deleteAngry(id: string) {
  return callAngry("deleteAngry", { id });
}
