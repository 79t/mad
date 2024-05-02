import {Input, Text, Button, Accordion, Paragraph, Square, YStack, Checkbox, XStack, Label, ScrollView} from 'tamagui'
import { ChevronDown, Check as CheckIcon } from '@tamagui/lucide-icons';
// import {useTossupSettings} from './stores/TossupSettingsStore'
import { useBonusSettings } from './stores/BonusSettingsStore';

function CategoryCheckBox({category, categories, addCategory, removeCategory} : {category:string, categories: string[], addCategory: (category: string) => void, removeCategory: (category: string) => void}) {
  return (
    <YStack width={300}>
    <XStack width={300} ai='center'>
      <Checkbox id={`cb${category.replace(' ', '_').toLowerCase()}`} size='$3' mr='$3' checked={categories.includes(category)} onCheckedChange={(v) => {v as boolean ? addCategory(category) : removeCategory(category)}}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>

      <Label htmlFor={`cb${category.replace(' ', '_').toLowerCase()}`} size='$3'>
        {category}
      </Label>
    </XStack>
  </YStack>
  )
} 

function DifficultyCheckBox( {label,index,difficulties, setDifficulty} : 
  { label: string, index: number, difficulties: boolean[], setDifficulty: (index: number, value: boolean) => void}
) {
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

  const bonusSettings = useBonusSettings()
  
  return (
    <>
    <ScrollView>
      <Accordion overflow="scroll" type="multiple">
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
            <DifficultyCheckBox label='Middle School' index={0} setDifficulty={bonusSettings.setDifficulty} difficulties={bonusSettings.difficulties}    />
            <DifficultyCheckBox label='Easy High School' index={1} setDifficulty={bonusSettings.setDifficulty} difficulties={bonusSettings.difficulties}    />
            <DifficultyCheckBox label='Regular High School' index={2} setDifficulty={bonusSettings.setDifficulty} difficulties={bonusSettings.difficulties}    />
            <DifficultyCheckBox label='Hard High School' index={3} setDifficulty={bonusSettings.setDifficulty} difficulties={bonusSettings.difficulties}    />
            <DifficultyCheckBox label='National High School' index={4} setDifficulty={bonusSettings.setDifficulty} difficulties={bonusSettings.difficulties}    />
            <DifficultyCheckBox label='● / Easy College' index={5} setDifficulty={bonusSettings.setDifficulty} difficulties={bonusSettings.difficulties}    />
            <DifficultyCheckBox label='●● / Medium College' index={6} setDifficulty={bonusSettings.setDifficulty} difficulties={bonusSettings.difficulties}    />
            <DifficultyCheckBox label='●●● / Regionals College' index={7} setDifficulty={bonusSettings.setDifficulty} difficulties={bonusSettings.difficulties}    />
            <DifficultyCheckBox label='●●●● / Nationals College' index={8} setDifficulty={bonusSettings.setDifficulty} difficulties={bonusSettings.difficulties}    />
            <DifficultyCheckBox label='Open' index={9} setDifficulty={bonusSettings.setDifficulty} difficulties={bonusSettings.difficulties}    />
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
            <CategoryCheckBox category='Literature' categories={bonusSettings.cat} addCategory={bonusSettings.addCat} removeCategory={bonusSettings.rmCat}   />
            <CategoryCheckBox category='History' categories={bonusSettings.cat} addCategory={bonusSettings.addCat} removeCategory={bonusSettings.rmCat}   />
            <CategoryCheckBox category='Science' categories={bonusSettings.cat} addCategory={bonusSettings.addCat} removeCategory={bonusSettings.rmCat}   />
            <CategoryCheckBox category='Fine Arts' categories={bonusSettings.cat} addCategory={bonusSettings.addCat} removeCategory={bonusSettings.rmCat}   />
            <CategoryCheckBox category='Religion' categories={bonusSettings.cat} addCategory={bonusSettings.addCat} removeCategory={bonusSettings.rmCat}   />
            <CategoryCheckBox category='Mythology' categories={bonusSettings.cat} addCategory={bonusSettings.addCat} removeCategory={bonusSettings.rmCat}   />
            <CategoryCheckBox category='Philosophy' categories={bonusSettings.cat} addCategory={bonusSettings.addCat} removeCategory={bonusSettings.rmCat}   />
            <CategoryCheckBox category='Social Science' categories={bonusSettings.cat} addCategory={bonusSettings.addCat} removeCategory={bonusSettings.rmCat}   />
            <CategoryCheckBox category='Current Events' categories={bonusSettings.cat} addCategory={bonusSettings.addCat} removeCategory={bonusSettings.rmCat}   />
            <CategoryCheckBox category='Geography' categories={bonusSettings.cat} addCategory={bonusSettings.addCat} removeCategory={bonusSettings.rmCat}   />
            <CategoryCheckBox category='Other Academic' categories={bonusSettings.cat} addCategory={bonusSettings.addCat} removeCategory={bonusSettings.rmCat}   />
            <CategoryCheckBox category='Trash' categories={bonusSettings.cat} addCategory={bonusSettings.addCat} removeCategory={bonusSettings.rmCat}   />
            <Button onPress={() => bonusSettings.sCat(['Literature', 'History', 'Science', 'Fine Arts', 'Religion', 'Mythology', 'Philosophy', 'Social Science', 'Current Events', 'Geography', 'Other Academic', 'Trash'])}>Add all categories</Button>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </ScrollView>
  
    </>
  )
}
