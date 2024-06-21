import { useState } from "react";
import { CommonEventFunction, View } from "@tarojs/components";
import {
  AtButton,
  AtFloatLayout,
  AtInput,
  AtCheckbox,
  // AtSlider,
  AtRate,
  AtLoadMore,
} from "taro-ui";
import { showModal, showToast, navigateBack } from "@tarojs/taro";
import { Reason, ReasonType } from "@/types/angry";

import { getReasons, createReason, createAngry } from "@/services/angry";
import useCharacter from "@/hooks/useCharacter";
import usePagination from "@/hooks/usePagination";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [newReason, setNewReason] = useState("");
  const [rate, setRate] = useState(1);
  const [comment, setComment] = useState("");

  const character = useCharacter();

  const {
    data: reasons,
    total,
    refresh,
    status,
  } = usePagination<Reason>(getReasons);

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
        refresh();

        setLoading(false);
        setOpen(false);
      });
  };

  const confirmAngry = () => {
    if (loading) return;
    if (selected.length === 0) {
      showToast({
        title: "生气要有个理由啊",
        icon: 'error'
      });
      return;
    }

    const payload = {
      createAt: Date.now(),
      reasons: reasons.filter((item) => selected.some((id) => id === item._id)),
      character,
      rate,
      type: ReasonType.Angry,
      comment,
    };

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
            placeholder="新理由"
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
        <AtInput
          className="marginBottom16"
          name="comment"
          value={comment}
          placeholder="备注"
          onChange={(val) => setComment(String(val))}
        />
        <View className="flexCenter marginBottom16">
          <AtRate
            value={rate}
            max={10}
            size={30}
            onChange={setRate as unknown as CommonEventFunction}
          ></AtRate>
        </View>

        <AtButton type="primary" disabled={loading} onClick={confirmAngry}>
          生气
        </AtButton>
      </View>

      <AtLoadMore status={status} />
    </View>
  );
}
