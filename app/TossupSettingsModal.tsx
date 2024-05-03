import {
  Button,
  Accordion,
  Paragraph,
  Square,
  YStack,
  Checkbox,
  XStack,
  Label,
  ScrollView,
} from "tamagui";
import { ChevronDown, Check as CheckIcon } from "@tamagui/lucide-icons";
import { useTossupSettings } from "./stores/TossupSettingsStore";

function CategoryCheckBox({
  category,
  categories,
  addCategory,
  removeCategory,
}: {
  category: string;
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}) {
  return (
    <YStack width={300}>
      <XStack width={300} ai="center">
        <Checkbox
          id={`cb${category.replace(" ", "_").toLowerCase()}`}
          size="$3"
          mr="$3"
          checked={categories.includes(category)}
          onCheckedChange={(v) => {
            (v as boolean) ? addCategory(category) : removeCategory(category);
          }}
        >
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox>

        <Label
          htmlFor={`cb${category.replace(" ", "_").toLowerCase()}`}
          size="$3"
        >
          {category}
        </Label>
      </XStack>
    </YStack>
  );
}

function DifficultyCheckBox({
  label,
  index,
  difficulties,
  setDifficulty,
}: {
  label: string;
  index: number;
  difficulties: boolean[];
  setDifficulty: (index: number, value: boolean) => void;
}) {
  return (
    <YStack width={300}>
      <XStack width={300} ai="center">
        <Checkbox
          id={`cb${index}`}
          size="$3"
          mr="$3"
          checked={difficulties[index]}
          onCheckedChange={(v) => setDifficulty(index, v as boolean)}
        >
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox>

        <Label htmlFor={`cb${index}`} size="$3">
          {label}
        </Label>
      </XStack>
    </YStack>
  );
}

export default function TossupSettingsModal() {
  const tossupSettings = useTossupSettings();

  return (
    <>
      <ScrollView>
        <Accordion overflow="scroll" type="multiple">
          <Accordion.Item value="a1">
            <Accordion.Trigger
              flexDirection="row"
              justifyContent="space-between"
            >
              {({ open }: { open: boolean }) => (
                <>
                  <Paragraph>Difficulties</Paragraph>
                  <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                    <ChevronDown size="$1" />
                  </Square>
                </>
              )}
            </Accordion.Trigger>
            <Accordion.Content>
              <DifficultyCheckBox
                label="Middle School"
                index={0}
                setDifficulty={tossupSettings.setDifficulty}
                difficulties={tossupSettings.difficulties}
              />
              <DifficultyCheckBox
                label="Easy High School"
                index={1}
                setDifficulty={tossupSettings.setDifficulty}
                difficulties={tossupSettings.difficulties}
              />
              <DifficultyCheckBox
                label="Regular High School"
                index={2}
                setDifficulty={tossupSettings.setDifficulty}
                difficulties={tossupSettings.difficulties}
              />
              <DifficultyCheckBox
                label="Hard High School"
                index={3}
                setDifficulty={tossupSettings.setDifficulty}
                difficulties={tossupSettings.difficulties}
              />
              <DifficultyCheckBox
                label="National High School"
                index={4}
                setDifficulty={tossupSettings.setDifficulty}
                difficulties={tossupSettings.difficulties}
              />
              <DifficultyCheckBox
                label="● / Easy College"
                index={5}
                setDifficulty={tossupSettings.setDifficulty}
                difficulties={tossupSettings.difficulties}
              />
              <DifficultyCheckBox
                label="●● / Medium College"
                index={6}
                setDifficulty={tossupSettings.setDifficulty}
                difficulties={tossupSettings.difficulties}
              />
              <DifficultyCheckBox
                label="●●● / Regionals College"
                index={7}
                setDifficulty={tossupSettings.setDifficulty}
                difficulties={tossupSettings.difficulties}
              />
              <DifficultyCheckBox
                label="●●●● / Nationals College"
                index={8}
                setDifficulty={tossupSettings.setDifficulty}
                difficulties={tossupSettings.difficulties}
              />
              <DifficultyCheckBox
                label="Open"
                index={9}
                setDifficulty={tossupSettings.setDifficulty}
                difficulties={tossupSettings.difficulties}
              />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="a2">
            <Accordion.Trigger
              flexDirection="row"
              justifyContent="space-between"
            >
              {({ open }: { open: boolean }) => (
                <>
                  <Paragraph>Categories</Paragraph>
                  <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                    <ChevronDown size="$1" />
                  </Square>
                </>
              )}
            </Accordion.Trigger>
            <Accordion.Content>
              <CategoryCheckBox
                category="Literature"
                categories={tossupSettings.cat}
                addCategory={tossupSettings.addCat}
                removeCategory={tossupSettings.rmCat}
              />
              <CategoryCheckBox
                category="History"
                categories={tossupSettings.cat}
                addCategory={tossupSettings.addCat}
                removeCategory={tossupSettings.rmCat}
              />
              <CategoryCheckBox
                category="Science"
                categories={tossupSettings.cat}
                addCategory={tossupSettings.addCat}
                removeCategory={tossupSettings.rmCat}
              />
              <CategoryCheckBox
                category="Fine Arts"
                categories={tossupSettings.cat}
                addCategory={tossupSettings.addCat}
                removeCategory={tossupSettings.rmCat}
              />
              <CategoryCheckBox
                category="Religion"
                categories={tossupSettings.cat}
                addCategory={tossupSettings.addCat}
                removeCategory={tossupSettings.rmCat}
              />
              <CategoryCheckBox
                category="Mythology"
                categories={tossupSettings.cat}
                addCategory={tossupSettings.addCat}
                removeCategory={tossupSettings.rmCat}
              />
              <CategoryCheckBox
                category="Philosophy"
                categories={tossupSettings.cat}
                addCategory={tossupSettings.addCat}
                removeCategory={tossupSettings.rmCat}
              />
              <CategoryCheckBox
                category="Social Science"
                categories={tossupSettings.cat}
                addCategory={tossupSettings.addCat}
                removeCategory={tossupSettings.rmCat}
              />
              <CategoryCheckBox
                category="Current Events"
                categories={tossupSettings.cat}
                addCategory={tossupSettings.addCat}
                removeCategory={tossupSettings.rmCat}
              />
              <CategoryCheckBox
                category="Geography"
                categories={tossupSettings.cat}
                addCategory={tossupSettings.addCat}
                removeCategory={tossupSettings.rmCat}
              />
              <CategoryCheckBox
                category="Other Academic"
                categories={tossupSettings.cat}
                addCategory={tossupSettings.addCat}
                removeCategory={tossupSettings.rmCat}
              />
              <CategoryCheckBox
                category="Trash"
                categories={tossupSettings.cat}
                addCategory={tossupSettings.addCat}
                removeCategory={tossupSettings.rmCat}
              />
              <Button
                onPress={() =>
                  tossupSettings.sCat([
                    "Literature",
                    "History",
                    "Science",
                    "Fine Arts",
                    "Religion",
                    "Mythology",
                    "Philosophy",
                    "Social Science",
                    "Current Events",
                    "Geography",
                    "Other Academic",
                    "Trash",
                  ])
                }
              >
                Add all categories
              </Button>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </ScrollView>
    </>
  );
}
