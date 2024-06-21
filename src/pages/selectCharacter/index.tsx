import { useLoad, setStorage, reLaunch } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";

import { KEY, Character } from "@/types/character";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const onSelect = (character: Character) => {
    setStorage({
      key: KEY,
      data: character,
    }).then(() => {
      reLaunch({
        url: "/pages/index/index",
      });
    });
  };

  return (
    <View className="page">
      <AtButton
        className="marginBottom16"
        onClick={() => onSelect(Character.ZX)}
      >
        zx
      </AtButton>
      <AtButton onClick={() => onSelect(Character.WYB)}>wyb</AtButton>
    </View>
  );
}
