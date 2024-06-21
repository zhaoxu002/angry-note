import { View } from "@tarojs/components";
import usePagination from "@/hooks/usePagination";
import { getAngries } from "@/services/angry";
import { AtCard, AtList, AtListItem, AtLoadMore } from "taro-ui";
import dayjs from "dayjs";
import { Angry } from "@/types/angry";

export default function Index() {
  const { data: angries, status } = usePagination<Angry>(getAngries);

  return (
    <View>
      {angries.map((item) => (
        <AtCard
          key={item._id}
          className="marginBottom16"
          title={dayjs(item.createAt).format("YYYY-MM-DD HH:mm:ss")}
          extra={item.character}
          note={`等级 ${item.rate}`}
        >
          <View>
            <View className="marginBottom16">
              <AtList>
                {item.reasons.map((reason) => (
                  <AtListItem key={reason._id} title={reason.text} />
                ))}
              </AtList>
            </View>
            {item.comment && (
              <View className="marginBottom16">{item.comment}</View>
            )}
          </View>
        </AtCard>
      ))}

      <AtLoadMore status={status} />
    </View>
  );
}
