import { Reason, Angry } from "@/types/angry";
import { PageResponse } from "@/types/response";
import { cloud } from "@tarojs/taro";

const callAngry = <T>(method: string, params?: any): Promise<T> => {
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
      return res?.result as T;
    })
    .catch((err) => {
      throw err;
    });
};

export function createAngry(payload: Omit<Angry, "_id">) {
  return callAngry("createAngry", { data: payload });
}

export function getAngries(page: number) {
  return callAngry<PageResponse<Angry[]>>("getAngries", {
    query: {},
    pageQuery: {
      limit: 20,
      curPage: page,
    },
  });
}

export function createReason(payload: Omit<Reason, "_id">) {
  return callAngry("createReason", { data: payload });
}

export function getReasons(page: number) {
  return callAngry<PageResponse<Reason[]>>("getReasons", {
    query: {},
    pageQuery: {
      limit: 20,
      curPage: page,
    },
  });
}

export function deleteReason(id: string) {
  return callAngry("deleteReason", { id });
}

export function deleteAngry(id: string) {
  return callAngry("deleteAngry", { id });
}
