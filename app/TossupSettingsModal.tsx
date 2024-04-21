import {Input, Text, Button, Accordion, Paragraph, Square, YStack, Checkbox, XStack, Label} from 'tamagui'
import {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChevronDown, Check as CheckIcon } from '@tamagui/lucide-icons';
import {useTossupSettings} from './stores/TossupSettingsStore'
import type { TossupSettings } from './stores/TossupSettingsStore';

function DifficultyCheckBox( {label,index,difficulties, setDifficulty} : 
  { label: string, index: number, difficulties: boolean[], setDifficulty: (index: number, value: boolean) => void}
) {
  // const onCheckedChangeHelper = (v: boolean) => {
  //   const arrCopy = [...difficulties]
  //   arrCopy[index] = v;
  //   setDifficulties(arrCopy)
  // }
  return (
    <YStack width={300}>
      <XStack width={300} ai='center'>
        <Checkbox id={`cb${index}`} size='$3' mr='$3' checked={difficulties[index]} onCheckedChange={(v) => setDifficulty(index, v as boolean)}>
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox>

        <Label htmlFor={`cb${index}`} size='$3'>
          {label}
        </Label>
      </XStack>
    </YStack>
  )
}

export default function TossupSettingsModal() {
  // const [difficulties, setDifficulties] = useState([false, true, true, true, true, false, false, false, false, false]);

  // useEffect(() => {
  //   const helper = async () => {
  //     await AsyncStorage.setItem('difficulties', JSON.stringify(difficulties))
  //   }
  //   helper()
  // }, [difficulties])

  const tossupSettings = useTossupSettings()
  
  return (
    <>
    <Text>difficulties are {JSON.stringify(tossupSettings.difficulties)}</Text>
    <Accordion overflow="hidden" type="multiple">
      <Accordion.Item value="a1">
        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
          {({ open } : {open: boolean}) => (
            <>
              <Paragraph>Difficulties</Paragraph>
              <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content>
          <DifficultyCheckBox label='Middle School' index={0} setDifficulty={tossupSettings.setDifficulty} difficulties={tossupSettings.difficulties}    />
          <DifficultyCheckBox label='Easy High School' index={1} setDifficulty={tossupSettings.setDifficulty} difficulties={tossupSettings.difficulties}    />
          <DifficultyCheckBox label='Regular High School' index={2} setDifficulty={tossupSettings.setDifficulty} difficulties={tossupSettings.difficulties}    />
          <DifficultyCheckBox label='Hard High School' index={3} setDifficulty={tossupSettings.setDifficulty} difficulties={tossupSettings.difficulties}    />
          <DifficultyCheckBox label='National High School' index={4} setDifficulty={tossupSettings.setDifficulty} difficulties={tossupSettings.difficulties}    />
          <DifficultyCheckBox label='● / Easy College' index={5} setDifficulty={tossupSettings.setDifficulty} difficulties={tossupSettings.difficulties}    />
          <DifficultyCheckBox label='●● / Medium College' index={6} setDifficulty={tossupSettings.setDifficulty} difficulties={tossupSettings.difficulties}    />
          <DifficultyCheckBox label='●●● / Regionals College' index={7} setDifficulty={tossupSettings.setDifficulty} difficulties={tossupSettings.difficulties}    />
          <DifficultyCheckBox label='●●●● / Nationals College' index={8} setDifficulty={tossupSettings.setDifficulty} difficulties={tossupSettings.difficulties}    />
          <DifficultyCheckBox label='Open' index={9} setDifficulty={tossupSettings.setDifficulty} difficulties={tossupSettings.difficulties}    />
         </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="a2">
        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
          {({ open } : { open: boolean }) => (
            <>
              <Paragraph>Categories</Paragraph>
              <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content>
          <Paragraph>
            Eggs have been a dietary staple since time immemorial and there’s good reason
            for their continued presence in our menus and meals.
          </Paragraph>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  
    </>
  )
}
