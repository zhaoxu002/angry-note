import { getStorage, useLoad, redirectTo } from "@tarojs/taro";
import { useState } from "react";
import { KEY, Character } from "@/types/character";

export default function useCharacter(): string {
  const [character, setCharacter] = useState<string>("");

  const gotoSelect = () => {
    redirectTo({
      url: "/pages/selectCharacter/index",
    });
  };

  useLoad(async () => {
    console.log("Page loaded.");

    try {
      const storageCharacter = await getStorage({
        key: KEY,
      });
      setCharacter(storageCharacter.data);
    } catch (error) {
      console.error("sb", error);
      gotoSelect();
    }
  });

  return Character[character];
}
