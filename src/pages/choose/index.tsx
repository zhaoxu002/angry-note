import { useState } from "react";
import { View } from "@tarojs/components";
import {
  AtButton,
  AtFloatLayout,
  AtInput,
  AtCheckbox,
  AtSlider,
} from "taro-ui";
import {
  useLoad,
  usePullDownRefresh,
  showModal,
  showToast,
  navigateBack,
} from "@tarojs/taro";
import { Reason, ReasonType } from "@/types/angry";
import { PageResponse } from "@/types/response";

import { getReasons, createReason, createAngry } from "@/services/angry";
import useCharacter from "@/hooks/useCharacter";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [newReason, setNewReason] = useState("");
  const [rate, setRate] = useState(1);

  const character = useCharacter();

  useLoad(() => {
    fetchReasons();
  });

  usePullDownRefresh(() => {
    fetchReasons();
  });

  const fetchReasons = () => {
    getReasons().then((res: PageResponse<Reason[]>) => {
      const { data, total } = res.data;
      console.log("get reason", res.data);
      setReasons(data);
      setTotal(total);
    });
  };

  const handleNewReason = () => {
    setOpen(true);
  };

  const onSelect = (selectedIds: string[]) => {
    setSelected(selectedIds);
  };

  const submitNewReason = () => {
    if (!newReason || loading) return;
    setLoading(true);

    createReason({
      text: newReason,
      type: ReasonType.Angry,
    })
      .then((res) => {
        console.log(res);
        showToast({
          title: "新增成功",
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
        fetchReasons();
        setOpen(false);
      });
  };

  const confirmAngry = () => {
    if (loading) return;

    const payload = {
      createAt: Date.now(),
      reasons: reasons.filter((item) => selected.some((id) => id === item._id)),
      character,
      rate,
      type: ReasonType.Angry,
    };

    console.log("pya", payload);

    showModal({
      title: "慎重",
      content: "确定要生气吗？",
      success: (res) => {
        if (res.confirm) {
          // post

          console.log("用户点击确定", payload);

          createAngry(payload)
            .then((res) => {
              console.log("post angry", res);
              showModal({
                title: "你生气了",
              });
              navigateBack();
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      },
    });
  };

  return (
    <View className="page">
      <View className="marginBottom16">
        <AtButton type="secondary" onClick={handleNewReason}>
          新理由
        </AtButton>
      </View>
      <View>
        <AtCheckbox
          options={reasons.map((reason) => ({
            value: reason._id,
            label: reason.text,
          }))}
          selectedList={selected}
          onChange={onSelect}
        ></AtCheckbox>
      </View>

      <AtFloatLayout isOpened={open} onClose={() => setOpen(false)}>
        <View>
          <AtInput
            name=""
            type="text"
            title="理由"
            value={newReason}
            onChange={(val) => setNewReason(String(val))}
          ></AtInput>
          <View>理由总数 {total}</View>
          <AtButton
            disabled={loading}
            type="secondary"
            onClick={submitNewReason}
          >
            新增理由
          </AtButton>
        </View>
      </AtFloatLayout>

      <View className="fixedBottom">
        <AtSlider value={rate} onChange={(val) => setRate(val)}></AtSlider>

        <AtButton type="primary" disabled={loading} onClick={confirmAngry}>
          生气
        </AtButton>
      </View>
    </View>
  );
}
