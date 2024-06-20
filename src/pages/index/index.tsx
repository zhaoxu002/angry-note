import { useState } from "react";
import { AtButton } from "taro-ui";
import { View, Text } from "@tarojs/components";
import { useLoad, redirectTo, navigateTo, getStorage } from "@tarojs/taro";

import useCharacter from "@/hooks/useCharacter";
import "./index.scss";

export default function Index() {
  const character = useCharacter();

  const gotoSelect = () => {
    redirectTo({
      url: "/pages/selectCharacter/index",
    });
  };

  const handleAngry = () => {
    navigateTo({
      url: "/pages/choose/index",
    });
  };

  const handleCheck = () => {
    navigateTo({
      url: "/pages/list/index",
    });
  };

  return (
    <View className="page">
      <Text className="marginBottom16">我是: {character}</Text>
      {character === undefined && (
        <AtButton className="marginBottom16" onClick={gotoSelect}>
          我是谁？
        </AtButton>
      )}
      <View>
        <AtButton className="marginBottom16" onClick={handleAngry}>
          我生气
        </AtButton>

        <AtButton onClick={handleCheck}>我们生了多少气？</AtButton>
      </View>
    </View>
  );
}
