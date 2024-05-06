import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Button, Text, View, ScrollView, Sheet, Input } from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";
import { useBonusSettings } from "../stores/BonusSettingsStore";
import { useBonusStats } from "../stores/BonusStatsStore";
import type { ValidCategory } from "../stores/TossupStatsStore";

type Bonus = {
  leadin: string;
  parts: string[];
  answers: string[];
  category: string;
};

function getCorrectCheckbox(state: boolean | undefined) {
  switch (state) {
    case undefined:
      return "🕐";
    case true:
      return "✅";
    case false:
      return "❌";
    default:
      return "ummmm";
  }
}

function cleanAnswer(answer: string) {
  return answer.replaceAll(/<\/?(b|i|u)>/g, "");
}

export default function TabOneScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Bonus[]>([]);
  const [position, setPosition] = useState(0);
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [result, setResults] = useState<(boolean | undefined)[]>([
    undefined,
    undefined,
    undefined,
  ]);
  const [i, setI] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionIncorrect, setSessionIncorrect] = useState(0);
  const sessionScore = sessionCorrect * 10 + sessionIncorrect * -5;
  const bonusSettings = useBonusSettings();
  const bonusStats = useBonusStats();

  const getBonus = async () => {
    // if (!initBonus) bonusStats.addCorrect(result.filter((x) => x).length * 10 as 0|10|20|30, data[0]?.category.toLowerCase().split(" ").join(" ") as ValidCategory)
    setLoading(true);
    try {
      const diffsToUse = [...bonusSettings.difficulties.keys()]
        .filter((x) => bonusSettings.difficulties[x])
        .map((z) => z + 1)
        .map((zz) => `&difficulties=${zz}`)
        .join("");
      const catsToUse = bonusSettings.cat.map((c) => `&categories=${c}`);
      const req = await fetch(
        `https://qbreader.org/api/random-bonus?number=1${diffsToUse}${catsToUse}`
      );
      const res = await req.json()
      setData(res.bonuses);
    } catch (e) {
      console.error(e);
    } finally {
      // if (data.length > 0) {
      //   console.log(data[0].category);
      //   console.log(data[0].answers)
      //   console.log(data[0].leadin)
      //   console.log(data[0].parts)
      // }

      // bonusStats.addCorrect(
      //   (result.filter((x) => x).length * 10) as 0 | 10 | 20 | 30,
      //   data[0].category.toLowerCase().split(" ").join("") as ValidCategory
      // );
      setI(0);
      setAnswer("");
      setResults([undefined, undefined, undefined]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (i >= 3) {
      bonusStats.addCorrect(
        result.filter((x) => x).length * 10 as 0|10|20|30,
        data[0].category.toLowerCase().split(" ").join("") as ValidCategory
      )
    }
  }, [i])


  const checkAnswer = async () => {
    try {
      const req = await fetch(`
      https://qbreader.org/api/check-answer?answerline=${encodeURIComponent(
        data[0].answers[i]
      )}&givenAnswer=${answer}
      `);
      const res = await req.json();

      if (res["directive"] == "accept") {
        alert("Correct!");
        setI((i) => i + 1);
        setSessionCorrect((sessionCorrect) => sessionCorrect + 1);
        const tmpArr = [...result];
        tmpArr[i] = true;
        setResults(tmpArr);
      } else if (res["directive"] == "prompt") {
        alert("Prompt! Try again");
      } else {
        alert(
          `Incorrect - the correct answer was ${cleanAnswer(
            data[0].answers[i]
          )}`
        );
        setI((i) => i + 1);
        const tmpArr = [...result];
        tmpArr[i] = false;
        setResults(tmpArr);
      }
      setAnswer("");
      setOpen(false);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    getBonus();
  }, []);

  return (
    <View f={1}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View f={1}>
          <ScrollView f={1}>
            <Text p="$3" fs={10}>
              {cleanAnswer(data[0]?.leadin)}
            </Text>
            <Text px="$3" fs={10} mt="$2">
              - {`${getCorrectCheckbox(result[0])} ${data[0]?.parts[0]}`}
            </Text>
            <Text>
              {i >= 1 ? `  ANSWER: ${cleanAnswer(data[0].answers[0])}` : ""}
            </Text>
            <Text px="$3" py="$2" fs={10} mt="$2">
              {i >= 1
                ? `- ${getCorrectCheckbox(result[1])} ${data[0].parts[1]}`
                : ""}
            </Text>
            <Text>
              {i >= 2 ? `  ANSWER: ${cleanAnswer(data[0].answers[1])}` : ""}
            </Text>
            <Text px="$3" fs={10} mt="$4">
              {i >= 2
                ? `- ${getCorrectCheckbox(result[2])} ${data[0].parts[2]}`
                : ""}
            </Text>
            <Text>
              {i >= 3 ? `  ANSWER: ${cleanAnswer(data[0].answers[2])}` : ""}
            </Text>
            <Sheet
              forceRemoveScrollEnabled={open}
              modal={false}
              open={open}
              onOpenChange={setOpen}
              snapPointsMode="fit"
              dismissOnSnapToBottom
              position={position}
              onPositionChange={setPosition}
              zIndex={100_000}
              animation="medium"
              moveOnKeyboardChange={true}
            >
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
              <Sheet.Handle />
              <Sheet.Frame
                padding="$4"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  size="$6"
                  mb="$5"
                  circular
                  icon={ChevronDown}
                  onPress={() => {
                    setOpen(false);
                  }}
                />
                <Text>Type your answer here</Text>
                <Input
                  flex={1}
                  mt="$3"
                  size="$4"
                  width={200}
                  value={answer}
                  onChangeText={(v) => setAnswer(v)}
                />
                <Button mt='$5' onPress={() => {
                  checkAnswer()
                }}>
                  Submit answer
                </Button>
              </Sheet.Frame>
            </Sheet>
          </ScrollView>
          <View pos="relative" b={0}>
            <Button onPress={() => setOpen((open) => !open)}>Answer</Button>
            <Button onPress={() => getBonus()}>New question</Button>
          </View>
        </View>
      )}
    </View>
  );
}
