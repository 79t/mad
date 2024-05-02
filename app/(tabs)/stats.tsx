import {
  Text,
  YStack,
  View,
  H2,
  H3,
  ScrollView,
  Button,
  Accordion,
  Paragraph,
  Square,
} from "tamagui";
import {
  TossupStats,
  ValidCategory,
  useTossupStats,
} from "../stores/TossupStatsStore";
import { ChevronDown } from "@tamagui/lucide-icons";
import { BonusStats, useBonusStats } from "../stores/BonusStatsStore";

const category_translations: Record<ValidCategory, string> = {
  'literature': 'Literature',
  'history': 'History',
  'science': 'Science',
  'finearts': 'Fine Arts',
  'religion': 'Religion',
  'mythology': 'Mythology',
  'philosophy': 'Philosophy',
  'socialscience': 'Social Science',
  'geography': 'Geography',
  'otheracademic': 'Other Academic',
  'trash': "Trash",
  'currentevents': 'Current Events'
}

function BonusIndividualCategoryStat({
  cat,
  bStats
}: { cat: ValidCategory, bStats: BonusStats }) {
  return (
    <Accordion.Item value={`a${Math.floor(Math.random() * 100)}`}>
    <Accordion.Trigger flexDirection="row" justifyContent="space-between">
      {({ open }: { open: boolean }) => (
        <>
          <Paragraph>{category_translations[cat]}</Paragraph>
          <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
            <ChevronDown size="$1" />
          </Square>
        </>
      )}
    </Accordion.Trigger>
    <Accordion.Content>
        <Paragraph>0: {bStats.catStats[cat][0]} </Paragraph>
        <Paragraph>10: {bStats.catStats[cat][10]}</Paragraph> 
        <Paragraph>20: {bStats.catStats[cat][20]}</Paragraph> 
        <Paragraph>30: {bStats.catStats[cat][30]}</Paragraph> 
        <Paragraph>Total: {bStats.catStats[cat][0] + bStats.catStats[cat][10] + bStats.catStats[cat][20] + bStats.catStats[cat][30]}</Paragraph>
    </Accordion.Content>
  </Accordion.Item>

  )
}

function TossupIndividualCategoryStat({
  cat,
  tuStats,
}: {
  cat: ValidCategory;
  tuStats: TossupStats;
}) {
  return (
    <Accordion.Item value={`a${Math.floor(Math.random() * 100)}`}>
      <Accordion.Trigger flexDirection="row" justifyContent="space-between">
        {({ open }: { open: boolean }) => (
          <>
            <Paragraph>{category_translations[cat]}</Paragraph>
            <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
              <ChevronDown size="$1" />
            </Square>
          </>
        )}
      </Accordion.Trigger>
      <Accordion.Content>
       <Paragraph>
          Correct: {tuStats.catStats[cat].correct} </Paragraph>
          <Paragraph>Incorrect: {tuStats.catStats[cat].incorrect}</Paragraph> 
          <Paragraph>Total played: {tuStats.catStats[cat].correct + tuStats.catStats[cat].incorrect}</Paragraph>
      </Accordion.Content>
    </Accordion.Item>
  );
}

export default function StatsScreen() {
  const tuStats = useTossupStats();
  const bStats = useBonusStats();
  return (
    <ScrollView ai="center" f={1}>
      <YStack gap="$2">
         <H2 mt="$3">Tossups</H2>
        <Text>Questions correct: {tuStats.correct}</Text>
        <Text>Questions incorrect: {tuStats.incorrect}</Text>
        <H3>Tossups by Category</H3>
        <Accordion overflow="hidden" width="$20" type="multiple">
          {Object.keys(category_translations).map((category) => 
            <TossupIndividualCategoryStat key={category} cat={category as ValidCategory} tuStats={tuStats} />
          )}
        </Accordion>
        <H2>Bonuses</H2>
        <Text>0: {bStats[0]}</Text>      
        <Text>10: {bStats[10]}</Text>      
        <Text>20: {bStats[20]}</Text>     
        <Text>30: {bStats[30]}</Text>      
        <H3>Bonuses by Category</H3>
        <Accordion overflow="hidden" width="$20" type="multiple">
          {Object.keys(category_translations).map((category) => 
            <BonusIndividualCategoryStat key={category} cat={category as ValidCategory} bStats={bStats} />
          )}
        </Accordion>

      </YStack>
    </ScrollView>
    
    /* <ScrollView ai="center" f={1}>
      <YStack gap="$2">
      <H2>Bonuses</H2>
        <Text>0: {bStats[0]}</Text>      
        <Text>10: {bStats[10]}</Text>      
        <Text>20: {bStats[20]}</Text>     
        <Text>30: {bStats[30]}</Text>      
        <H3>Bonuses by Category</H3>
        <Accordion overflow="hidden" width="$20" type="multiple">
          {Object.keys(category_translations).map((category) => 
            <BonusIndividualCategoryStat key={category} cat={category as ValidCategory} bStats={bStats} />
          )}
        </Accordion>
        </YStack>
    </ScrollView>*/

  );
}
