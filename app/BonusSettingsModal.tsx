import { router } from 'expo-router'
import {Text} from 'tamagui'

export default function BonusSettingsModal() {
    router.setParams({name: 'ok'})
  return (
    <>
      <Text>TossupSettingsModal</Text>
    </>
  )
}
