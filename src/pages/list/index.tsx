import { View } from "@tarojs/components";
import { useState } from "react";
import { useLoad } from "@tarojs/taro";
import { getAngries } from "@/services/angry";
import { AtCard, AtList, AtListItem } from "taro-ui";
import dayjs from "dayjs";
import { Angry } from "@/types/angry";
import { PageResponse } from "@/types/response";

export default function Index() {
  const [angries, setAngries] = useState<Angry[]>([]);
  const [total, setTotal] = useState(0);

  const fetchAngries = () => {
    getAngries().then((res: PageResponse<Angry[]>) => {
      const { data, total } = res.data;
      setAngries(data);
      setTotal(total);
    });
  };

  useLoad(() => {
    fetchAngries();
  });

  return (
    <View>
      {angries.map((item) => (
        <AtCard
          key={item._id}
          className='marginBottom16'
          title={dayjs(item.createAt).format("YYYY-MM-DD HH:mm:ss")}
          extra={item.character}
          note={`等级 ${item.rate}`}
        >
          <AtList>
            {item.reasons.map((reason) => (
              <AtListItem key={reason._id} title={reason.text} />
            ))}
          </AtList>
        </AtCard>
      ))}
    </View>
  );
}
