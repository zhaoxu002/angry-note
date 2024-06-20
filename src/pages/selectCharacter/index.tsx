import { useLoad, setStorage, reLaunch } from "@tarojs/taro"
import { Button, View } from "@tarojs/components"

import {KEY, Character} from '@/types/character'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  const onSelect = (character: Character) => {
    setStorage({
      key: KEY,
      data: character
    }).then(() => {
      reLaunch({
        url: '/pages/index/index'
      })
    })
  }

  return (
    <View>
      <Button onClick={() => onSelect(Character.ZX)}>zx</Button>
      <Button onClick={() => onSelect(Character.WYB)}>wyb</Button>
    </View>
  )
}
