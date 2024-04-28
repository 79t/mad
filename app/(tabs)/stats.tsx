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
} from "../stores/StatsStores";
import { ChevronDown } from "@tamagui/lucide-icons";

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

function IndividualCategoryStat({
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
  return (
    <ScrollView ai="center" f={1}>
      <YStack gap="$2">
        <H2 mt="$3">Tossups</H2>
        <Text>Questions correct: {tuStats.correct}</Text>
        <Text>Questions incorrect: {tuStats.incorrect}</Text>
        <H3>Tossups by Category</H3>
        {/* <Text>{JSON.stringify(tuStats.catStats)}</Text> */}
        <Accordion overflow="hidden" width="$20" type="multiple">
          {Object.keys(category_translations).map((category) => 
            <IndividualCategoryStat key={category} cat={category as ValidCategory} tuStats={tuStats} />
          )}
        </Accordion>

        <Button bg='$red10' onPress={() => tuStats.sCS({
        literature: {
          correct: 0,
          incorrect: 0,
        },
        history: {
          correct: 0,
          incorrect: 0,
        },
        science: {
          correct: 0,
          incorrect: 0,
        },
        finearts: {
          correct: 0,
          incorrect: 0,
        },
        religion: {
          correct: 0,
          incorrect: 0,
        },
        mythology: {
          correct: 0,
          incorrect: 0,
        },
        philosophy: {
          correct: 0,
          incorrect: 0,
        },
        socialscience: {
          correct: 0,
          incorrect: 0,
        },
        currentevents: {
          correct: 0,
          incorrect: 0,
        },
        otheracademic: {
          correct: 0,
          incorrect: 0,
        },
        trash: {
          correct: 0,
          incorrect: 0,
        },
        geography: {
          correct: 0,
          incorrect: 0
        }
      })}>
          !! RESET ALL TOSSUP CAT STATS !!
        </Button>
      </YStack>
    </ScrollView>
  );
}
